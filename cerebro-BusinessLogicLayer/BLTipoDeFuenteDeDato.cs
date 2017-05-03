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
    public class BLTipoDeFuenteDeDato : IBLTipoDeFuenteDeDato
    {

        IDALTipoDeFuenteDeDato dal = null;

        public BLTipoDeFuenteDeDato() {
            dal = new DALTipoDeFuenteDeDato();
        }

        public bool addTipoDeFuenteDeDato(TipoDeFuenteDeDato t)
        {
            return dal.addTipoDeFuenteDeDato(t);
        }

        public bool deleteTipoDeFuenteDeDato(ObjectId id)
        {
            return dal.deleteTipoDeFuenteDeDato(id);
        }

        public List<TipoDeFuenteDeDato> getAllTipoDeFuenteDeDatos()
        {
            return dal.getAllTipoDeFuenteDeDatos();
        }

        public TipoDeFuenteDeDato getTipoDeFuenteDeDato(ObjectId id)
        {
            return dal.getTipoDeFuenteDeDato(id);
        }

        public bool updateTipoDeFuenteDeDato(TipoDeFuenteDeDato t)
        {
            return dal.updateTipoDeFuenteDeDato(t);
        }
    }
}
