import { Component, OnInit } from '@angular/core';
import { InicioService } from './inicio.service';
import { LoginService } from './login.service'; 
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var $: any;

@Component({
    selector: 'cerebro-backoffice-inicio',
    templateUrl: 'inicio.component.html',
    styleUrls: ['inicio.component.css'],
    moduleId: module.id,
    providers: [InicioService, LoginService]
})
export class InicioComponent implements OnInit {

    dispositivo = false;
    evento = false;
    tipo = false;
    usuario = false;
    estadistica = true;
    autenticado: any;
    municipalidades: any;
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
        this.getMunicipalidades();
        $(document).ready(function () {
            $('.ui.sidebar').sidebar('attach events', '.toc.item');
            $('.ui.dropdown').dropdown();
        });
    }

    ingresar() {
        this.loginService.loginAdmin("admin", "Mdeo", "hola").subscribe(
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

    getMunicipalidades() {
        this.loginService.obtenerMunicipalidades().subscribe(
            (data: Response) => this.municipalidades = data,
            responseError => console.log(responseError),
            () => console.log("Municipalidades cargadas")
        );
    }
}
