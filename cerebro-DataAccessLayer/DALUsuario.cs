﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cerebro;
using System.Data.Entity;

namespace cerebro_DataAccessLayer
{
    public class UsuariosDbContext : DbContext
    {
        public UsuariosDbContext() : base("name=cerebroConnectionString") { }
        public DbSet<Usuario> Usuarios { get; set; }
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
                return context.SaveChanges() > 0;
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
            else if (usu.GetType() == typeof(Operador)) {
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

        public Usuario obtenerUsuario(string email)
        {
            return (from u in new UsuariosDbContext().Usuarios where u.email == email select u).SingleOrDefault();
        }

        public List<Usuario> obtenerUsuarios()
        {
            return new UsuariosDbContext().Usuarios.ToList();
        }

        public List<Usuario> obtenerUsuarios(string municipalidad)
        {
            return (from u in new UsuariosDbContext().Usuarios where u.nombre_municipalidad == municipalidad select u).ToList();
        }

        public bool toggleUsuarioEnabled(string email, bool enabled)
        {
            Usuario u = obtenerUsuario(email);
            u.enabled = enabled;
            return modificarUsuario(u);
        }

        public bool setPrivilegioUsuario(string email, string privilegio)
        {
            Usuario u = obtenerUsuario(email);
            var p = new List<Privilegio>();
            p.Add(new Privilegio(privilegio, u.nombre_municipalidad));
            u.PRIVILEGIOS = p;
            return modificarUsuario(u);
        }
    }
}
