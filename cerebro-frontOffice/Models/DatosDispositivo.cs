﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Runtime.Serialization;

namespace cerebro_frontOffice
{
    [DataContract]
    public class DatosDispositivo
    {
        [BsonId]
        [DataMember]
        public ObjectId Id { set; get; }
        [BsonElement]
        [DataMember]
        public string dispositivoId { get; set; }
        [BsonElement]
        [DataMember]
        public string tipoDeDato { get; set; }
        [BsonElement]
        [DataMember]
        public String medida {get; set; }
        [BsonElement]
        [DataMember]
        public ObjectId imagen { get; set; }
        [DataMember]
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime datetime { get; set; }

        public DatosDispositivo()
        {
            this.datetime = DateTime.Now;
        }
    }
}