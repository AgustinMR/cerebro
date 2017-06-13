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
            return Ok("OK");
        }

        [HttpGet]
        [Route("datos")]
        public async Task<List<DatosDispositivo>> getDatosDispositivosAsync(string tipoDato)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var datos = bd.GetCollection<DatosDispositivo>("DatosDispositivo");
            var sort = Builders<DatosDispositivo>.Sort.Descending("datetime");
            if (tipoDato != null && tipoDato != "")
            {
                var builder = Builders<DatosDispositivo>.Filter;
                var filter = builder.Eq("tipoDeDato", tipoDato);
                return await datos.Find(filter).Sort(sort).ToListAsync();
            }
            else return await datos.Find(new BsonDocument()).Sort(sort).ToListAsync();
        }

        //private async void tmp() {
        //    var options = new PusherOptions();
        //    options.Cluster = "mt1";
        //    var pusher = new Pusher("342739", "474881b81d9d92dd2713", "c14d6443376ba1f06b0f", options);
        //    //var result = pusher.TriggerAsync(datos.id, "dato-nuevo", datos);
        //}
    }
}