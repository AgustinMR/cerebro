using System;
using System.Collections.Generic;

namespace cerebro_frontOffice
{
    public partial class PrivilegiosUsuarios
    {
        public string NombrePrivilegio { get; set; }
        public string NombreMunicipalidadPrivilegio { get; set; }
        public string UsuarioEmail { get; set; }
        public string NombreMunicipalidadUsuario { get; set; }

        public virtual Privilegios Nombre { get; set; }
        public virtual Usuarios Usuarios { get; set; }
    }
}
