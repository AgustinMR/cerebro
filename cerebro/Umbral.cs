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
    public class Umbral
    {
        [BsonId]
        [DataMember]
        public ObjectId Id { get; set; }
        [BsonElement]
        [DataMember]
        public string nombreEvento { get; set; }
        [BsonElement]
        [DataMember]
        public string nombreMunicipalidadEvento { get; set; }
        [BsonElement]
        [DataMember]
        public ObjectId IdFuenteDeDato { get; set; }
        [BsonElement]
        [DataMember]
        public string valorLimite { get; set; }

    }
}
