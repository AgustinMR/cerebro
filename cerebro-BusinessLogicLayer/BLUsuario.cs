using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cerebro;
using cerebro_DataAccessLayer;

namespace cerebro_BusinessLogicLayer
{
    public class BLUsuario
    {

        IDALUsuario dal = null;

        public BLUsuario()
        {
            dal = new DALUsuario();
        }

        public bool addVisitante(Visitante vis)
        {
            return dal.agregarVisitante(vis);
        }

        public bool addOperador(Operador op){
            return dal.agregarOperador(op);
        }

        public bool addAdministrador(Administrador admin) {
            return dal.agregarAdministrador(admin);
        }

        public bool deleteVisitante(Visitante vis) {
            return dal.borrarVisitante(vis);
        }

        public bool deleteOperador(Operador op) {
            return dal.borrarOperador(op);
        }

        public bool deleteAdministrador(Administrador admin) {
            return dal.borrarAdministrador(admin);
        }

        public bool updateVisitante(Visitante vis) {
            return dal.modificarVisitante(vis);
        }

        public bool updateOperador(Operador op) {
            return dal.modificarOperador(op);
        }

        public bool updateAdministrador(Administrador admin) {
            return dal.modificarAdministrador(admin);
        }
    }
}
