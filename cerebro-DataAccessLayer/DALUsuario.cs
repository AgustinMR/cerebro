using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cerebro;

namespace cerebro_DataAccessLayer
{
    public class DALUsuario : IDALUsuario
    { 

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //AGREGAR

        public bool agregarVisitante(Visitante vis)
        {
            return false;
        }

        public bool agregarOperador(Operador op)
        {
            
            return false;
        }

        public bool agregarAdministrador(Administrador admin)
        {
            
            return false;
        }


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //BORRAR

        public bool borrarVisitante(Visitante vis)
        { 
            return false;
        }

        public bool borrarOperador(Operador op)
        {
            return false;
        }

        public bool borrarAdministrador(Administrador admin)
        { 
            return false;
        }


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //MODIFICAR

        public bool modificarVisitante(Visitante vis)
        {
            return false;
        }

        public bool modificarOperador(Operador op)
        {      
            return false;
        }

        public bool modificarAdministrador(Administrador admin)
        {
            return false;
        }



    }
}
