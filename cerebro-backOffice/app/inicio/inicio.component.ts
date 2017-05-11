import { Component, OnInit } from '@angular/core';
import { InicioService } from './inicio.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'cerebro-backoffice-inicio',
    templateUrl: 'inicio.component.html',
    styleUrls: ['inicio.component.css'],
    moduleId: module.id,
    providers: [InicioService]
})
export class InicioComponent implements OnInit {

    dispositivo = false;
    evento = false;
    tipo = false;
    usuario = false;
    estadistica = true;

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

    constructor(private http: Http) { }

    ngOnInit() {
        // Start the connection up!
        //
        //console.log("Starting the channel service");

        //this.channelService.start();
        //this.channelService.sub("USUARIO_CONECTADO").map(response => {
        //    if (response.Name === "user.registred") {
        //        this.showNotification();
        //    }
        //}).subscribe(response => console.log("incomming message at USUARIO_CONECTADO channel with Name:", response), error => console.log("Ha ocurrido un error: ", error), () => { });
    }
}
