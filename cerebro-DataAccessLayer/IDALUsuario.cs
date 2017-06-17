using cerebro;
using System.Collections.Generic;

namespace cerebro_DataAccessLayer
{
    public interface IDALUsuario
    {
        bool agregarUsuario(Usuario usu);
        bool borrarUsuario(Usuario usu);
        bool modificarUsuario(Usuario usu);
        bool loginUsuario(Usuario usu);
        Usuario obtenerUsuario(string email);
        List<Usuario> obtenerUsuarios();
        List<Usuario> obtenerUsuarios(string municipalidad);
        bool toggleUsuarioEnabled(string email, bool enabled);
        bool setPrivilegioUsuario(string email, string privilegio);
        List<Privilegio> getPrivilegios(string municipalidad);
    }
}
