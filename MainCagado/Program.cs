using cerebro;
using cerebro_DataAccessLayer;
using System;

namespace MainCagado
{
    class Program
    {
        static void Main(string[] args)
        {

            /*Municipalidad muni = new Municipalidad("Mdeo", "ni idea...");
            DALMunicipalidad dal = new DALMunicipalidad();
            dal.agregarMunicipalidad(muni);*/

            /*Visitante vis = new Visitante("email","Mdeo",null);
            DALUsuario dal = new DALUsuario();
            dal.agregarVisitante(vis);*/

            Agrupacion_Usuario agru = new Agrupacion_Usuario("TSI.Net", "Mdeo", "email", "Mdeo", true);
            DALAgrupacion dal = new DALAgrupacion();
            dal.agregarAgrupacion(agru);
        }
    }
}
