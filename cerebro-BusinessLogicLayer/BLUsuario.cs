using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cerebro;
using cerebro_DataAccessLayer;

namespace cerebro_BusinessLogicLayer
{
    public class BLUsuario : IBLUsuario
    {

        IDALUsuario dal = null;

        public BLUsuario()
        {
            dal = new DALUsuario();
        }

        public bool addUsuario(Usuario usu)
        {
            return dal.agregarUsuario(usu);
        }

        public bool deleteUsuario(Usuario usu) {
            return dal.borrarUsuario(usu);
        }

        public bool updateUsuario(Usuario usu) {
            return dal.modificarUsuario(usu);
        }
    }
}
