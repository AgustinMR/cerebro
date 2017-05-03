using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    public class Municipalidad
    {
        [BsonId]
        public ObjectId Id { get; set; }
        [BsonElement]
        string nombre { set; get; }
        [BsonElement]
        string ubicacion { set; get; }
        [BsonElement]
        List<FuenteDeDato> dispositivos { get; set; }

        public Municipalidad() { }
    }
}
