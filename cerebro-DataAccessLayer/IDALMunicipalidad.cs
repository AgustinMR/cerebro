using cerebro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro_DataAccessLayer
{
    public interface IDALMunicipalidad
    {
        bool agregarMunicipalidad(Municipalidad muni);
        bool borrarMunicipalidad(Municipalidad muni);

    }
}
