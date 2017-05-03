using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    public class FuenteDeDato
    {
        [BsonId]
        public ObjectId Id { get; set; }
        [BsonElement]
        public string municipalidad { get; set; }
        [BsonElement]
        public string ubicacion { get; set; }
        [BsonElement]
        public string direccionIP { get; set; }
        [BsonElement]
        public ObjectId tipo { get; set; }
    }
}
