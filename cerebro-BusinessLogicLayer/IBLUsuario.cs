using cerebro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro_BusinessLogicLayer
{
    public interface IBLUsuario
    {
        bool addVisitante(Visitante vis);
        bool addOperador(Operador op);
        bool addAdministrador(Administrador admin);
        bool deleteVisitante(Visitante vis);
        bool deleteOperador(Operador op);
        bool deleteAdministrador(Administrador admin);
        bool updateVisitante(Visitante vis);
        bool updateOperador(Operador op);
        bool updateAdministrador(Administrador admin);
    }
}
