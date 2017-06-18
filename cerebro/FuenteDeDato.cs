using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    [DataContract]
    public class FuenteDeDato
    {
        [BsonId]
        [DataMember]
        public ObjectId Id { get; set; }
        [BsonElement]
        [DataMember]
        public string nombre { get; set; }
        [BsonElement]
        [DataMember]
        public string municipalidad { get; set; }
        [BsonElement]
        [DataMember]
        public string privilegios { get; set; }
        [BsonElement]
        [DataMember]
        public Boolean simulado { get; set; }
        [BsonElement]
        [DataMember]
        public double[] ubicacion { get; set; }
        [BsonElement]
        [DataMember]
        public string userAgent { get; set; }
        [BsonElement]
        [DataMember]
        public string direccionIP { get; set; }
        [BsonElement]
        [DataMember]
        public ObjectId tipo { get; set; }
    }
}
