using cerebro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro_BusinessLogicLayer
{
    public interface IBLUsuario
    {
        bool addUsuario(Usuario usu);
        bool deleteUsuario(Usuario usu);
        bool updateUsuario(Usuario usu);
        bool loginUsuario(Usuario usu);
        Usuario obtenerUsuario(string email, string municipalidad);
        List<Usuario> obtenerUsuarios();
        List<Usuario> obtenerUsuarios(string municipalidad);
        bool toggleUsuarioEnabled(string email, string muni, bool enabled);
        bool setPrivilegioUsuario(string email, string muni, string privilegio);
        List<Privilegio> getPrivilegios(string municipalidad);
        List<PrivilegiosUsuarios> getPrivilegiosUsuarios(string email, string muni);
        bool deletePrivilegioUsuario(string email, string muni, string privilegio);
    }
}
