using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    public class Visitante : Usuario
    {
        public Visitante() { }
        public Visitante(String email, String nombre_muni, String nombre)
        {
            this.email = email;
            this.nombre_muni = nombre_muni;
            this.nombre = nombre;
        }
    }
}
