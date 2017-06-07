using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using cerebro;

namespace cerebro_DataAccessLayer
{

    public class MunicipalidadesDbContext : DbContext
    {
        public MunicipalidadesDbContext() : base("name=cerebroConnectionString") { }
        public DbSet<Municipalidad> Municipalidades { get; set; }
    }

    public class DALMunicipalidad : IDALMunicipalidad
    {

        public bool agregarMunicipalidad(Municipalidad muni)
        {
            if (muni != null)
            {
                MunicipalidadesDbContext context = new MunicipalidadesDbContext();
                context.Municipalidades.Add(muni);
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool borrarMunicipalidad(Municipalidad muni)
        {
            if (muni != null)
            {
                MunicipalidadesDbContext context = new MunicipalidadesDbContext();
                Municipalidad muniDB = context.Municipalidades.Find(muni.nombre);
                context.Municipalidades.Remove(muniDB);
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public Municipalidad getMunicipalidad(string municipalidad)
        {
            return new MunicipalidadesDbContext().Municipalidades.Find(municipalidad);
        }

        public List<Municipalidad> getMunicipalidades()
        {
            return new MunicipalidadesDbContext().Municipalidades.ToList();
        }

    }
}
