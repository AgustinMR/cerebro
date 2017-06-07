using System;
using System.Collections.Generic;

namespace cerebro_frontOffice
{
    public partial class AgrupacionesUsuarios
    {
        public string NombreAgrupacion { get; set; }
        public string NombreMunicipalidadAgrupacion { get; set; }
        public string UsuarioEmail { get; set; }
        public string NombreMunicipalidadUsuario { get; set; }
        public bool Admin { get; set; }

        public virtual Agrupaciones Nombre { get; set; }
        public virtual Usuarios Usuarios { get; set; }
    }
}
