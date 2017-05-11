using cerebro;
using cerebro_DataAccessLayer;
using System;

namespace MainCagado
{
    class Program
    {
        static void Main(string[] args)
        {

            Municipalidad muni = new Municipalidad("Mdeo", "ni idea...");
            Municipalidad muni2 = new Municipalidad("Florida", "en una galaxia muy muy lejana");
            DALMunicipalidad dalMuni = new DALMunicipalidad();
            dalMuni.agregarMunicipalidad(muni);
            dalMuni.agregarMunicipalidad(muni2);

            Visitante vis = new Visitante("gmail","Mdeo",null);
            Visitante vis2 = new Visitante("hotmail", "Mdeo", null);
            Visitante vis3 = new Visitante("email", "Mdeo", null);
            Administrador admin = new Administrador("admin", "Mdeo", null, "hola");
            Operador vis4 = new Operador("email", "Florida", "Agustin","hola");
            DALUsuario dal = new DALUsuario();

            dal.agregarUsuario(vis);
            dal.agregarUsuario(vis2);
            dal.agregarUsuario(vis3);
            dal.agregarUsuario(vis4);
            dal.agregarUsuario(admin);

            //vis3 = new Visitante("email", "Mdeo", "Agustin");
            //dal.borrarUsuario(vis3);

            /*Agrupacion_Usuario agru = new Agrupacion_Usuario("TSI.Net", "Mdeo", "hotmail", "Mdeo", false);
            Agrupacion_Usuario agruVis = new Agrupacion_Usuario("TSI.Net", "Mdeo", "email", "Mdeo", false);
            Agrupacion_Usuario agru2 = new Agrupacion_Usuario("TSI.1", "Mdeo", "gmail", "Mdeo", true);
            Agrupacion_Usuario agru3 = new Agrupacion_Usuario("TSI.2", "Mdeo", "hotmail", "Mdeo", true);
            DALAgrupacion dalAgru = new DALAgrupacion();
            dalAgru.agregarAgrupacion(agru2);
            dalAgru.agregarAgrupacion(agru3);
            dalAgru.agregarUsuariosAgrupacion(agru);
            dalAgru.borrarUsuarioAgrupacion(agruVis);
            Agrupacion ag = new Agrupacion("TSI.2", "Mdeo");
            dalAgru.borrarAgrupacion(ag);
            */
        }
    }
}
