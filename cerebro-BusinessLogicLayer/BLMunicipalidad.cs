using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cerebro_DataAccessLayer;
using cerebro;

namespace cerebro_BusinessLogicLayer
{
    public class BLMunicipalidad : IBLMunicipalidad
    {
        IDALMunicipalidad dal = null;

        public BLMunicipalidad()
        {
            dal = new DALMunicipalidad();
        }

        public bool addMunicipalidad(Municipalidad muni) {
            return dal.agregarMunicipalidad(muni);
        }

        public bool deleteMunicipalidad(Municipalidad muni) {
            return dal.borrarMunicipalidad(muni);
        }

    }
}
