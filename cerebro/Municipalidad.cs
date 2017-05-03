using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    public class Municipalidad
    {

        public String nombre { get; set; }
        public String ubicacion { get; set; }

        public Municipalidad(){
        }

        public Municipalidad(String nombre, String ubicacion)
        {
            this.nombre = nombre;
            this.ubicacion = ubicacion;
        }
    }
}
