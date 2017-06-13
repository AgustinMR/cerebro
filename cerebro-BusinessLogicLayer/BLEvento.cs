using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cerebro;
using MongoDB.Bson;
using cerebro_DataAccessLayer;
using System.Reflection;

namespace cerebro_BusinessLogicLayer
{
    public class BLEvento : IBLEvento
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

        public bool addUmbral(Umbral u)
        {
            return dal.addUmbral(u);
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


        public void dispararAccionEvento(string idEve, string nombre)
        {
            if (dal.addDatosEvento(idEve, nombre))
            {
                var DLL = Assembly.LoadFile(@"C:\DLLs\" + idEve + ".dll");
                Type testType = DLL.GetExportedTypes()[0];

                ConstructorInfo ctor = testType.GetConstructor(System.Type.EmptyTypes);
                if (ctor != null)
                {
                    object instance = ctor.Invoke(null);
                    MethodInfo methodInfo = testType.GetMethod("Invocar");
                    methodInfo.Invoke(instance, new object[] { /*   */});
                }
            }
        }
    }
}
