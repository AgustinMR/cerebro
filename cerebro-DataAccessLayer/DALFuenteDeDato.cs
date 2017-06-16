using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cerebro;
using MongoDB.Bson;
using MongoDB.Driver;
using System.IO;
using MongoDB.Driver.GridFS;

namespace cerebro_DataAccessLayer
{
    public class DALFuenteDeDato : IDALFuenteDeDato
    {
        public bool addFuenteDeDato(FuenteDeDato f)
        {
            if (f != null)
            {
                var mongo = new MongoClient();
                var bd = mongo.GetDatabase("cerebroDB");
                var employees = bd.GetCollection<FuenteDeDato>("FuenteDeDato");
                employees.InsertOne(f);
                return true;
            }
            return false;
        }

        public bool deleteFuenteDeDato(ObjectId id)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var employees = bd.GetCollection<FuenteDeDato>("FuenteDeDato");
            DeleteResult r = employees.DeleteOne(e => e.Id == id);
            return r.DeletedCount == 1;
        }

        public List<FuenteDeDato> getAllFuenteDeDato()
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            return bd.GetCollection<FuenteDeDato>("FuenteDeDato").Find(new BsonDocument()).ToList();
        }

        public FuenteDeDato getFuenteDeDato(ObjectId id)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var employees = bd.GetCollection<FuenteDeDato>("FuenteDeDato");
            var result = employees.Find(e => e.Id == id).FirstOrDefault();
            return result;
        }

        public bool updateFuenteDeDato(FuenteDeDato f)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var update = Builders<FuenteDeDato>.Update.Set(e => e.direccionIP, f.direccionIP).Set(e => e.userAgent, f.userAgent).Set(e => e.ubicacion, f.ubicacion);
            var filter = Builders<FuenteDeDato>.Filter.Eq("Id", f.Id);
            bd.GetCollection<FuenteDeDato>("FuenteDeDato").FindOneAndUpdate(filter, update);
            return true;
        }

        public List<FuenteDeDato> getAllFuenteDeDatoMuni(string muni)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            List<FuenteDeDato> doc = bd.GetCollection<FuenteDeDato>("FuenteDeDato").Find(new BsonDocument()).ToList();
            List<FuenteDeDato> returnList = new List<FuenteDeDato>();
            for (int i = 0; i < doc.Count; i++)
            {
                if (doc[i].municipalidad.Equals(muni))
                {
                    returnList.Add(doc[i]);
                }
            }
            return returnList;
        }

        public DatosDispositivo getDatosDispositivo(string id) {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            return bd.GetCollection<DatosDispositivo>("DatosDispositivo").Find(e => e.dispositivoId == id).SortByDescending(e => e.datetime).FirstOrDefault();
        }

        public byte[] getImg(string id)
        {
            var mongo = new MongoClient();
            IMongoDatabase db = mongo.GetDatabase("cerebroDB"); ;

            var bucket = new GridFSBucket(db, new GridFSBucketOptions
            {
                BucketName = "Imagenes",
                ChunkSizeBytes = 1048576,
                WriteConcern = WriteConcern.WMajority
            });

            return bucket.DownloadAsBytes(ObjectId.Parse(id));
        }

        public List<FuenteDeDato> getDispositivosByMunicipalidad(string municipalidad, string tipo) {
            var dispositivos = new MongoClient().GetDatabase("cerebroDB").GetCollection<FuenteDeDato>("FuenteDeDato");
            var tipos = new MongoClient().GetDatabase("cerebroDB").GetCollection<TipoDeFuenteDeDato>("TipoDeFuenteDeDato").AsQueryable();
            // tipos.Where(t => t.municipalidad == municipalidad).Where(t => t.tipo == ObjectId.Parse(tipo)).Select(t => t.Id)
            return (from d in dispositivos.AsQueryable()
                   join t in tipos on d.tipo equals t.Id
                   where d.municipalidad == municipalidad
                   where t.tipo.ToString() == tipo
                   select d).ToList();
        }
    }
}
