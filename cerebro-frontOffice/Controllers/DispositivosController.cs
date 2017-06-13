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

namespace cerebro_frontOffice.Controllers
{
    [Route("api/dispositivos")]
    [EnableCors("CorsPolicy")]
    public class DispositivosController : Controller
    {
        [HttpPost]
        [Route("img")]
        public IActionResult Trigger(IFormFile files)
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
            List<Evento> eventos = bd.GetCollection<Evento>("Evento").Find(new BsonDocument()).ToList();
            for (int i = 0; i < umbrales.Count; i++)
            {
                for (int j = 0; j < eventos.Count; j++)
                {
                    if (umbrales[i].eventoId.Equals(eventos[j].Id.ToString()))
                    {
                        int hayEvento = 0;
                        for (int h = 0; h < eventos[j].dispositivos.Count; h++)
                        {
                            //eventos[j].dispositivos[h]
                            var filter = Builders<DatosDispositivo>.Filter.Eq("dispositivoId", eventos[j].dispositivos[h].Id.ToString());
                            List<DatosDispositivo> umb = bd.GetCollection<DatosDispositivo>("DatosDispositivo")
                                .Find(filter)
                                .Limit(5)
                                .Sort(Builders<DatosDispositivo>.Sort.Descending("datetime"))
                                .ToList();
                            bool evee = false;
                            for (int z = 0; z < umb.Count; z++)
                            {
                                var builder = Builders<Umbral>.Filter;
                                var filter2 = builder.Eq("fuenteDeDatoId", eventos[j].dispositivos[h].Id.ToString()) & builder.Eq("eventoId", eventos[j].Id.ToString());
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
                        if (hayEvento == eventos[j].dispositivos.Count)
                        {
                            //disparo evento
                            var client = new RestClient("https://www.cerebro-servicelayer.com/api/eventos/dll?idDis=" + eventos[j].Id.ToString() + "&medida=" + eventos[j].nombre);
                            var request = new RestRequest(Method.POST);
                            request.AddHeader("cache-control", "no-cache");
                            client.ExecuteAsync(request, Response =>
                            {

                            });
                        }
                    }
                }
            }
        }


    }
}