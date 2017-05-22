using System;

namespace cerebro_SignalrServer
{
    public class ChatMensaje
    {
        public string autor { get; set; }
        public string mensaje { get; set; }
        public string agrupacion { get; set; }
        public DateTimeOffset datetime { get; set; }

        public ChatMensaje()
        {
            this.datetime = DateTimeOffset.Now;
        }

        public ChatMensaje(string autor, string mensaje, string agrupacion)
        {
            this.autor = autor;
            this.mensaje = mensaje;
            this.agrupacion = agrupacion;
            this.datetime = DateTimeOffset.Now;
        }
    }
}