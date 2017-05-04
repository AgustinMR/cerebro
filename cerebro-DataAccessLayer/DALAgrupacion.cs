using cerebro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro_DataAccessLayer
{
    public class DALAgrupacion : IDALAgrupacion
    {
        
        public bool agregarAgrupacion(Agrupacion grupo, Usuario usu)
        {
            return true;
        }

        public bool agregarUsuariosAgrupacion(Agrupacion grupo, Usuario usu)
        {
            return true;
        }

        public bool cambiarAdminAgrupacion(Agrupacion grupo, Usuario usu, bool esAdmin)
        {
            return true;
        }

        public bool borrarUsuarioAgrupacion(Agrupacion grupo, Usuario usu)
        {
            return true;
        }

        public bool borrarAgrupacion(Agrupacion grupo)
        {
            return true;
        }


    }
}
