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
    public class DALTipoDeFuenteDeDato : IDALTipoDeFuenteDeDato
    {
        public bool addTipoDeFuenteDeDato(TipoDeFuenteDeDato t)
        {
            if (t != null)
            {
                var mongo = new MongoClient();
                var bd = mongo.GetDatabase("cerebroDB");
                var tipos = bd.GetCollection<TipoDeFuenteDeDato>("TipoDeFuenteDeDato");
                tipos.InsertOne(t);
                return true;
            }
            return false;
        }

        public bool deleteTipoDeFuenteDeDato(ObjectId id)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var tipos = bd.GetCollection<TipoDeFuenteDeDato>("TipoDeFuenteDeDato");
            DeleteResult r = tipos.DeleteOne(e => e.Id == id);
            return r.DeletedCount == 1;
        }

        public List<TipoDeFuenteDeDato> getAllTipoDeFuenteDeDatos()
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            return bd.GetCollection<TipoDeFuenteDeDato>("TipoFuenteDeDato").Find(new BsonDocument()).ToList();
        }

        public TipoDeFuenteDeDato getTipoDeFuenteDeDato(ObjectId id)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var tipos = bd.GetCollection<TipoDeFuenteDeDato>("TipoDeFuenteDeDato");
            var result = tipos.Find(e => e.Id == id).FirstOrDefault();
            return result;
        }

        public bool updateTipoDeFuenteDeDato(TipoDeFuenteDeDato t)
        {
            if (t != null)
            {
                var mongo = new MongoClient();
                var bd = mongo.GetDatabase("cerebroDB");
                var update = Builders<TipoDeFuenteDeDato>.Update.Set(e => e.frecuenciaLectura, t.frecuenciaLectura).Set(e => e.municipalidad, t.municipalidad).Set(e => e.tipo, t.tipo).Set(e => e.nombre, t.nombre).Set(e => e.uriWebService, t.uriWebService);
                var filter = Builders<TipoDeFuenteDeDato>.Filter.Eq("Id", t.Id);
                bd.GetCollection<TipoDeFuenteDeDato>("TipoDeFuenteDeDato").FindOneAndUpdate(filter, update);
                return true;
            }
            return false;
        }
    }
}
