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

namespace cerebro_frontOffice.Controllers
{
    [Route("api/dispositivos")]
    [EnableCors("CorsPolicy")]
    public class DispositivosController : Controller
    {
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
            var result = pusher.TriggerAsync(datos.dispositivoId, "dato-nuevo", datos);
            return Ok("OK");
        }

        private /*async*/ void Evento(string idDis, string medida)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            List<Umbral> umbrales = bd.GetCollection<Umbral>("Umbral").Find(u => u.fuenteDeDatoId == idDis).ToList();

            List<string> eve = new List<string>();
            for (int i = 0; i < umbrales.Count; i++)
            {
                eve.Add(umbrales[i].eventoId);
            }

            for (int j = 0; j < eve.Count; j++)
            {
                List<Umbral> umbralesEventos = bd.GetCollection<Umbral>("Umbral").Find(u => u.eventoId == eve[j]).ToList();
                int hayEvento = 0;
                for (int h = 0; h < umbralesEventos.Count; h++)
                {
                    var filter = Builders<DatosDispositivo>.Filter.Eq("dispositivoId", umbralesEventos[h].fuenteDeDatoId);
                    List<DatosDispositivo> umb = bd.GetCollection<DatosDispositivo>("DatosDispositivo")
                        .Find(filter)
                        .Limit(5)
                        .Sort(Builders<DatosDispositivo>.Sort.Descending("datetime"))
                        .ToList();
                    bool evee = false;
                    for (int z = 0; z < umb.Count; z++)
                    {
                        var builder = Builders<Umbral>.Filter;
                        var filter2 = builder.Eq("fuenteDeDatoId", umbralesEventos[h].fuenteDeDatoId) & builder.Eq("eventoId", eve[j]);
                        if (bd.GetCollection<Umbral>("Umbral").Find(filter2) != null)
                        {
                            if (umb[z].tipoDeDato == "Texto")
                            {
                                if (umb[z].medida.Equals(medida))
                                {
                                    evee = true;
                                }
                            }
                            else
                            {
                                if (int.Parse(umb[z].medida) < int.Parse(medida))
                                {
                                    evee = true;
                                }
                            }
                        }
                    }
                    if (evee == true)
                        hayEvento += 1;
                }
                if (hayEvento == eve.Count)
                {
                    //disparo evento
                    var client = new RestClient("https://www.cerebro-servicelayer.com/api/eventos/dll?idEve=" + eve[j]);
                    var request = new RestRequest(Method.POST);
                    request.AddHeader("cache-control", "no-cache");
                    client.ExecuteAsync(request, Response =>
                    {

                    });
                }
            }
        }

        private IHostingEnvironment _hostingEnvironment;

        public DispositivosController(IHostingEnvironment environment)
        {
            _hostingEnvironment = environment;
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
    }
}