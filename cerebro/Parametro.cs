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
    public class Parametro
    {
        [BsonElement]
        [DataMember]
        public string nombre { get; set; }
        [BsonElement]
        [DataMember]
        public string valor { get; set; }
    }
}
