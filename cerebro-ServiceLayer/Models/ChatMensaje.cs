using System;
using System.Runtime.Serialization;

namespace cerebro_ServiceLayer.Models
{
    public class ChatMensaje
    {
        public string autor { get; set; }
        public string mensaje { get; set; }
        public string agrupacion { get; set; }
        public DateTimeOffset datetime { get; set; }
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