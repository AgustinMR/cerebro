//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class MUNICIPALIDADES
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MUNICIPALIDADES()
        {
            this.AGRUPACIONES = new HashSet<AGRUPACIONES>();
            this.EVENTOS = new HashSet<EVENTOS>();
            this.FUENTES_DE_DATOS = new HashSet<FUENTES_DE_DATOS>();
            this.TIPOS_DE_FUENTES_DE_DATOS = new HashSet<TIPOS_DE_FUENTES_DE_DATOS>();
            this.USUARIOS = new HashSet<USUARIOS>();
        }
    
        public string nombre { get; set; }
        public string ubicacion { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AGRUPACIONES> AGRUPACIONES { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EVENTOS> EVENTOS { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FUENTES_DE_DATOS> FUENTES_DE_DATOS { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TIPOS_DE_FUENTES_DE_DATOS> TIPOS_DE_FUENTES_DE_DATOS { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<USUARIOS> USUARIOS { get; set; }
    }
}
