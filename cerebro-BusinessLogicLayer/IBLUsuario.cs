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
        Usuario obtenerUsuario(string email);
        List<Usuario> obtenerUsuarios();
        List<Usuario> obtenerUsuarios(string municipalidad);
        List<Agrupacion_Usuario> obtenerAgrupacionesByUsuario(string email, string municipalidad);
    }
}
