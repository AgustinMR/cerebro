using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cerebro;
using System.Data.Entity;
using MongoDB.Driver;

namespace cerebro_DataAccessLayer
{
    public class UsuariosDbContext : DbContext
    {
        public UsuariosDbContext() : base("name=cerebroConnectionString") { }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Privilegio> Privilegios { get; set; }
        public DbSet<PrivilegiosUsuarios> PrivilegiosUsu { get; set; }
    }

    public class DALUsuario : IDALUsuario
    {
        public bool agregarUsuario(Usuario usu)
        {
            if (usu != null)
            {
                usu.enabled = true;
                UsuariosDbContext context = new UsuariosDbContext();
                context.Usuarios.Add(usu);
                if (context.SaveChanges() > 0) {
                    if (usu.GetType() == typeof(Visitante))
                    {
                        setPrivilegioUsuario(usu.email, usu.nombre_municipalidad, "Visitante");
                    }
                    else if (usu.GetType() == typeof(Operador))
                    {
                        setPrivilegioUsuario(usu.email, usu.nombre_municipalidad, "Operador");
                    }
                    else if (usu.GetType() == typeof(Administrador))
                    {
                        setPrivilegioUsuario(usu.email, usu.nombre_municipalidad, "Admin");
                    }
                }
                return true;
            }
            return false;
        }

        public bool borrarUsuario(Usuario usu)
        {
            if (usu != null)
            {
                DALAgrupacion dalAgru = new DALAgrupacion();
                dalAgru.borrarUsuarioAgrupaciones(usu);
                UsuariosDbContext context = new UsuariosDbContext();
                Usuario UsuDB = context.Usuarios.Find(usu.email, usu.nombre_municipalidad);
                context.Usuarios.Remove(UsuDB);
                return context.SaveChanges() > 0;
            }
            return false;
        }

        public bool modificarUsuario(Usuario usu)
        {
            if (usu != null)
            {
                UsuariosDbContext context = new UsuariosDbContext();
                Usuario UsuDB = context.Usuarios.Find(usu.email, usu.nombre_municipalidad);
                if (usu.nombre != null)
                    UsuDB.nombre = usu.nombre;
                if (usu.GetType() == typeof(Operador))
                    ((Operador)UsuDB).password = ((Operador)usu).password;
                if (usu.GetType() == typeof(Administrador))
                    ((Administrador)UsuDB).password = ((Administrador)usu).password;
                return context.SaveChanges() > 0;
            }
            return false;
        }

        public bool loginUsuario(Usuario usu)
        {
            if (usu.GetType() == typeof(Visitante))
            {
                UsuariosDbContext context = new UsuariosDbContext();
                Usuario UsuDB = context.Usuarios.Find(usu.email, usu.nombre_municipalidad);
                if (UsuDB != null && UsuDB.GetType() == typeof(Visitante))
                    return true;
                else
                    return false;
            }
            else if (usu.GetType() == typeof(Operador))
            {
                UsuariosDbContext context = new UsuariosDbContext();
                Usuario UsuDB = context.Usuarios.Find(usu.email, usu.nombre_municipalidad);
                if (UsuDB != null && UsuDB.GetType() == typeof(Operador) && ((Operador)UsuDB).password == ((Operador)usu).password)
                    return true;
                else
                    return false;
            }
            else if (usu.GetType() == typeof(Administrador))
            {
                UsuariosDbContext context = new UsuariosDbContext();
                Usuario UsuDB = context.Usuarios.Find(usu.email, usu.nombre_municipalidad);
                if (UsuDB != null && UsuDB.GetType() == typeof(Administrador) && ((Administrador)UsuDB).password == ((Administrador)usu).password)
                    return true;
                else
                    return false;
            }
            return false;
        }

        public Usuario obtenerUsuario(string email, string municipalidad)
        {
            return new UsuariosDbContext().Usuarios.Find(email, municipalidad);
        }

        public List<Usuario> obtenerUsuarios()
        {
            return new UsuariosDbContext().Usuarios.ToList();
        }

        public List<Usuario> obtenerUsuarios(string municipalidad)
        {
            return (from u in new UsuariosDbContext().Usuarios where u.nombre_municipalidad == municipalidad select u).ToList();
        }

        public bool toggleUsuarioEnabled(string email, string muni, bool enabled)
        {
            UsuariosDbContext context = new UsuariosDbContext();
            Usuario UsuDB = context.Usuarios.Find(email, muni);
            UsuDB.enabled = enabled;
            return context.SaveChanges() > 0;
        }

        public bool setPrivilegioUsuario(string email, string muni, string privilegio)
        {
            PrivilegiosUsuarios p = new PrivilegiosUsuarios();
            p.Usuario_email = email;
            p.Usuario_nombre_municipalidad = muni;
            p.Privilegio_nombre_municipalidad = muni;
            p.Privilegio_nombre = privilegio;
            UsuariosDbContext context = new UsuariosDbContext();
            context.PrivilegiosUsu.Add(p);
            return context.SaveChanges() > 0;
        }

        public List<Privilegio> getPrivilegios(string municipalidad)
        {
            return (from u in new UsuariosDbContext().Privilegios where u.nombre_municipalidad == municipalidad select u).ToList();
        }

        public List<PrivilegiosUsuarios> getPrivilegiosUsuarios(string email, string muni)
        {
            return (from u in new UsuariosDbContext().PrivilegiosUsu where u.Usuario_email == email where u.Usuario_nombre_municipalidad == muni where u.Privilegio_nombre_municipalidad == muni select u).ToList();
        }

        public bool deletePrivilegioUsuario(string email, string muni, string privilegio) {
            UsuariosDbContext context = new UsuariosDbContext();
            PrivilegiosUsuarios PrivUsu = context.PrivilegiosUsu.Find(privilegio,muni,email,muni);
            context.PrivilegiosUsu.Remove(PrivUsu);
            return context.SaveChanges() > 0;
        }

        public bool addZona(Zonas z)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var employees = bd.GetCollection<Zonas>("Zonas");
            employees.InsertOne(z);
            return true;
        }

        public List<Zonas> getZonas(string email, string muni)
        {
            var mongo = new MongoClient();
            var bd = mongo.GetDatabase("cerebroDB");
            var zonasBD = bd.GetCollection<Zonas>("Zonas");
            var filter = Builders<Zonas>.Filter.Eq("emailUsuario", email) & Builders<Zonas>.Filter.Eq("municipalidadUsuario", muni);
            return zonasBD.Find(filter).ToList();
        }

        public bool agregarPrivilegio(string privilegio, string municipalidad)
        {
            var context = new UsuariosDbContext();
            context.Privilegios.Add(new Privilegio() {
                nombre = privilegio,
                nombre_municipalidad = municipalidad
            });
            return context.SaveChanges() > 0;
        }
    }
}
