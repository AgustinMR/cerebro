using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using System.Runtime.Serialization;

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
        [BsonElement]
        [DataMember]
        public List<FuenteDeDato> dispositivos { get; set; }

        public Evento() { }

        public Evento(string municipalidad, string nombre)
        {
            this.municipalidad = municipalidad;
            this.nombre = nombre;
        }

        public Evento(string municipalidad, string nombre, List<FuenteDeDato> dispositivos)
        {
            this.municipalidad = municipalidad;
            this.nombre = nombre;
            this.dispositivos = dispositivos;
        }
    }
}
