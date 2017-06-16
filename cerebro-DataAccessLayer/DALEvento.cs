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
        public string addEvento(Evento e)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var eventos = bd.GetCollection<Evento>("Evento");
            eventos.InsertOne(e);
            return e.Id.ToString();
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
            var eventos = bd.GetCollection<Evento>("Evento");
            DeleteResult r = eventos.DeleteOne(e => e.Id == id);
            bd.GetCollection<Umbral>("Umbral").DeleteMany(e => e.eventoId == id.ToString());
            return true;
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
                var update = Builders<Evento>.Update.Set(e => e.nombre, t.nombre).Set(e => e.accion, t.accion);
                var filter = Builders<Evento>.Filter.Eq("Id", t.Id);
                bd.GetCollection<Evento>("Evento").FindOneAndUpdate(filter, update);
                return true;
            }
            return false;
        }

        public bool addDatosEvento(string idEve, string nombre)
        {
            DatosEvento e = new DatosEvento(idEve, nombre);
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var datosEventos = bd.GetCollection<DatosEvento>("DatosEvento");
            datosEventos.InsertOne(e);
            return true;
        }

        public List<Accion> getAcciones(string muni)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            List<Accion> doc = bd.GetCollection<Accion>("Accion").Find(new BsonDocument()).ToList();
            List<Accion> returnList = new List<Accion>();
            for (int i = 0; i < doc.Count; i++)
            {
                if (doc[i].municipalidad.Equals(muni))
                {
                    returnList.Add(doc[i]);
                }
            }
            return returnList;
        }

        public List<Evento> getEventosMuni(string muni)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            List<Evento> doc = bd.GetCollection<Evento>("Evento").Find(new BsonDocument()).ToList();
            List<Evento> returnList = new List<Evento>();
            for (int i = 0; i < doc.Count; i++)
            {
                if (doc[i].municipalidad.Equals(muni))
                {
                    returnList.Add(doc[i]);
                }
            }
            return returnList;
        }

        public List<Umbral> getUmbralesEve(string idEve) {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            List<Umbral> doc = bd.GetCollection<Umbral>("Umbral").Find(new BsonDocument()).ToList();
            List<Umbral> returnList = new List<Umbral>();
            for (int i = 0; i < doc.Count; i++)
            {
                if (doc[i].eventoId.Equals(idEve))
                {
                    returnList.Add(doc[i]);
                }
            }
            return returnList;
        }

        public bool updateUmbral(Umbral u) {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var update = Builders<Umbral>.Update.Set(e => e.fuenteDeDatoId, u.fuenteDeDatoId).Set(e => e.valorLimite, u.valorLimite);
            var filter = Builders<Umbral>.Filter.Eq("Id", u.Id);
            bd.GetCollection<Umbral>("Umbral").FindOneAndUpdate(filter, update);
            return true;
        }

        public bool deleteUmbral(ObjectId id)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var eventos = bd.GetCollection<Umbral>("Umbral");
            DeleteResult r = eventos.DeleteOne(e => e.Id == id);
            return true;
        }
    }
}
