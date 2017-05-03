using cerebro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro_BusinessLogicLayer
{
    public interface IBLAgrupacion
    {
        bool addAgrupacion(Agrupacion grupo, Usuario usu);
        bool addUsuariosAgrupacion(Agrupacion grupo, Usuario usu);
        bool updateAdminAgrupacion(Agrupacion grupo, Usuario usu, bool esAdmin);
        bool deleteUsuarioAgrupacion(Agrupacion grupo, Usuario usu);
        bool deleteAgrupacion(Agrupacion grupo);
    }
}
