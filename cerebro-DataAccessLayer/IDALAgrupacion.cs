using cerebro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro_DataAccessLayer
{
    public interface IDALAgrupacion
    {
        bool agregarAgrupacion(Agrupacion grupo, Usuario usu);
        bool agregarUsuariosAgrupacion(Agrupacion grupo, Usuario usu);
        bool cambiarAdminAgrupacion(Agrupacion grupo, Usuario usu, bool esAdmin);
        bool borrarUsuarioAgrupacion(Agrupacion grupo, Usuario usu);
        bool borrarAgrupacion(Agrupacion grupo);

    }
}
