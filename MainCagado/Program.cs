using cerebro;
using cerebro_DataAccessLayer;
using System;

namespace MainCagado
{
    class Program
    {
        static void Main(string[] args)
        {
            IDALTipoDeFuenteDeDato dalf = new DALTipoDeFuenteDeDato();

            
            Console.WriteLine(dalf.addTipoDeFuenteDeDato(t));
            Console.ReadLine();
        }
    }
}
