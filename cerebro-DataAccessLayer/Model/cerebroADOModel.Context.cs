﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace cerebro_DataAccessLayer.Model
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class cerebroConnectionString : DbContext
    {
        public cerebroConnectionString()
            : base("name=cerebroConnectionString")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Agrupacion> AGRUPACIONES { get; set; }
        public virtual DbSet<Agrupacion_Usuario> AGRUPACIONES_USUARIOS { get; set; }
        public virtual DbSet<Municipalidad> MUNICIPALIDADES { get; set; }
        public virtual DbSet<Usuario> USUARIOS { get; set; }
        public virtual DbSet<Privilegio> PRIVILEGIOS { get; set; }
        public virtual DbSet<PrivilegiosUsuarios> PrivilegiosUsuariosSet { get; set; }
    }
}
