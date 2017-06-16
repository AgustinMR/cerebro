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
        string addEvento(Evento e);
        bool addUmbral(Umbral u);
        bool updateEvento(Evento e);
        bool deleteEvento(ObjectId id);
        Evento getEvento(ObjectId id);
        List<Evento> getAllEventos();
        bool addDatosEvento(string idEve, string nombre);
        List<Accion> getAcciones(string muni);
        List<Evento> getEventosMuni(string muni);
        List<Umbral> getUmbralesEve(string idEve);
        bool updateUmbral(Umbral u);
        bool deleteUmbral(ObjectId id);
    }
}
