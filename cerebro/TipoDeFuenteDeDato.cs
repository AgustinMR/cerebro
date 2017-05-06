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
    public class TipoDeFuenteDeDato
    {
        [BsonId]
        [DataMember]
        public ObjectId Id { set; get; }
        [BsonElement]
        [DataMember]
        public string nombre { set; get; }
        [BsonElement]
        [DataMember]
        public string municipalidad { set; get; }
        [BsonElement]
        [DataMember]
        public string frecuenciaLectura { set; get; }
        [BsonElement]
        [DataMember]
        public TipoDeDato tipo {set; get;}
        [BsonElement]
        [DataMember]
        public string uriWebService { set; get; }
    }
}
