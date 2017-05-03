using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cerebro;

namespace cerebro_DataAccessLayer
{
    public class DALMunicipalidad : IDALMunicipalidad
    {

        private NpgsqlConnection iniciarConeccion()
        {
            NpgsqlConnection conn = new NpgsqlConnection("Server=127.0.0.1;Port=5432;Database=cerebroDB;User Id=postgres;Password=postgres;");
            conn.Open();
            if (conn.State == System.Data.ConnectionState.Open)
                return conn;
            return null;
        }

        public bool agregarMunicipalidad(Municipalidad muni)
        {
            if (muni.nombre != null && muni.ubicacion !=null)
            {
                NpgsqlConnection conn = iniciarConeccion();
                NpgsqlCommand command = new NpgsqlCommand("INSERT INTO municipalidades (nombre, ubicacion) VALUES ('" + muni.nombre + "','" + muni.ubicacion + "')", conn);
                command.ExecuteNonQuery();
                conn.Close();
                return true;
            }
            return false;
        }

        public bool borrarMunicipalidad(Municipalidad muni)
        {
            if (muni.nombre != null)
            {
                NpgsqlConnection conn = iniciarConeccion();
                NpgsqlCommand command = new NpgsqlCommand("UPDATE municipalidades SET estado=false WHERE nombre='"+ muni.nombre +"'", conn);
                command.ExecuteNonQuery();
                conn.Close();
                return true;
            }
            return false;
        }

    }
}
