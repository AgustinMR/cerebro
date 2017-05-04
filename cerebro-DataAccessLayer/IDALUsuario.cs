using cerebro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro_DataAccessLayer
{
    public interface IDALUsuario
    {
        bool agregarUsuario(Usuario usu);
        bool borrarUsuario(Usuario usu);
        bool modificarUsuario(Usuario usu);
    }
}
