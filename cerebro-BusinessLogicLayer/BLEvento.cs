using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cerebro;
using MongoDB.Bson;
using cerebro_DataAccessLayer;

namespace cerebro_BusinessLogicLayer
{
    class BLEvento : IBLEvento
    {

        IDALEvento dal = null;

        public BLEvento()
        {
            dal = new DALEvento();
        }

        public bool addEvento(Evento e)
        {
            return dal.addEvento(e);
        }

        public bool deleteEvento(ObjectId id)
        {
            return dal.deleteEvento(id);
        }

        public List<Evento> getAllEventos()
        {
            return dal.getAllEventos();
        }

        public Evento getEvento(ObjectId id)
        {
            return dal.getEvento(id);
        }

        public bool updateEvento(Evento e)
        {
            return dal.updateEvento(e);
        }
    }
}
