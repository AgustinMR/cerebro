using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    [BsonDiscriminator(RootClass = true)]
    [BsonKnownTypes(typeof(InvocacionWS), typeof(EnvioMail))]
    public abstract class Accion
    {
        [BsonId]
        public ObjectId Id { set; get; }
        [BsonElement]
        public string municipalidad { get; set; }
    }
}
