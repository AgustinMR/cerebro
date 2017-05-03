using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    public class Evento
    {
        [BsonId]
        public ObjectId Id;
        [BsonElement]
        public string municipalidad;
        [BsonElement]
        public string nombre;
        [BsonElement]
        public List<Accion> acciones;
    }
}
