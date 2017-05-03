using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cerebro;

namespace cerebro_DataAccessLayer
{
    public class DALUsuario : IDALUsuario
    {
        private NpgsqlConnection iniciarConeccion()
        {
            NpgsqlConnection conn = new NpgsqlConnection("Server=127.0.0.1;Port=5432;Database=cerebroDB;User Id=postgres;Password=postgres;");
            conn.Open();
            if (conn.State == System.Data.ConnectionState.Open)
                return conn;
            return null;
        }


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //USUARIOS

        private bool agregarUsuario(String email, String nombre, String muni)
        {

            if (email != null && muni != null)
            {
                NpgsqlConnection conn = iniciarConeccion();
                NpgsqlCommand command = new NpgsqlCommand("INSERT INTO usuarios (email, nombre_municipalidad, nombre) VALUES ('" + email + "','" + muni + "', '" + nombre + "')", conn);
                command.ExecuteNonQuery();
                conn.Close();
                return true;
            }
            else
                return false;
        }

        private bool borrarUsuario(String email, String muni)
        {

            if (email != null && muni != null)
            {
                NpgsqlConnection conn = iniciarConeccion();
                NpgsqlCommand command = new NpgsqlCommand("DELETE FROM usuarios WHERE email='" + email + "' AND nombre_municipalidad='" + muni + "'", conn);
                command.ExecuteNonQuery();
                conn.Close();
                return true;
            }
            else
                return false;
        }

        private bool modificarUsuario(String email, String nombre, String muni)
        {

            if (email != null && muni != null)
            {
                NpgsqlConnection conn = iniciarConeccion();
                NpgsqlCommand command = new NpgsqlCommand("UPDATE usuarios SET nombre='" + nombre + "' WHERE email='" + email + "' AND nombre_municipalidad='" + muni + "'", conn);
                command.ExecuteNonQuery();
                conn.Close();
                return true;
            }
            else
                return false;
        }


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //AGREGAR

        public bool agregarVisitante(Visitante vis)
        {
            if (agregarUsuario(vis.email, vis.nombre, vis.nombre_muni) == true)
            {
                NpgsqlConnection conn = iniciarConeccion();
                NpgsqlCommand command = new NpgsqlCommand("INSERT INTO visitantes (visitante_email, nombre_municipalidad) VALUES ('" + vis.email + "','" + vis.nombre_muni + "')", conn);
                command.ExecuteNonQuery();
                conn.Close();
                return true;
            }
            return false;
        }

        public bool agregarOperador(Operador op)
        {
            if (agregarUsuario(op.email, op.nombre, op.nombre_muni) == true)
            {
                NpgsqlConnection conn = iniciarConeccion();
                NpgsqlCommand command = new NpgsqlCommand("INSERT INTO operadores (operador_email, nombre_municipalidad, password) VALUES ('" + op.email + "','" + op.nombre_muni + "', '" + op.password + "')", conn);
                command.ExecuteNonQuery();
                conn.Close();
                return true;
            }
            return false;
        }

        public bool agregarAdministrador(Administrador admin)
        {
            if (agregarUsuario(admin.email, admin.nombre, admin.nombre_muni) == true)
            {
                NpgsqlConnection conn = iniciarConeccion();
                NpgsqlCommand command = new NpgsqlCommand("INSERT INTO administrador (admin_email, nombre_municipalidad, password) VALUES ('" + admin.email + "','" + admin.nombre_muni + "', '" + admin.password + "')", conn);
                command.ExecuteNonQuery();
                conn.Close();
                return true;
            }
            return false;
        }


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //BORRAR

        public bool borrarVisitante(Visitante vis)
        {
            if (borrarUsuario(vis.email, vis.nombre_muni) == true)
            {
                NpgsqlConnection conn = iniciarConeccion();
                NpgsqlCommand command = new NpgsqlCommand("DELETE FROM visitantes WHERE visitante_email='" + vis.email + "' AND nombre_municipalidad='" + vis.nombre_muni + "'", conn);
                command.ExecuteNonQuery();
                conn.Close();
                return true;
            }
            return false;
        }

        public bool borrarOperador(Operador op)
        {
            if (borrarUsuario(op.email, op.nombre_muni) == true)
            {
                NpgsqlConnection conn = iniciarConeccion();
                NpgsqlCommand command = new NpgsqlCommand("DELETE FROM operadores WHERE operador_email='" + op.email + "' AND nombre_municipalidad='" + op.nombre_muni + "'", conn);
                command.ExecuteNonQuery();
                conn.Close();
                return true;
            }
            return false;
        }

        public bool borrarAdministrador(Administrador admin)
        {
            if (borrarUsuario(admin.email, admin.nombre_muni) == true)
            {
                NpgsqlConnection conn = iniciarConeccion();
                NpgsqlCommand command = new NpgsqlCommand("DELETE FROM administrador WHERE admin_email='" + admin.email + "' AND nombre_municipalidad='" + admin.nombre_muni + "'", conn);
                command.ExecuteNonQuery();
                conn.Close();
                return true;
            }
            return false;
        }


        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //MODIFICAR

        public bool modificarVisitante(Visitante vis)
        {
            if (modificarUsuario(vis.email, vis.nombre, vis.nombre_muni) == true)
                return true;
            return false;
        }

        public bool modificarOperador(Operador op)
        {
            if (modificarUsuario(op.email, op.nombre, op.nombre_muni) == true) {
                NpgsqlConnection conn = iniciarConeccion();
                NpgsqlCommand command = new NpgsqlCommand("UPDATE operadores SET password='" + op.password + "' WHERE operador_email='" + op.email + "' AND nombre_municipalidad='" + op.nombre_muni + "'", conn);
                command.ExecuteNonQuery();
                conn.Close();
                return true;
            }                
            return false;
        }

        public bool modificarAdministrador(Administrador admin)
        {
            if (modificarUsuario(admin.email, admin.nombre, admin.nombre_muni) == true)
            {
                NpgsqlConnection conn = iniciarConeccion();
                NpgsqlCommand command = new NpgsqlCommand("UPDATE administrador SET password='" + admin.password + "' WHERE admin_email='" + admin.email + "' AND nombre_municipalidad='" + admin.nombre_muni + "'", conn);
                command.ExecuteNonQuery();
                conn.Close();
                return true;
            }
            return false;
        }



    }
}
