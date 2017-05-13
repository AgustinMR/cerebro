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
    public class DALEvento : IDALEvento
    {
        public bool addEvento(Evento e)
        {
            if (e != null)
            {
                var mongo = new MongoClient();
                var bd = mongo.GetDatabase("cerebroDB");
                var eventos = bd.GetCollection<Evento>("Evento");
                eventos.InsertOne(e);
                return true;
            }
            return false;
        }

        public bool addUmbral(Umbral u)
        {
            if (u != null)
            {
                var mongo = new MongoClient();
                var bd = mongo.GetDatabase("cerebroDB");
                var umbrales = bd.GetCollection<Umbral>("Umbral");
                umbrales.InsertOne(u);
                return true;
            }
            return false;
        }

        public bool deleteEvento(ObjectId id)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var eventos = bd.GetCollection<TipoDeFuenteDeDato>("Evento");
            DeleteResult r = eventos.DeleteOne(e => e.Id == id);
            return r.DeletedCount == 1;
        }

        public List<Evento> getAllEventos()
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            return bd.GetCollection<Evento>("Evento").Find(new BsonDocument()).ToList();
        }

        public Evento getEvento(ObjectId id)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var eventos = bd.GetCollection<Evento>("Evento");
            var result = eventos.Find(e => e.Id == id).FirstOrDefault();
            return result;
        }

        public bool updateEvento(Evento t)
        {
            if (t != null)
            {
                var mongo = new MongoClient();
                var bd = mongo.GetDatabase("cerebroDB");
                var update = Builders<Evento>.Update.Set(e => e.nombre, t.nombre).Set(e => e.municipalidad, t.municipalidad);
                var filter = Builders<Evento>.Filter.Eq("Id", t.Id);
                bd.GetCollection<Evento>("Evento").FindOneAndUpdate(filter, update);
                return true;
            }
            return false;
        }
    }
}
