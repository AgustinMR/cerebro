using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    public class Privilegio
    {
        public string nombre { get; set; }
        public string nombre_municipalidad { get; set; }

        public Municipalidad MUNICIPALIDADES { get; set; }
        public ICollection<Usuario> USUARIOS { get; set; }

        public Privilegio(string nombre, string municipalidad)
        {
            this.nombre = nombre;
            this.nombre_municipalidad = municipalidad;
        }
    }
}
