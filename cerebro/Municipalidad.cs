using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    public class Municipalidad
    {
        string nombre { set; get; }
        string ubicacion { set; get; }
        List<FuenteDeDato> dispositivos { get; set; }

        public Municipalidad() { }
    }
}
