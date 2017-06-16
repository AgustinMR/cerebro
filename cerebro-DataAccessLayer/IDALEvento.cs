using cerebro;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro_DataAccessLayer
{
    public interface IDALEvento
    {
        bool addEvento(Evento e);
        bool addUmbral(Umbral u);
        bool updateEvento(Evento e);
        bool deleteEvento(ObjectId id);
        Evento getEvento(ObjectId id);
        List<Evento> getAllEventos();
        bool addDatosEvento(string idEve, string nombre);
        List<Accion> getAcciones(string muni);
    }
}
