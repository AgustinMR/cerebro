using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    public class Parametro
    {
        [BsonElement]
        public string nombre { get; set; }
        [BsonElement]
        public string valor { get; set; }
    }
}
