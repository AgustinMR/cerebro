using System;
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

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //AGREGAR

        public bool agregarVisitante(Visitante vis)
        {
            if (vis != null)
            {
                UsuariosDbContext context = new UsuariosDbContext();
                context.Usuarios.Add(vis);
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public bool agregarOperador(Operador op)
        {
            
            return false;
        }

        public bool agregarAdministrador(Administrador admin)
        {
            
            return false;
        }


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //BORRAR

        public bool borrarVisitante(Visitante vis)
        { 
            return false;
        }

        public bool borrarOperador(Operador op)
        {
            return false;
        }

        public bool borrarAdministrador(Administrador admin)
        { 
            return false;
        }


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //MODIFICAR

        public bool modificarVisitante(Visitante vis)
        {
            return false;
        }

        public bool modificarOperador(Operador op)
        {      
            return false;
        }

        public bool modificarAdministrador(Administrador admin)
        {
            return false;
        }



    }
}
