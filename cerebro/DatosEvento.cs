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
    public class DatosEvento
    {

        [BsonId]
        [DataMember]
        public ObjectId Id { set; get; }
        [BsonElement]
        [DataMember]
        public string eventoId { get; set; }
        [BsonElement]
        [DataMember]
        public string nombre { get; set; }
        [DataMember]
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime datetime { get; set; }

        public DatosEvento()
        {
            this.datetime = DateTime.Now;
        }

        public DatosEvento(string idEve, string nombre)
        {
            this.eventoId = idEve;
            this.nombre = nombre;
            this.datetime = DateTime.Now;
        }

    }
}
