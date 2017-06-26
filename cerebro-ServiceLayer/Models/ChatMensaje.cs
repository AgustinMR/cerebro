using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Runtime.Serialization;

namespace cerebro_SignalrServer
{
    [DataContract]
    public class ChatMensaje
    {
        [BsonId]
        [DataMember]
        public ObjectId Id { get; set; }
        [DataMember]
        [BsonElement]
        public string autor { get; set; }
        [DataMember]
        [BsonElement]
        public string mensaje { get; set; }
        [DataMember]
        [BsonElement]
        public string agrupacion { get; set; }
        [DataMember]
        [BsonElement]
        public DateTimeOffset datetime { get; set; }
        [DataMember]
        [BsonElement]
        public string email { get; set; }

        public ChatMensaje()
        {
            this.datetime = DateTimeOffset.Now;
        }

        public ChatMensaje(string autor, string mensaje, string agrupacion, string Email)
        {
            this.autor = autor;
            this.mensaje = mensaje;
            this.agrupacion = agrupacion;
            this.datetime = DateTimeOffset.Now;
            this.email = Email;
        }
    }
}