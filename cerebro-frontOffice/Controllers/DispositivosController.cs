using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using PusherServer;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.GridFS;
using Microsoft.AspNetCore.Http;
using System.IO;
using RestSharp;
using cerebro_frontOffice.Models;
using Microsoft.AspNetCore.Hosting;
using cerebro.frontOffice.Models;
using System.Net.Http;

namespace cerebro_frontOffice.Controllers
{
    [Route("api/dispositivos")]
    [EnableCors("CorsPolicy")]
    public class DispositivosController : Controller
    {
        public System.Func<System.Net.Http.HttpRequestMessage, System.Security.Cryptography.X509Certificates.X509Certificate2, System.Security.Cryptography.X509Certificates.X509Chain, System.Net.Security.SslPolicyErrors, bool> ServerCertificateValidationCallback { get { return default(System.Func<System.Net.Http.HttpRequestMessage, System.Security.Cryptography.X509Certificates.X509Certificate2, System.Security.Cryptography.X509Certificates.X509Chain, System.Net.Security.SslPolicyErrors, bool>); } set { } }

        [HttpPost]
        [Route("img")]
        public IActionResult Imagenes(IFormFile files)
        {
            byte[] source;
            using (var memoryStream = new MemoryStream())
            {
                files.CopyTo(memoryStream);
                source = memoryStream.ToArray();
            }
            var mongo = new MongoClient();
            IMongoDatabase db = mongo.GetDatabase("cerebroDB");

            var bucket = new GridFSBucket(db, new GridFSBucketOptions
            {
                BucketName = "Imagenes",
                ChunkSizeBytes = 1048576, // 1MB
                WriteConcern = WriteConcern.WMajority
            });

            ObjectId id = bucket.UploadFromBytes(files.FileName, source);
            return Ok(id.ToString());
        }

        [HttpPost]
        [Route("")]
        public IActionResult Datos(DatosDispositivo datos)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var eventos = bd.GetCollection<DatosDispositivo>("DatosDispositivo");
            eventos.InsertOne(datos);

            var options = new PusherOptions();
            options.Cluster = "mt1";
            var pusher = new Pusher("342739", "474881b81d9d92dd2713", "c14d6443376ba1f06b0f", options);
            var result = pusher.TriggerAsync("datos-dispositivos", "dato-nuevo", datos);

            Evento(datos.dispositivoId, datos.medida);
            return Ok("OK");
        }


        private void Evento(string idDis, string medida)
        {
            //1- Obtengo los eventos asociados al dispositivo

            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            List<Umbral> umbrales = bd.GetCollection<Umbral>("Umbral").Find(u => u.fuenteDeDatoId == idDis).ToList();

            List<string> eve = new List<string>();
            for (int i = 0; i < umbrales.Count; i++)
            {
                eve.Add(umbrales[i].eventoId);
            }

            //Fin 1

            //2- Por cada evento del paso anterior...
            for (int j = 0; j < eve.Count; j++)
            {
                //... obtengo los dispositivos que lo conforman
                List<Umbral> umbralesEventos = bd.GetCollection<Umbral>("Umbral").Find(u => u.eventoId == eve[j]).ToList();
                int hayEvento = 0;

                //para cada dispositivo chequeo los ultimos 5 datos recibidos en los ultimos 5 minutos
                for (int h = 0; h < umbralesEventos.Count; h++)
                {
                    var builder = Builders<DatosDispositivo>.Filter;
                    var filter = builder.Eq("dispositivoId", umbralesEventos[h].fuenteDeDatoId) & builder.Gt("datetime", DateTime.Now.AddMinutes(-5));
                    List<DatosDispositivo> umb = bd.GetCollection<DatosDispositivo>("DatosDispositivo")
                        .Find(filter)
                        .Limit(5)
                        .Sort(Builders<DatosDispositivo>.Sort.Descending("datetime"))
                        .ToList();
                    bool evee = false;
                    for (int z = 0; z < umb.Count; z++)
                    {
                        if (umb[z].tipoDeDato == "Texto")
                        {
                            if (umb[z].medida.Equals(umbralesEventos[h].valorLimite))
                                evee = true;
                        }
                        else
                        {
                            if (int.Parse(umb[z].medida) < 0)
                            {
                                if ((int.Parse(umb[z].medida) * -1) < int.Parse(umbralesEventos[h].valorLimite))
                                    evee = true;
                            }
                            else
                            {
                                if (int.Parse(umb[z].medida) > int.Parse(umbralesEventos[h].valorLimite))
                                    evee = true;
                            }
                        }
                    }

                    if (evee == true)
                        hayEvento += 1;
                }
                if (hayEvento == umbralesEventos.Count)
                {
                    string eveNom = bd.GetCollection<Evento>("Evento").Find(e => e.Id == ObjectId.Parse(eve[j])).FirstOrDefault().nombre;
                    DatosEvento dte = new DatosEvento(eve[j], eveNom);
                    bd.GetCollection<DatosEvento>("DatosEvento").InsertOne(dte);

                    List<string> disp = new List<string>();
                    List<string> priv = new List<string>();
                    double[][] arrayGeom = new double[umbralesEventos.Count][];
                    for (int t = 0; t < umbralesEventos.Count; t++)
                    {
                        var FuenteDeDatoBD = bd.GetCollection<FuenteDeDato>("FuenteDeDato").Find(e => e.Id == ObjectId.Parse(umbralesEventos[t].fuenteDeDatoId)).FirstOrDefault();
                        disp.Add(FuenteDeDatoBD.Id.ToString());
                        priv.Add(FuenteDeDatoBD.privilegios);
                        arrayGeom[t] = FuenteDeDatoBD.ubicacion;
                    }
                    DtEvento DtEve = new DtEvento();
                    DtEve.nombre = eveNom;

                    DtEve.Id = eve[j];
                    DtEve.geom = arrayGeom;
                    DtEve.privilegios = priv;
                    DtEve.dispositivos = disp;
                    DtEve.fechaHora = DateTime.Now;

                    using (var httpClientHandler = new HttpClientHandler())
                    {
                        httpClientHandler.ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; };
                        using (var client = new HttpClient(httpClientHandler))
                        {
                            var result = client.PostAsync("https://www.cerebro-servicelayer.com/api/eventos/dll?idEve=" + eve[j], null).Result;
                        }
                    }
                    Eventos(DtEve);
                }
            }
            //Fin 2
        }


        [HttpPost]
        [Route("dll")]
        public void DLLs(IFormFile files, string nombre, string muni)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var accion = bd.GetCollection<Accion>("Accion");
            Accion a = new Accion(muni, nombre);
            accion.InsertOne(a);
            using (var fileStream = new FileStream("C:\\DLLs\\" + a.Id + ".dll", FileMode.Create))
            {
                files.CopyTo(fileStream);
            }
        }

        [HttpPut]
        [Route("dll")]
        public void DLLsMod(IFormFile files, string nombre, string id)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var accion = bd.GetCollection<Accion>("Accion");
            var update = Builders<Accion>.Update.Set(e => e.nombre, nombre);
            var filter = Builders<Accion>.Filter.Eq("Id", ObjectId.Parse(id));
            bd.GetCollection<Accion>("Accion").FindOneAndUpdate(filter, update);

            using (var fileStream = new FileStream("C:\\DLLs\\" + id + ".dll", FileMode.Create))
            {
                files.CopyTo(fileStream);
            }
        }

        [HttpPut]
        [Route("dllMod")]
        public void DLLsMod(string nombre, string id)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var accion = bd.GetCollection<Accion>("Accion");
            var update = Builders<Accion>.Update.Set(e => e.nombre, nombre);
            var filter = Builders<Accion>.Filter.Eq("Id", ObjectId.Parse(id));
            bd.GetCollection<Accion>("Accion").FindOneAndUpdate(filter, update);
        }

        [HttpDelete]
        [Route("dllDel")]
        public void DLLs(string id)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var accion = bd.GetCollection<Accion>("Accion");
            DeleteResult r = accion.DeleteOne(e => e.Id == ObjectId.Parse(id));

            FileInfo fi = new FileInfo("C:\\DLLs\\" + id + ".dll");
            fi.Delete();
        }

        [HttpPost]
        [Route("evento")]
        public void Eventos(DtEvento e)
        {
            var options = new PusherOptions();
            options.Cluster = "mt1";
            var pusher = new Pusher("342739", "474881b81d9d92dd2713", "c14d6443376ba1f06b0f", options);
            var result = pusher.TriggerAsync("datos-dispositivos", "evento-nuevo", e);
        }
    }
}