using System;
using System.Runtime.Serialization;

namespace cerebro_SignalrServer
{
    [DataContract]
    public class ChatMensaje
    {
        [DataMember]
        public string autor { get; set; }
        [DataMember]
        public string mensaje { get; set; }
        [DataMember]
        public string agrupacion { get; set; }
        [DataMember]
        public DateTimeOffset datetime { get; set; }
        [DataMember]
        public string socket_id { get; set; }

        public ChatMensaje()
        {
            this.datetime = DateTimeOffset.Now;
        }

        public ChatMensaje(string autor, string mensaje, string agrupacion, string socketId)
        {
            this.autor = autor;
            this.mensaje = mensaje;
            this.agrupacion = agrupacion;
            this.datetime = DateTimeOffset.Now;
            this.socket_id = socketId;
        }
    }
}