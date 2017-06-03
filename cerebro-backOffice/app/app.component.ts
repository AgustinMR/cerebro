import { Component } from '@angular/core';
//import { EmployeeTaskService, ConnectionState, ChannelEvent } from "./employee/employee.task.service";
import { Observable } from "rxjs/Observable";
import { Http, HttpModule, Response } from '@angular/http';
import { FuenteDeDatoService } from './dispositivo/dispositivo.service'
import { EstadisticaService } from './estadistica/estadistica.service'
import { EventoService } from './evento/evento.service'
import { TipoDeFuenteDeDatoService } from './tipo/tipo.service'
import { UsuarioService } from './usuario/usuario.service'
import { LoginService } from './inicio/login.service'

@Component({
    selector: 'tsi1-cerebro-gr17',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    moduleId: module.id,
    //providers: [EmployeeTaskService]
    providers: [FuenteDeDatoService, EstadisticaService, EventoService, TipoDeFuenteDeDatoService, UsuarioService, LoginService]
})
export class AppComponent {

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
