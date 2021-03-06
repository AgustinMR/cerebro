﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using cerebro;
using cerebro_DataAccessLayer;
using System.Reflection;
using MongoDB.Bson;

namespace cerebro_BusinessLogicLayer
{
    public class BLUsuario : IBLUsuario
    {

        IDALUsuario dal = null;

        public BLUsuario()
        {
            dal = new DALUsuario();
        }

        public bool addUsuario(Usuario usu)
        {
            return dal.agregarUsuario(usu);
        }

        public bool deleteUsuario(Usuario usu)
        {
            return dal.borrarUsuario(usu);
        }

        public bool updateUsuario(Usuario usu)
        {
            return dal.modificarUsuario(usu);
        }

        public bool loginUsuario(Usuario usu)
        {
            return dal.loginUsuario(usu);
        }

        public Usuario obtenerUsuario(string email, string muni)
        {
            return dal.obtenerUsuario(email, muni);
        }

        public List<Usuario> obtenerUsuarios()
        {
            return dal.obtenerUsuarios();
        }

        public List<Usuario> obtenerUsuarios(string municipalidad)
        {
            return dal.obtenerUsuarios(municipalidad);
        }

        public bool toggleUsuarioEnabled(string email, string muni, bool enabled)
        {
            return dal.toggleUsuarioEnabled(email, muni, enabled);
        }

        public bool setPrivilegioUsuario(string email, string muni, string privilegio)
        {
            return dal.setPrivilegioUsuario(email, muni, privilegio);
        }

        public List<Privilegio> getPrivilegios(string municipalidad)
        {
            return dal.getPrivilegios(municipalidad);
        }

        public List<PrivilegiosUsuarios> getPrivilegiosUsuarios(string email, string muni)
        {
            return dal.getPrivilegiosUsuarios(email, muni);
        }

        public bool deletePrivilegioUsuario(string email, string muni, string privilegio) {
            return dal.deletePrivilegioUsuario(email,muni,privilegio);
        }

        public bool addZona(Zonas z) {
            return dal.addZona(z);
        }

        public List<Zonas> getZonas(string email, string muni)
        {
            return dal.getZonas(email, muni);
        }

        public bool agregarPrivilegio(string privilegio, string municipalidad)
        {
            return dal.agregarPrivilegio(privilegio, municipalidad);
        }

        public bool deleteZona(ObjectId id) {
            return dal.deleteZona(id);
        }
    }
}
