import { Component } from '@angular/core';
import { AgrupacionService } from './agrupacion.service';
import { ChatService, ConnectionState, ChannelEvent } from './chat.service';
import { Http, HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'my-contact',
    templateUrl: '/partial/AgrupacionComponent',
    providers: [AgrupacionService]
})

export class AgrupacionComponent {

    autor = "Agustin";
    agrupacion = "Mdeo";

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

    enviarMensaje(mensaje: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post("http://localhost:9123/tasks/chats?" + "autor=" + this.autor + "&mensaje=" + mensaje + "&agrupacion=" + this.agrupacion, {}, options)
            .map((res: Response) => res.json())
            .subscribe((message: string) => { console.log(message); });
    }

    suscribirseAgrupacion() {
        this.channelService.start();
        this.channelService.sub("Mdeo").map(response => {
        //this.channelService.sub(this.agrupacion).map(response => {
            if (response.name === "mensaje.nuevo") {
                var ele1 = document.createElement("div");
                ele1.className = 'w3-row';
                ele1.setAttribute("style", "margin-bottom: 7px");
                document.getElementById("chat").appendChild(ele1);
                var ele2 = document.createElement("div");
                ele2.className = 'w3-third w3-white w3-round w3-card';
                ele1.appendChild(ele2);
                var ele3 = document.createElement("div");
                ele3.className = 'w3-row w3-small w3-margin-left';
                var span1 = document.createElement("span");
                span1.className = "w3-text-cerebro-red";
                span1.innerHTML = response.json["autor"];
                ele3.appendChild(span1);
                var span2 = document.createElement("span");
                span2.className = "w3-right w3-margin-right w3-text-grey";
                span2.innerHTML = response.datetime.getMinutes() + ":" + response.datetime.getSeconds();
                ele3.appendChild(span2);
                ele2.appendChild(ele3);
                var ele4 = document.createElement("div");
                ele4.style.marginBottom = '3px';
                ele4.className = 'w3-row w3-text-dark-gray w3-margin-left w3-margin-right';
                ele4.textContent = response.json["mensaje"];
                ele2.appendChild(ele4);
            }
        }).subscribe(response => console.log("incomming message at USUARIO_CONECTADO channel with Name:", response), error => console.log("Ha ocurrido un error: ", error), () => { });
    }

    ngOnInit() {
        // Start the connection up!
        //
        console.log("Starting the channel service");

        this.channelService.start();
        //this.channelService.sub(this.agrupacion).map(response => {
        this.channelService.sub("Mdeo").map(response => {
            if (response.name === "mensaje.nuevo") {
                alert(response.json);
                var ele1 = document.createElement("div");
                ele1.className = 'w3-row';
                ele1.setAttribute("style", "margin-bottom: 7px");
                document.getElementById("chat").appendChild(ele1);
                var ele2 = document.createElement("div");
                ele2.className = 'w3-third w3-white w3-round w3-card';
                ele1.appendChild(ele2);
                var ele3 = document.createElement("div");
                ele3.className = 'w3-row w3-small w3-margin-left';
                var span1 = document.createElement("span");
                span1.className = "w3-text-cerebro-red";
                span1.innerHTML = response.json["autor"];
                ele3.appendChild(span1);
                var span2 = document.createElement("span");
                span2.className = "w3-right w3-margin-right w3-text-grey";
                span2.innerHTML = response.datetime.getMinutes() + ":" + response.datetime.getSeconds();
                ele3.appendChild(span2);
                ele2.appendChild(ele3);
                var ele4 = document.createElement("div");
                ele4.style.marginBottom = '3px';
                ele4.className = 'w3-row w3-text-dark-gray w3-margin-left w3-margin-right';
                ele4.textContent = response.json["mensaje"];
                ele2.appendChild(ele4);
                document.getElementById("chat").appendChild(ele1);
            }
        }).subscribe(response => console.log("incomming message at USUARIO_CONECTADO channel with Name:", response), error => console.log("Ha ocurrido un error: ", error), () => { });
    }
}