using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    public class Operador : Usuario
    {
        public String password { get; set; }

        public Operador() { }
        public Operador(String email, String nombre_muni, String nombre, String password)
        {
            this.email = email;
            this.nombre_muni = nombre_muni;
            this.nombre = nombre;
            this.password = password;
        }
    }
}
