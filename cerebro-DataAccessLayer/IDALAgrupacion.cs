using cerebro;
using System.Collections.Generic;

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
        Agrupacion obtenerAgrupacion(string nombre, string municipalidad);
        List<Agrupacion_Usuario> obtenerUsuariosAgrupacion(string nombre);
        List<string> obtenerAgrupacionesByUsuario(string email);
    }
}
