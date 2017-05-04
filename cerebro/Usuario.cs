using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro
{
    public abstract class Usuario
    {
        public String email { get; set; }
        public String nombre_municipalidad { get; set; }
        public String nombre { get; set; }

        public ICollection<Agrupacion_Usuario> AGRUPACIONES_USUARIOS { get; set; }
        public Municipalidad MUNICIPALIDADES { get; set; }

    }
}
