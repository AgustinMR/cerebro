import { Component } from '@angular/core';
//import { EmployeeTaskService, ConnectionState, ChannelEvent } from "./employee/employee.task.service";
import { Observable } from "rxjs/Observable";
import { Http, HttpModule, Response } from '@angular/http';
import { FuenteDeDatoService } from './dispositivo/dispositivo.service'
import { EstadisticaService } from './estadistica/estadistica.service'
import { EventoService } from './evento/evento.service'
import { TipoDeFuenteDeDatoService } from './tipo/tipo.service'
import { UsuarioService } from './usuario/usuario.service'

@Component({
    selector: 'tsi1-cerebro-gr17',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    moduleId: module.id,
    //providers: [EmployeeTaskService]
    providers: [FuenteDeDatoService, EstadisticaService, EventoService, TipoDeFuenteDeDatoService, UsuarioService]
})
export class AppComponent {

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
