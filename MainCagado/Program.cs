using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cerebro_DataAccessLayer;

namespace MainCagado
{
    class Program
    {
        static void Main(string[] args)
        {
            DALUsuario dalUsu = new DALUsuario();
            if (dalUsu.agregarVisitante("bruno.carballido@gmail.com", "Bruno", "Mdeo2") == true)
            {
                Console.WriteLine("YEEEES");
                Console.ReadLine();
            }
            else {
                Console.WriteLine(":(");
                Console.ReadLine();
            }
        }
    }
}
