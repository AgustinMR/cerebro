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
    municipalidad = "Florida";
    privilegioSelect = "";
    usuarioSelect = "";
    nombreActual = "";
    emailActual = "";
    estadoActual = "";

    constructor(private usuarios: UsuarioService) {
    }
    
    ngOnInit(): void {
        this.cargarUsuarios();
        $(document).ready(function () {
            $('.ui.sidebar').sidebar('attach events', '.toc.item');
            $('.ui.dropdown').dropdown();
            $('.ui.checkbox').checkbox();
        });
    }

    getUsuario(email: string) {
        for (var x = 0; x < this.usuariosMunicipalidad.length; x++){
            if (this.usuariosMunicipalidad[x].email == email) {
                this.nombreActual = this.usuariosMunicipalidad[x].nombre;
                this.emailActual = this.usuariosMunicipalidad[x].email;
                if (this.usuariosMunicipalidad[x].enabled === true) {
                    $('estadoActual').checkbox('check');
                }
            }
        }
    }

    cargarUsuarios() {
        this.usuarios.getUsuariosByMunicipalidad(this.municipalidad).subscribe(
            (data: Response) => {
                this.usuariosMunicipalidad = data;
                for (var usuario in data) {
                    var option = document.createElement("option");
                    option.value = data[usuario].email;
                    option.innerHTML = data[usuario].nombre;
                    document.getElementById("usuarioSelect").appendChild(option);
                }
            },
            responseError => console.log("Error al cargar usuarios - "+responseError),
            () => console.log("usuarios cargados")
        );
    }

}
