using cerebro;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro_BusinessLogicLayer
{
    public interface IBLEvento
    {
        bool addEvento(Evento e);
        bool addUmbral(Umbral u);
        bool updateEvento(Evento e);
        bool deleteEvento(ObjectId id);
        Evento getEvento(ObjectId id);
        List<Evento> getAllEventos();
    }
}
