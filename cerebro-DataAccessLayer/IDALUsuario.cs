using cerebro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro_DataAccessLayer
{
    public interface IDALUsuario
    {
        bool agregarVisitante(Visitante vis);
        bool agregarOperador(Operador op);
        bool agregarAdministrador(Administrador admin);
        bool borrarVisitante(Visitante vis);
        bool borrarOperador(Operador op);
        bool borrarAdministrador(Administrador admin);
        bool modificarVisitante(Visitante vis);
        bool modificarOperador(Operador op);
        bool modificarAdministrador(Administrador admin);
    }
}
