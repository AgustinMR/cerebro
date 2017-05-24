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
        bool agregarAgrupacion(Agrupacion_Usuario AUsu);
        bool agregarUsuariosAgrupacion(Agrupacion_Usuario AUsu);
        bool cambiarAdminAgrupacion(Agrupacion_Usuario AUsu);
        bool borrarUsuarioAgrupacion(Agrupacion_Usuario AUsu);
        bool borrarAgrupacion(Agrupacion grupo);
        bool borrarUsuarioAgrupaciones(Usuario usu);

    }
}
