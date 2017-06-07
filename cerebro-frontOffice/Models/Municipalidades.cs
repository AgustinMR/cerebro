using System;
using System.Collections.Generic;

namespace cerebro_frontOffice
{
    public partial class Municipalidades
    {
        public Municipalidades()
        {
            Agrupaciones = new HashSet<Agrupaciones>();
            Privilegios = new HashSet<Privilegios>();
            Usuarios = new HashSet<Usuarios>();
        }

        public string Nombre { get; set; }
        public string Ubicacion { get; set; }

        public virtual ICollection<Agrupaciones> Agrupaciones { get; set; }
        public virtual ICollection<Privilegios> Privilegios { get; set; }
        public virtual ICollection<Usuarios> Usuarios { get; set; }
    }
}
