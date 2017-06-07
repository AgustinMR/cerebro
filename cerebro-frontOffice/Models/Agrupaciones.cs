using System;
using System.Collections.Generic;

namespace cerebro_frontOffice
{
    public partial class Agrupaciones
    {
        public Agrupaciones()
        {
            AgrupacionesUsuarios = new HashSet<AgrupacionesUsuarios>();
        }

        public string Nombre { get; set; }
        public string NombreMunicipalidad { get; set; }

        public virtual ICollection<AgrupacionesUsuarios> AgrupacionesUsuarios { get; set; }
        public virtual Municipalidades NombreMunicipalidadNavigation { get; set; }
    }
}
