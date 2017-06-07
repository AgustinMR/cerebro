using System;
using System.Collections.Generic;

namespace cerebro_frontOffice
{
    public partial class Usuarios
    {
        public Usuarios()
        {
            AgrupacionesUsuarios = new HashSet<AgrupacionesUsuarios>();
            PrivilegiosUsuarios = new HashSet<PrivilegiosUsuarios>();
        }

        public string Email { get; set; }
        public string NombreMunicipalidad { get; set; }
        public string Nombre { get; set; }
        public string Password { get; set; }
        public int Tipo { get; set; }
        public bool Enabled { get; set; }

        public virtual ICollection<AgrupacionesUsuarios> AgrupacionesUsuarios { get; set; }
        public virtual ICollection<PrivilegiosUsuarios> PrivilegiosUsuarios { get; set; }
        public virtual Municipalidades NombreMunicipalidadNavigation { get; set; }
    }
}
