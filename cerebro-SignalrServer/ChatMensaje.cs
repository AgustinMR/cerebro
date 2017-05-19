using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace cerebro_SignalrServer
{
    public class ChatMensaje
    {
        public string autor { get; set; }
        public string mensaje { get; set; }
        public string agrupacion { get; set; }

        public ChatMensaje()
        {

        }

        public ChatMensaje(string autor, string mensaje, string agrupacion)
        {
            this.autor = autor;
            this.mensaje = mensaje;
            this.agrupacion = agrupacion;
        }
    }
}