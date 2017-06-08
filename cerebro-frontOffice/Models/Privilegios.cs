using System;
using System.Collections.Generic;

namespace cerebro_frontOffice
{
    public partial class Privilegios
    {
        public Privilegios()
        {
            PrivilegiosUsuarios = new HashSet<PrivilegiosUsuarios>();
        }

        public string Nombre { get; set; }
        public string NombreMunicipalidad { get; set; }

        public virtual ICollection<PrivilegiosUsuarios> PrivilegiosUsuarios { get; set; }
        public virtual Municipalidades NombreMunicipalidadNavigation { get; set; }
    }
}
