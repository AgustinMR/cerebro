using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Runtime.Serialization;

namespace cerebro
{
    [DataContract]
    public class Zonas
    {

        [BsonId]
        [DataMember]
        public ObjectId Id { get; set; }
        [BsonElement]
        [DataMember]
        public string emailUsuario { get; set; }
        [BsonElement]
        [DataMember]
        public string municipalidadUsuario { get; set; }
        [BsonElement]
        [DataMember]
        public double[][] ubicacion { get; set; }

        public Zonas() { }
    }
}
