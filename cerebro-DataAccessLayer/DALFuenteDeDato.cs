using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cerebro;
using MongoDB.Bson;
using MongoDB.Driver;

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
            if (f != null)
            {
                var mongo = new MongoClient();
                var bd = mongo.GetDatabase("cerebroDB");
                var update = Builders<FuenteDeDato>.Update.Set(e => e.direccionIP, f.direccionIP).Set(e => e.municipalidad, f.municipalidad).Set(e => e.tipo, f.tipo).Set(e => e.ubicacion, f.ubicacion);
                var filter = Builders<FuenteDeDato>.Filter.Eq("Id", f.Id);
                bd.GetCollection<FuenteDeDato>("FuenteDeDato").FindOneAndUpdate(filter, update);
            }
            return false;
        }
    }
}
