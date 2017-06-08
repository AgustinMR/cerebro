using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace cerebro_frontOffice
{
    public partial class cerebroDBContext : DbContext
    {
        public virtual DbSet<Agrupaciones> Agrupaciones { get; set; }
        public virtual DbSet<AgrupacionesUsuarios> AgrupacionesUsuarios { get; set; }
        public virtual DbSet<Municipalidades> Municipalidades { get; set; }
        public virtual DbSet<Privilegios> Privilegios { get; set; }
        public virtual DbSet<PrivilegiosUsuarios> PrivilegiosUsuarios { get; set; }
        public virtual DbSet<Usuarios> Usuarios { get; set; }

        public cerebroDBContext(DbContextOptions<cerebroDBContext> options): base(options){ }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Agrupaciones>(entity =>
            {
                entity.HasKey(e => new { e.Nombre, e.NombreMunicipalidad })
                    .HasName("PK__AGRUPACI__FFDEAE6F18A39F7C");

                entity.ToTable("AGRUPACIONES");

                entity.Property(e => e.Nombre)
                    .HasColumnName("nombre")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.NombreMunicipalidad)
                    .HasColumnName("nombre_municipalidad")
                    .HasColumnType("varchar(30)");

                entity.HasOne(d => d.NombreMunicipalidadNavigation)
                    .WithMany(p => p.Agrupaciones)
                    .HasForeignKey(d => d.NombreMunicipalidad)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK__AGRUPACIO__nombr__2F10007B");
            });

            modelBuilder.Entity<AgrupacionesUsuarios>(entity =>
            {
                entity.HasKey(e => new { e.NombreAgrupacion, e.NombreMunicipalidadAgrupacion, e.UsuarioEmail, e.NombreMunicipalidadUsuario })
                    .HasName("PK__AGRUPACI__B68586D7BAFB486F");

                entity.ToTable("AGRUPACIONES_USUARIOS");

                entity.Property(e => e.NombreAgrupacion)
                    .HasColumnName("nombre_agrupacion")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.NombreMunicipalidadAgrupacion)
                    .HasColumnName("nombre_municipalidad_agrupacion")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.UsuarioEmail)
                    .HasColumnName("usuario_email")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.NombreMunicipalidadUsuario)
                    .HasColumnName("nombre_municipalidad_usuario")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.Admin).HasColumnName("admin");

                entity.HasOne(d => d.Nombre)
                    .WithMany(p => p.AgrupacionesUsuarios)
                    .HasForeignKey(d => new { d.NombreAgrupacion, d.NombreMunicipalidadAgrupacion })
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK__AGRUPACIONES_USU__31EC6D26");

                entity.HasOne(d => d.Usuarios)
                    .WithMany(p => p.AgrupacionesUsuarios)
                    .HasForeignKey(d => new { d.UsuarioEmail, d.NombreMunicipalidadUsuario })
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK__AGRUPACIONES_USU__32E0915F");
            });

            modelBuilder.Entity<Municipalidades>(entity =>
            {
                entity.HasKey(e => e.Nombre)
                    .HasName("PK__MUNICIPA__72AFBCC75B1C5C52");

                entity.ToTable("MUNICIPALIDADES");

                entity.Property(e => e.Nombre)
                    .HasColumnName("nombre")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.Ubicacion)
                    .IsRequired()
                    .HasColumnName("ubicacion")
                    .HasColumnType("varchar(255)");
            });

            modelBuilder.Entity<Privilegios>(entity =>
            {
                entity.HasKey(e => new { e.Nombre, e.NombreMunicipalidad })
                    .HasName("PK__PRIVILEG__FFDEAE6F6ADBC243");

                entity.ToTable("PRIVILEGIOS");

                entity.Property(e => e.Nombre)
                    .HasColumnName("nombre")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.NombreMunicipalidad)
                    .HasColumnName("nombre_municipalidad")
                    .HasColumnType("varchar(30)");

                entity.HasOne(d => d.NombreMunicipalidadNavigation)
                    .WithMany(p => p.Privilegios)
                    .HasForeignKey(d => d.NombreMunicipalidad)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK__PRIVILEGI__nombr__286302EC");
            });

            modelBuilder.Entity<PrivilegiosUsuarios>(entity =>
            {
                entity.HasKey(e => new { e.NombrePrivilegio, e.NombreMunicipalidadPrivilegio, e.UsuarioEmail, e.NombreMunicipalidadUsuario })
                    .HasName("PK__PRIVILEG__22E4092E7B3DFCBE");

                entity.ToTable("PRIVILEGIOS_USUARIOS");

                entity.Property(e => e.NombrePrivilegio)
                    .HasColumnName("nombre_privilegio")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.NombreMunicipalidadPrivilegio)
                    .HasColumnName("nombre_municipalidad_privilegio")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.UsuarioEmail)
                    .HasColumnName("usuario_email")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.NombreMunicipalidadUsuario)
                    .HasColumnName("nombre_municipalidad_usuario")
                    .HasColumnType("varchar(30)");

                entity.HasOne(d => d.Nombre)
                    .WithMany(p => p.PrivilegiosUsuarios)
                    .HasForeignKey(d => new { d.NombrePrivilegio, d.NombreMunicipalidadPrivilegio })
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK__PRIVILEGIOS_USUA__2B3F6F97");

                entity.HasOne(d => d.Usuarios)
                    .WithMany(p => p.PrivilegiosUsuarios)
                    .HasForeignKey(d => new { d.UsuarioEmail, d.NombreMunicipalidadUsuario })
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK__PRIVILEGIOS_USUA__2C3393D0");
            });

            modelBuilder.Entity<Usuarios>(entity =>
            {
                entity.HasKey(e => new { e.Email, e.NombreMunicipalidad })
                    .HasName("PK__USUARIOS__261F73CDC2F5C33A");

                entity.ToTable("USUARIOS");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.NombreMunicipalidad)
                    .HasColumnName("nombre_municipalidad")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.Enabled)
                    .HasColumnName("enabled")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.Nombre)
                    .HasColumnName("nombre")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.Password)
                    .HasColumnName("password")
                    .HasColumnType("varchar(30)");

                entity.Property(e => e.Tipo).HasColumnName("tipo");

                entity.HasOne(d => d.NombreMunicipalidadNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.NombreMunicipalidad)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK__USUARIOS__nombre__25869641");
            });
        }
    }
}