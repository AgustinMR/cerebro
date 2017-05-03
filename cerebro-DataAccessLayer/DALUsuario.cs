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
    public class DALUsuario
    {
        public NpgsqlConnection iniciarConeccion()
        {
            NpgsqlConnection conn = new NpgsqlConnection("Server=127.0.0.1;Port=5432;Database=cerebroDB;User Id=postgres;Password=postgres;");
            conn.Open();
            if (conn.State == System.Data.ConnectionState.Open)
                return conn;
            return null;
        }

        private bool agregarUsuario(String email, String nombre, String muni)
        {

            if (email != null && muni != null)
            {
                NpgsqlConnection conn = iniciarConeccion();
                //NpgsqlCommand command = new NpgsqlCommand();
                NpgsqlCommand command = new NpgsqlCommand("INSERT INTO usuarios (email, nombre_municipalidad, nombre) VALUES ('" + email + "','" + muni + "', '" + nombre + "')", conn);
                //command.Connection = conn;
                //command.CommandText = "INSERT INTO USUARIOS(email, nombre, numbre_municipalidad) VALUES(:email, :nombre, :muni)";

                //var emailParam = command.CreateParameter();
                //emailParam.Direction = ParameterDirection.Input;
                //emailParam.DbType = DbType.String;
                //emailParam.ParameterName = "email";
                //emailParam.Value = email;
                //command.Parameters.Add(emailParam);

                //var nomParam = command.CreateParameter();
                //nomParam.Direction = ParameterDirection.Input;
                //nomParam.DbType = DbType.String;
                //nomParam.ParameterName = "nombre";
                //nomParam.Value = nombre;
                //command.Parameters.Add(nomParam);

                //var muniParam = command.CreateParameter();
                //muniParam.Direction = ParameterDirection.Input;
                //muniParam.DbType = DbType.String;
                //muniParam.ParameterName = "muni";
                //muniParam.Value = muni;
                //command.Parameters.Add(muniParam);

                command.ExecuteScalar();
                conn.Close();
                return true;
            }
            else
                return false;
        }

        public bool agregarVisitante(Visitante vis)
        {
            return agregarUsuario(vis.email, vis.nombre, vis.nombre_muni);
        }

        public bool agregarOperador(Operador op)
        {
            if (agregarUsuario(op.email, op.nombre, op.nombre_muni) == true) {
                NpgsqlConnection conn = iniciarConeccion();
                NpgsqlCommand command = new NpgsqlCommand("INSERT INTO operadores (operador_email, nombre_municipalidad, password) VALUES ('" + op.email + "','" + op.nombre_muni + "', '" + op.password + "')", conn);
                command.ExecuteScalar();
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
                command.ExecuteScalar();
                conn.Close();
                return true;
            }
            return false;
        }
    }
}
