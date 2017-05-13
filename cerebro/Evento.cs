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
    public class Evento
    {
        [BsonId]
        [DataMember]
        public ObjectId Id { get; set; }
        [BsonElement]
        [DataMember]
        public string municipalidad { get; set; }
        [BsonElement]
        [DataMember]
        public string nombre { get; set; }
    }
}
