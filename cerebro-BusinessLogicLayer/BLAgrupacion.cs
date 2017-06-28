using cerebro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cerebro_DataAccessLayer;

namespace cerebro_BusinessLogicLayer
{
    public class BLAgrupacion : IBLAgrupacion
    {

        IDALAgrupacion dal = null;

        public BLAgrupacion()
        {
            dal = new DALAgrupacion();
        }

        public bool addAgrupacion(Agrupacion_Usuario AUsu)
        {
            return dal.agregarAgrupacion(AUsu);
        }

        public bool addUsuariosAgrupacion(Agrupacion_Usuario AUsu)
        {
            return dal.agregarUsuariosAgrupacion(AUsu);
        }

        public bool updateAdminAgrupacion(Agrupacion_Usuario AUsu)
        {
            return dal.cambiarAdminAgrupacion(AUsu);
        }

        public bool deleteUsuarioAgrupacion(Agrupacion_Usuario AUsu)
        {
            return dal.borrarUsuarioAgrupacion(AUsu);
        }

        public bool deleteAgrupacion(Agrupacion grupo)
        {
            return dal.borrarAgrupacion(grupo);
        }

        public Agrupacion obtenerAgrupacion(string nombre, string municipalidad)
        {
            return dal.obtenerAgrupacion(nombre, municipalidad);
        }

        public List<Agrupacion_Usuario> obtenerUsuariosAgrupacion(string nombre)
        {
            return dal.obtenerUsuariosAgrupacion(nombre);
        }

        public List<string> obtenerAgrupacionesByUsuario(Agrupacion_Usuario a)
        {
            return dal.obtenerAgrupacionesByUsuario(a);
        }
    }
}
