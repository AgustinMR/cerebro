using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace cerebro_frontOffice.Models
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

    }
}