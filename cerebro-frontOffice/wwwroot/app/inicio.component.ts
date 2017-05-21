import { OnInit, Input, Component } from "@angular/core";
import { Http, HttpModule, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ChatService, ChannelEvent, ConnectionState } from "./chat.service";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'my-contact',
    templateUrl: '/partial/InicioComponent'
})

export class InicioComponent {

    chat = false;
    agrupacion = false;
    evento = false;
    reporte = false;

    autor = "Agustin";
    agrupacionNombre = "Mdeo";

    agrupacionAgregada: any;

    connectionState$: Observable<string>;

    showChat() {
        this.chat = true;
        this.agrupacion = false;
        this.evento = false;
        this.reporte = false;
    }

    showAgrupacion() {
        this.chat = false;
        this.agrupacion = true;
        this.evento = false;
        this.reporte = false;
    }

    constructor(private channelService: ChatService, private http: Http) {

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

    enviarMensaje(mensaje: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post("http://localhost:9123/tasks/chats?" + "autor=" + this.autor + "&mensaje=" + mensaje + "&agrupacion=" + this.agrupacionNombre, {}, options)
            .map((res: Response) => res.json())
            .subscribe(response => (<HTMLInputElement>document.getElementById("mensaje")).value = "");
    }

    enviarMensajes() {

        console.log("hola");
    }

    suscribirseAgrupacion() {
        this.channelService.start();
        this.channelService.sub(this.agrupacionNombre).map(response => {
            if (response.name === "mensaje.nuevo") {
                var x = JSON.parse(response.json);
                var ele1 = document.createElement("div");
                ele1.className = 'w3-row';
                ele1.setAttribute("style", "margin-bottom: 7px");
                var ele2 = document.createElement("div");
                ele2.className = 'w3-third w3-white w3-round w3-card';
                ele1.appendChild(ele2);
                var ele3 = document.createElement("div");
                ele3.className = 'w3-row w3-small w3-margin-left';
                var span1 = document.createElement("span");
                span1.className = "w3-text-cerebro-red";
                span1.innerHTML = x.autor;
                ele3.appendChild(span1);
                var span2 = document.createElement("span");
                span2.className = "w3-right w3-margin-right w3-text-grey";
                var fecha = response.datetime.toString().split('T', 2);
                var fecha2 = fecha[1].split(".", 2);
                span2.innerHTML = fecha2[0];
                ele3.appendChild(span2);
                ele2.appendChild(ele3);
                var ele4 = document.createElement("div");
                ele4.style.marginBottom = '3px';
                ele4.className = 'w3-row w3-text-dark-gray w3-margin-left w3-margin-right';
                ele4.textContent = x.mensaje;
                ele2.appendChild(ele4);
                document.getElementById("chat").appendChild(ele1);
            }
        }).subscribe(response => console.log("incomming message at " + this.agrupacion + " channel with Name:", response), error => console.log("Ha ocurrido un error: ", error), () => { });
    }

    ngOnInit() {
        // Start the connection up!
        //
        console.log("Starting the channel service");

        this.channelService.start();
        this.channelService.sub(this.agrupacionNombre).map(response => {
            if (response.name === "mensaje.nuevo") {
                var x = JSON.parse(response.json);
                var ele1 = document.createElement("div");
                ele1.className = 'w3-row';
                ele1.setAttribute("style", "margin-bottom: 7px");
                var ele2 = document.createElement("div");
                ele2.className = 'w3-third w3-white w3-round w3-card';
                ele1.appendChild(ele2);
                var ele3 = document.createElement("div");
                ele3.className = 'w3-row w3-small w3-margin-left';
                var span1 = document.createElement("span");
                span1.className = "w3-text-cerebro-red";
                span1.innerHTML = x.autor;
                ele3.appendChild(span1);
                var span2 = document.createElement("span");
                span2.className = "w3-right w3-margin-right w3-text-grey";

                var fecha = response.datetime.toString().split('T', 2);
                var fecha2 = fecha[1].split(".", 2);
                span2.innerHTML = fecha2[0];

                ele3.appendChild(span2);
                ele2.appendChild(ele3);
                var ele4 = document.createElement("div");
                ele4.style.marginBottom = '3px';
                ele4.className = 'w3-row w3-text-dark-gray w3-margin-left w3-margin-right';
                ele4.textContent = x.mensaje;
                ele2.appendChild(ele4);
                document.getElementById("chat").appendChild(ele1);
            }
        }).subscribe(response => console.log("incomming message at " + this.agrupacion + " channel with Name:", response), error => console.log("Ha ocurrido un error: ", error), () => { });
    }
}