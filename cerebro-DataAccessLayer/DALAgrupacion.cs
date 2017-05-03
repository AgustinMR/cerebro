using cerebro;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace cerebro_DataAccessLayer
{
    public class DALAgrupacion : IDALAgrupacion
    {
        private NpgsqlConnection iniciarConeccion()
        {
            NpgsqlConnection conn = new NpgsqlConnection("Server=127.0.0.1;Port=5432;Database=cerebroDB;User Id=postgres;Password=postgres;");
            conn.Open();
            if (conn.State == System.Data.ConnectionState.Open)
                return conn;
            return null;
        }

        public bool agregarAgrupacion(Agrupacion grupo, Usuario usu)
        {

            NpgsqlConnection conn = iniciarConeccion();
            NpgsqlCommand command = new NpgsqlCommand("INSERT INTO agrupaciones (nombre, nombre_municipalidad) VALUES ('" + grupo.nombre + "','" + grupo.nombre_muni + "')", conn);
            command.ExecuteNonQuery();
            NpgsqlCommand command2 = new NpgsqlCommand("INSERT INTO agrupaciones_usuarios (nombre_agrupacion, nombre_municipalidad_agrupacion, usuario_email, nombre_municipalidad_usuario, admin) VALUES ('" + grupo.nombre + "','" + grupo.nombre_muni + "','" + usu.email + "','" + usu.nombre_muni + "',true)", conn);
            command2.ExecuteNonQuery();
            conn.Close();
            return true;
        }

        public bool agregarUsuariosAgrupacion(Agrupacion grupo, Usuario usu)
        {

            NpgsqlConnection conn = iniciarConeccion();
            NpgsqlCommand command = new NpgsqlCommand("INSERT INTO agrupaciones_usuarios (nombre_agrupacion, nombre_municipalidad_agrupacion, usuario_email, nombre_municipalidad_usuario, admin) VALUES ('" + grupo.nombre + "','" + grupo.nombre_muni + "','" + usu.email + "','" + usu.nombre_muni + "',false)", conn);
            command.ExecuteNonQuery();
            conn.Close();
            return true;
        }

        public bool cambiarAdminAgrupacion(Agrupacion grupo, Usuario usu, bool esAdmin)
        {

            NpgsqlConnection conn = iniciarConeccion();
            NpgsqlCommand command = new NpgsqlCommand("UPDATE agrupaciones_usuarios SET admin="+esAdmin.ToString()+" WHERE nombre_agrupacion='" + grupo.nombre + "' AND nombre_municipalidad_agrupacion='" + grupo.nombre_muni + "' AND usuario_email='" + usu.email + "' AND nombre_municipalidad_usuario='" + usu.nombre_muni + "'", conn);
            command.ExecuteNonQuery();
            conn.Close();
            return true;
        }

        public bool borrarUsuarioAgrupacion(Agrupacion grupo, Usuario usu)
        {

            NpgsqlConnection conn = iniciarConeccion();
            NpgsqlCommand command = new NpgsqlCommand("DELETE FROM agrupaciones_usuarios WHERE nombre_agrupacion='" + grupo.nombre + "' AND nombre_municipalidad_agrupacion='" + grupo.nombre_muni + "' AND usuario_email='" + usu.email + "' AND nombre_municipalidad_usuario='" + usu.nombre_muni + "'", conn);
            command.ExecuteNonQuery();
            conn.Close();
            return true;
        }

        public bool borrarAgrupacion(Agrupacion grupo)
        {

            NpgsqlConnection conn = iniciarConeccion();
            NpgsqlCommand command = new NpgsqlCommand("DELETE FROM agrupaciones_usuarios WHERE nombre_agrupacion='" + grupo.nombre + "' AND nombre_municipalidad_agrupacion='" + grupo.nombre_muni + "'", conn);
            command.ExecuteNonQuery();
            NpgsqlCommand command2 = new NpgsqlCommand("DELETE FROM agrupaciones WHERE nombre='" + grupo.nombre + "' AND nombre_municipalidad='" + grupo.nombre_muni + "'", conn);
            command2.ExecuteNonQuery();
            conn.Close();
            return true;
        }


    }
}
