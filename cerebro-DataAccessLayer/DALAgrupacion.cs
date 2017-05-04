using cerebro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace cerebro_DataAccessLayer
{
    public class AgrupacionesDbContext : DbContext
    {
        public AgrupacionesDbContext() : base("name=cerebroConnectionString") { }
        public DbSet<Agrupacion> Agrupaciones { get; set; }
        public DbSet<Agrupacion_Usuario> Agrupaciones_Usuarios { get; set; }
    }

    public class DALAgrupacion : IDALAgrupacion
    {
        public bool agregarAgrupacion(Agrupacion_Usuario AUsu)
        {
            if (AUsu != null)
            {
                AgrupacionesDbContext context = new AgrupacionesDbContext();
                Agrupacion a = new Agrupacion(AUsu.nombre_agrupacion,AUsu.nombre_municipalidad_agrupacion);
                context.Agrupaciones.Add(a);
                context.Agrupaciones_Usuarios.Add(AUsu);
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool agregarUsuariosAgrupacion(Agrupacion_Usuario AUsu)
        {
            return true;
        }

        public bool cambiarAdminAgrupacion(Agrupacion_Usuario AUsu)
        {
            return true;
        }

        public bool borrarUsuarioAgrupacion(Agrupacion_Usuario AUsu)
        {
            return true;
        }

        public bool borrarAgrupacion(Agrupacion grupo)
        {
            return true;
        }


    }
}
