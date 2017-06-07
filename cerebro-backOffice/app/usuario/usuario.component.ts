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
    }

    getUsuario(email: string) {
        for (var x = 0; x < this.usuariosMunicipalidad.length; x++) {
            if (this.usuariosMunicipalidad[x].email == email) {
                document.getElementById("nombreAct").innerHTML = this.usuariosMunicipalidad[x].nombre;
                document.getElementById("emailAct").innerHTML = this.usuariosMunicipalidad[x].email;
                if (this.usuariosMunicipalidad[x].enabled === true) {
                    $('estadoActual').checkbox('check');
                }
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

}

