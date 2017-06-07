import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service'; 
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var $: any;

@Component({
    selector: 'cerebro-backoffice-inicio',
    templateUrl: 'inicio.component.html',
    styleUrls: ['inicio.component.css'],
    moduleId: module.id,
    providers: [LoginService]
})
export class InicioComponent implements OnInit {
     
    nombre_municipalidad: any = "";
    dispositivo = false;
    evento = false;
    tipo = false;
    usuario = false;
    estadistica = true;
    autenticado: any;
    login = true;
    inicio = false;

    showEstadistica() {
        this.dispositivo = false;
        this.evento = false;
        this.tipo = false;
        this.usuario = false;
        this.estadistica = true;
    }

    showDispositivo() {
        this.dispositivo = true;
        this.evento = false;
        this.tipo = false;
        this.usuario = false;
        this.estadistica = false;
    }

    showEvento() {
        this.dispositivo = false;
        this.evento = true;
        this.tipo = false;
        this.usuario = false;
        this.estadistica = false;
    }

    showTipo() {
        this.dispositivo = false;
        this.evento = false;
        this.tipo = true;
        this.usuario = false;
        this.estadistica = false;
    }

    showUsuario() {
        this.dispositivo = false;
        this.evento = false;
        this.tipo = false;
        this.usuario = true;
        this.estadistica = false;
    }

    constructor(private http: Http, private loginService: LoginService) { }

    ngOnInit() {
        $(document).ready(function () {
            $('.ui.sidebar').sidebar('attach events', '.toc.item');
            $('.ui.dropdown').dropdown();
        });

        var muniL = window.location.toString().split("/")[2].split(".")[1].split("");
        this.nombre_municipalidad = muniL[0].toUpperCase();
        for (var h = 1; h < muniL.length; h++) {
            this.nombre_municipalidad += muniL[h];
        }
    }

    ingresar() {
        this.loginService.loginAdmin("admin", this.nombre_municipalidad, "hola").subscribe(
            (data: Response) => {
                this.autenticado = data;
                if (this.autenticado == true) {
                    this.login = false;
                    this.inicio = true;
                }
            },
            responseError => console.log("Error: " + responseError),
            () => console.log(this.autenticado)
        );
    }
}
