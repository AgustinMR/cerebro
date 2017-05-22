import { OnInit, Input, Component } from "@angular/core";
import { Http, HttpModule, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { ChatService } from "./chat.service";

declare var Pusher: any;

@Component({
    selector: 'cerebro-chat-component',
    templateUrl: '/partial/ChatComponent',
    providers: [ChatService]
})
export class ChatComponent implements OnInit {

    autor = "Agustin";
    agrupacion = "Mdeo";

    constructor(private http: Http, private service: ChatService) { }

    ngOnInit() {
        var pusher = new Pusher('5b358aae693e596e8b06', { encrypted: true, cluster: "us2" });
        var channel = pusher.subscribe(this.agrupacion);
        channel.bind('mensaje-nuevo', function (data: any) {
            alert("Mensaje recibido --- " + JSON.stringify(data));
            var e = JSON.stringify(data);
            var x = JSON.parse(e);
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
            var fecha = x.datetime.toString().split('T', 2);
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
        });

        alert(pusher.connection.state);
    }

    enviarMensaje(mensaje: string) {
        this.service.enviarMensaje(mensaje, this.agrupacion, this.autor).subscribe(
            (data: Response) => alert(data),
            responseError => console.log("Error" + responseError),
            () => console.log("finished")
        );
    }

}