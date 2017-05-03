using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    public class Agrupacion
    {
        public String nombre { get; set; }
        public String nombre_muni { get; set; }

        public Agrupacion(){ }
        public Agrupacion(String nombre, String nombre_muni) {
            this.nombre = nombre;
            this.nombre_muni = nombre_muni;
        }
    }
}
