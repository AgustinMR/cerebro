using cerebro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro_BusinessLogicLayer
{
    public interface IBLMunicipalidad
    {

        bool addMunicipalidad(Municipalidad muni);
        bool deleteMunicipalidad(Municipalidad muni);
        List<Municipalidad> getMunicipalidades();
        Municipalidad getMunicipalidad(string municipalidad);
    }
}
