using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    public class Administrador : Usuario
    {
        public String password { get; set; }

        public Administrador() { }
        public Administrador(String email, String nombre_muni, String nombre, String password)
        {
            this.email = email;
            this.nombre_municipalidad = nombre_muni;
            this.nombre = nombre;
            this.password = password;
        }
    }
}
