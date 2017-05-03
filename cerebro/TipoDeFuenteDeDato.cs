using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    public class TipoDeFuenteDeDato
    {
        [BsonId]
        public ObjectId Id { set; get; }
        [BsonElement]
        public string nombre { set; get; }
        [BsonElement]
        public string municipalidad { set; get; }
        [BsonElement]
        public string frecuenciaLectura { set; get; }
        [BsonElement]
        public TipoDeDato tipo {set; get;}
        [BsonElement]
        public string uriWebService { set; get; }
    }
}
