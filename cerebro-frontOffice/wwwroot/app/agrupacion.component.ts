import { Component } from '@angular/core';
import { AgrupacionService } from './agrupacion.service';
import { ChatService, ConnectionState, ChannelEvent } from './chat.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'my-contact',
    templateUrl: '/partial/AgrupacionComponent',
    providers: [AgrupacionService]
})

export class AgrupacionComponent {

    autor: string;
    mensaje: string;
    agrupacion: string;

    agrupacionAgregada: any;

    connectionState$: Observable<string>;

    constructor( private channelService: ChatService, private http: Http, private agru: AgrupacionService ) {

        this.connectionState$ = this.channelService.connectionState$.map((state: ConnectionState) => { return ConnectionState[state]; });
        this.channelService.error$.subscribe(
            (error: any) => { console.warn(error); },
            (error: any) => { console.error("errors$ error", error); }
        );
        this.channelService.starting$.subscribe(
            () => { console.log("signalr service has been started"); },
            () => { console.warn("signalr service failed to start!"); }
        );
    }

    public addAgrupacion1() {
        this.agru.addAgrupacion("gmail", "Mdeo", "TSI.NEt", "Mdeo", true).subscribe(
            (data: Response) => this.agrupacionAgregada = data,
            responseError => console.log(responseError),
            () => console.log("ok")
        );
    }

    showNotification() {
        alert("algo me llego");
    }

    enviarMensaje() {
        this.http.get("http://localhost:9123/tasks/employees")
            .map((res: Response) => res.json())
            .subscribe((message: string) => { console.log(message); });
    }

    suscribirseAgrupacion() {
        this.channelService.start();
        this.channelService.sub(this.agrupacion).map(response => {
            if (response.name === "mensaje.nuevo") {
                this.showNotification();
            }
        }).subscribe(response => console.log("incomming message at USUARIO_CONECTADO channel with Name:", response), error => console.log("Ha ocurrido un error: ", error), () => { });
    }

    ngOnInit() {
        // Start the connection up!
        //
        console.log("Starting the channel service");

        this.channelService.start();
        this.channelService.sub(this.agrupacion).map(response => {
            if (response.name === "mensaje.nuevo") {
                this.showNotification();
            }
        }).subscribe(response => console.log("incomming message at USUARIO_CONECTADO channel with Name:", response), error => console.log("Ha ocurrido un error: ", error), () => { });
    }
}