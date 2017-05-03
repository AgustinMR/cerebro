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

        public bool addAgrupacion(Agrupacion grupo, Usuario usu)
        {
            return dal.agregarAgrupacion(grupo, usu);
        }

        public bool addUsuariosAgrupacion(Agrupacion grupo, Usuario usu)
        {
            return dal.agregarUsuariosAgrupacion(grupo, usu);
        }

        public bool updateAdminAgrupacion(Agrupacion grupo, Usuario usu, bool esAdmin)
        {
            return dal.cambiarAdminAgrupacion(grupo, usu, esAdmin);
        }

        public bool deleteUsuarioAgrupacion(Agrupacion grupo, Usuario usu)
        {
            return dal.borrarUsuarioAgrupacion(grupo, usu);
        }

        public bool deleteAgrupacion(Agrupacion grupo)
        {
            return dal.borrarAgrupacion(grupo);
        }
    }
}
