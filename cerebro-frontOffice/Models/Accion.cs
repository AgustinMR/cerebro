using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace cerebro.frontOffice.Models
{
    [DataContract]
    public class Accion
    {
        [BsonId]
        [DataMember]
        public ObjectId Id { get; set; }
        [BsonElement]
        [DataMember]
        public string nombre { get; set; }
        [BsonElement]
        [DataMember]
        public string municipalidad { get; set; }

        public Accion() { }

        public Accion(string municipalidad, string nombre)
        {
            this.municipalidad = municipalidad;
            this.nombre = nombre;
        }
    }
}
