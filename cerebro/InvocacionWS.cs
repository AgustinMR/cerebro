using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    public class InvocacionWS : Accion
    {
        [BsonElement]
        public Uri uri { set; get; }
        [BsonElement]
        public List<Parametro> parametros { get; set; }
        [BsonElement]
        public string metodo { get; set; }
    }
}
