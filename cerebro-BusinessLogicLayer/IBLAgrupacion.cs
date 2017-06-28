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
        bool addAgrupacion(Agrupacion_Usuario AUsu);
        bool addUsuariosAgrupacion(Agrupacion_Usuario AUsu);
        bool updateAdminAgrupacion(Agrupacion_Usuario AUsu);
        bool deleteUsuarioAgrupacion(Agrupacion_Usuario AUsu);
        bool deleteAgrupacion(Agrupacion grupo);
        Agrupacion obtenerAgrupacion(string nombre, string municipalidad);
        List<Agrupacion_Usuario> obtenerUsuariosAgrupacion(string nombre);
        List<string> obtenerAgrupacionesByUsuario(Agrupacion_Usuario a);
    }
}
