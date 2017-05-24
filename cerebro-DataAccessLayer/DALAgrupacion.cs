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
                Agrupacion a = new Agrupacion(AUsu.nombre_agrupacion, AUsu.nombre_municipalidad_agrupacion);

                AgrupacionesDbContext context = new AgrupacionesDbContext();
                context.Agrupaciones.Add(a);
                context.SaveChanges();

                AgrupacionesDbContext context2 = new AgrupacionesDbContext();
                context2.Agrupaciones_Usuarios.Add(AUsu);
                context2.SaveChanges();
                return true;
            }
            return false;
        }

        public bool agregarUsuariosAgrupacion(Agrupacion_Usuario AUsu)
        {
            if (AUsu != null)
            {
                AgrupacionesDbContext context = new AgrupacionesDbContext();
                context.Agrupaciones_Usuarios.Add(AUsu);
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool cambiarAdminAgrupacion(Agrupacion_Usuario AUsu)
        {
            if (AUsu != null)
            {
                AgrupacionesDbContext context = new AgrupacionesDbContext();
                Agrupacion_Usuario AUsuDB = context.Agrupaciones_Usuarios.Find(AUsu.nombre_agrupacion, AUsu.nombre_municipalidad_agrupacion, AUsu.usuario_email, AUsu.nombre_municipalidad_usuario);
                AUsuDB.admin = AUsu.admin;
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool borrarUsuarioAgrupacion(Agrupacion_Usuario AUsu)
        {
            if (AUsu != null)
            {
                AgrupacionesDbContext context = new AgrupacionesDbContext();
                Agrupacion_Usuario AUsuDB = context.Agrupaciones_Usuarios.Find(AUsu.nombre_agrupacion, AUsu.nombre_municipalidad_agrupacion, AUsu.usuario_email, AUsu.nombre_municipalidad_usuario);
                context.Agrupaciones_Usuarios.Remove(AUsuDB);
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool borrarAgrupacion(Agrupacion grupo)
        {
            if (grupo != null)
            {
                AgrupacionesDbContext context = new AgrupacionesDbContext();
                List<Agrupacion_Usuario> AUsuDB = (from a in context.Agrupaciones_Usuarios where a.nombre_agrupacion == grupo.nombre where a.nombre_municipalidad_agrupacion == grupo.nombre_municipalidad select a).ToList();
                foreach (Agrupacion_Usuario a in AUsuDB)
                {
                    context.Agrupaciones_Usuarios.Remove(a);
                }
                context.SaveChanges();
                AgrupacionesDbContext context2 = new AgrupacionesDbContext();
                Agrupacion AUsuDB2 = context2.Agrupaciones.Find(grupo.nombre, grupo.nombre_municipalidad);
                context2.Agrupaciones.Remove(AUsuDB2);
                context2.SaveChanges();
                return true;
            }
            return false;
        }

        public bool borrarUsuarioAgrupaciones(Usuario usu)
        {
            if (usu != null)
            {
                AgrupacionesDbContext context = new AgrupacionesDbContext();
                List<Agrupacion_Usuario> AUsuDB = (from a in context.Agrupaciones_Usuarios where a.usuario_email == usu.email where a.nombre_municipalidad_usuario == usu.nombre_municipalidad select a).ToList();
                foreach (Agrupacion_Usuario a in AUsuDB)
                {
                    context.Agrupaciones_Usuarios.Remove(a);
                }
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public Agrupacion obtenerAgrupacion(string nombre, string municipalidad)
        {
            return new AgrupacionesDbContext().Agrupaciones.Find(nombre, municipalidad);
        }

        public List<Agrupacion_Usuario> obtenerUsuariosAgrupacion(string nombre, string municipalidad)
        {
            return new AgrupacionesDbContext().Agrupaciones.Find(nombre, municipalidad).AGRUPACIONES_USUARIOS.ToList();
        }
    }
}
