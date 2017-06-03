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
            if (t != null )
            {
                var mongo = new MongoClient();
                var bd = mongo.GetDatabase("cerebroDB");
                var tipos = bd.GetCollection<TipoDeFuenteDeDato>("TipoDeFuenteDeDato");
                var filter = Builders<TipoDeFuenteDeDato>.Filter.Eq("nombre", t.nombre) & Builders<TipoDeFuenteDeDato>.Filter.Eq("municipalidad", t.municipalidad);
                //Console.WriteLine(filter);
                if (tipos.Find(filter).FirstOrDefault() != null)
                    return false;                
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

            var fuenteDeDatos = bd.GetCollection<TipoDeFuenteDeDato>("FuenteDeDato");
            List<FuenteDeDato> doc = bd.GetCollection<FuenteDeDato>("FuenteDeDato").Find(new BsonDocument()).ToList();
            List<FuenteDeDato> returnList = new List<FuenteDeDato>();
            for (int i = 0; i < doc.Count; i++)
            {
                if (doc[i].tipo.Equals(id))
                {
                    DeleteResult rr = fuenteDeDatos.DeleteOne(e => e.Id == doc[i].Id);
                }
            }
            

            return r.DeletedCount == 1;
        }

        public List<TipoDeFuenteDeDato> getAllTipoDeFuenteDeDatos()
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            return bd.GetCollection<TipoDeFuenteDeDato>("TipoDeFuenteDeDato").Find(new BsonDocument()).ToList();
        }

        public List<TipoDeFuenteDeDato> getAllTipoDeFuenteDeDatos(string muni)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            List<TipoDeFuenteDeDato> doc = bd.GetCollection<TipoDeFuenteDeDato>("TipoDeFuenteDeDato").Find(new BsonDocument()).ToList();
            List<TipoDeFuenteDeDato> returnList = new List<TipoDeFuenteDeDato>();
            for (int i = 0; i < doc.Count; i++) {
                if (doc[i].municipalidad.Equals(muni)) {
                    returnList.Add(doc[i]);
                }
            }
            return returnList;
        }

        public TipoDeFuenteDeDato getTipoDeFuenteDeDato(ObjectId id)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var tipos = bd.GetCollection<TipoDeFuenteDeDato>("TipoDeFuenteDeDato");
            //var filter = Builders<TipoDeFuenteDeDato>.Filter.Eq("nombre", nombre) & Builders<TipoDeFuenteDeDato>.Filter.Eq("municipalidad", municipalidad);
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
                var filter = Builders<TipoDeFuenteDeDato>.Filter.Eq("nombre", t.nombre) & Builders<TipoDeFuenteDeDato>.Filter.Eq("municipalidad", t.municipalidad);
                bd.GetCollection<TipoDeFuenteDeDato>("TipoDeFuenteDeDato").FindOneAndUpdate(filter, update);
                return true;
            }
            return false;
        }
    }
}
