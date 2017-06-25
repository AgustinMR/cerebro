import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var $: any;

@Component({
    selector: 'cerebro-usuario',
    templateUrl: 'usuario.component.html',
    styleUrls: ['usuario.component.css'],
    moduleId: module.id,
    providers: [UsuarioService]
})
export class UsuarioComponent implements OnInit {

    usuariosMunicipalidad: any;
    nombre_municipalidad = "";
    privilegioSelect = "";
    usuarioSelect = "";
    estadoActual = "";
    privilegios: any;
    privilegiosUsuario: any;
    privilegioNuevo: any;
    privilegioCreado: any;

    constructor(private usuarios: UsuarioService) {
    }

    ngOnInit(): void {
        $(document).ready(function () {
            $('.ui.sidebar').sidebar('attach events', '.toc.item');
            $('.ui.dropdown').dropdown();
            $('.ui.checkbox').checkbox();
        });

        var muniL = window.location.toString().split("/")[2].split(".")[1].split("");
        this.nombre_municipalidad = muniL[0].toUpperCase();
        for (var h = 1; h < muniL.length; h++) {
            this.nombre_municipalidad += muniL[h];
        }

        this.cargarUsuarios();
        this.cargarPrivilegios();
    }

    guardarPrivilegio() {
        this.mostrarMensajeLoading();
        this.usuarios.crearPrivilegio(this.privilegioNuevo, this.nombre_municipalidad).subscribe(
            (data: Response) => {
                this.privilegioCreado = data;
                if (this.privilegioCreado == true) {
                    this.privilegioNuevo = "";
                    this.mostrarMensajeExitoPrivilegio();
                } else {
                    this.mostrarMensajeError();
                }
            },
            responseError => console.log(responseError),
            () => { }
        );
    }

    getUsuario(email: string) {
        for (var x = 0; x < this.usuariosMunicipalidad.length; x++) {
            if (this.usuariosMunicipalidad[x].email == email) {
                document.getElementById("nombreAct").innerHTML = this.usuariosMunicipalidad[x].nombre;
                document.getElementById("emailAct").innerHTML = this.usuariosMunicipalidad[x].email;
                if (this.usuariosMunicipalidad[x].enabled == true) {
                    $('#estadoActual').prop('checked', true);
                }
                this.usuarios.obtenerPrivilegiosUsu(this.usuariosMunicipalidad[x].email, this.nombre_municipalidad).subscribe(
                    (data: Response) => {
                        this.privilegiosUsuario = data;
                        $('#privilegiosSelect').dropdown('clear');
                        $('#privilegiosSelect').dropdown('refresh');
                        for (var pri of this.privilegiosUsuario) {
                            $('#privilegiosSelect').dropdown('set selected', pri.Privilegio_nombre);
                            $('#privilegiosSelect').dropdown('refresh');
                        }
                    },
                    responseError => console.log(responseError),
                    () => console.log("Privilegios usu cargados")
                );
            }
        }
    }

    cargarUsuarios() {
        this.usuarios.getUsuariosByMunicipalidad(this.nombre_municipalidad).subscribe(
            (data: Response) => {
                this.usuariosMunicipalidad = data;
                //console.log(this.nombre_municipalidad +" "+ this.usuariosMunicipalidad);
            },
            responseError => console.log("Error al cargar usuarios - " + responseError),
            () => console.log("usuarios cargados")
        );
    }

    cargarPrivilegios() {
        this.usuarios.obtenerPrivilegios(this.nombre_municipalidad).subscribe(
            (data: Response) => {
                this.privilegios = data;
            },
            responseError => console.log(responseError),
            () => console.log("Privilegios cargados")
        );
    }

    guardar() {
        this.mostrarMensajeLoading();
        var b = false;
        if ($('#estadoActual').is(':checked')) {
            b = true;
        }
        this.usuarios.toggleEnabled(this.usuarioSelect, this.nombre_municipalidad, b).subscribe(
            (data: Response) => { },
            responseError => console.log(responseError),
            () => { }
        );
        var e = $('#privilegiosSelect').dropdown("get value");
        var pirvTmp = this.privilegiosUsuario;
        for (var i = 0; i < (e.length -1); i++) {
            var c = true;
            for (var privUsu of this.privilegiosUsuario) {
                if (privUsu.Privilegio_nombre == e[i].split("'")[1]) {
                    pirvTmp.splice(e[i].split("'")[1], 1);
                    c = false;
                }
            }
            if (c) {
                this.usuarios.modificarPrivilegios(this.usuarioSelect, this.nombre_municipalidad, e[i].split("'")[1]).subscribe(
                    (data: Response) => { },
                    responseError => console.log(responseError),
                    () => { }
                );
            }
        }
        for (var privUsuBorrar of pirvTmp) {
            this.usuarios.eliminarPrivilegios(this.usuarioSelect, this.nombre_municipalidad, privUsuBorrar.Privilegio_nombre).subscribe(
                (data: Response) => { },
                responseError => console.log(responseError),
                () => { }
            );
        }
        this.mostrarMensajeExito();
    }

    mostrarMensajeExito() {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("exito").style.display = "block";
        document.getElementById("error").style.display = "none";
        document.getElementById("exitoPrivilegio").style.display = "none";
    }

    mostrarMensajeError() {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("exito").style.display = "none";
        document.getElementById("error").style.display = "block";
        document.getElementById("exitoPrivilegio").style.display = "none";
    }

    mostrarMensajeLoading() {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "block";
        document.getElementById("exito").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("exitoPrivilegio").style.display = "none";
    }

    mostrarMensajeExitoPrivilegio() {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("exito").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("exitoPrivilegio").style.display = "block";
    }

    ocultarMensajes() {
        document.getElementById("message").style.display = "none";
        document.getElementById("loading").style.display = "none";
        document.getElementById("exito").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("exitoPrivilegio").style.display = "none";
    }

}

