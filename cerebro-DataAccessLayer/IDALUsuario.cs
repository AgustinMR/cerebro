using cerebro;
using MongoDB.Bson;
using System.Collections.Generic;

namespace cerebro_DataAccessLayer
{
    public interface IDALUsuario
    {
        bool agregarUsuario(Usuario usu);
        bool borrarUsuario(Usuario usu);
        bool modificarUsuario(Usuario usu);
        bool loginUsuario(Usuario usu);
        Usuario obtenerUsuario(string email, string municipalidad);
        List<Usuario> obtenerUsuarios();
        List<Usuario> obtenerUsuarios(string municipalidad);
        bool toggleUsuarioEnabled(string email, string muni, bool enabled);
        bool setPrivilegioUsuario(string email, string muni, string privilegio);
        List<Privilegio> getPrivilegios(string municipalidad);
        List<PrivilegiosUsuarios> getPrivilegiosUsuarios(string email, string muni);
        bool deletePrivilegioUsuario(string email, string muni, string privilegio);
        bool addZona(Zonas z);
        List<Zonas> getZonas(string email, string muni);
        bool agregarPrivilegio(string privilegio, string municipalidad);
        bool deleteZona(ObjectId id);
    }
}
