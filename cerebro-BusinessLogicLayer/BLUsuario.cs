using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cerebro;
using cerebro_DataAccessLayer;
using System.Reflection;

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

        public bool deleteUsuario(Usuario usu)
        {
            return dal.borrarUsuario(usu);
        }

        public bool updateUsuario(Usuario usu)
        {
            return dal.modificarUsuario(usu);
        }

        public bool loginUsuario(Usuario usu)
        {
            return dal.loginUsuario(usu);
        }

        public Usuario obtenerUsuario(string email)
        {
            return dal.obtenerUsuario(email);
        }

        public List<Usuario> obtenerUsuarios()
        {
            return dal.obtenerUsuarios();
        }

        public List<Usuario> obtenerUsuarios(string municipalidad)
        {
            return dal.obtenerUsuarios(municipalidad);
        }

        public bool toggleUsuarioEnabled(string email, bool enabled)
        {
            return dal.toggleUsuarioEnabled(email, enabled);
        }

        public bool setPrivilegioUsuario(string email, string privilegio)
        {
            return dal.setPrivilegioUsuario(email, privilegio);
        }
    }
}
