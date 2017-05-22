import { OnInit, Input, Component } from "@angular/core";
import { Http, HttpModule, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";

declare var Pusher: any;

@Component({
    selector: 'cerebro-chat-component',
    templateUrl: '/partial/ChatComponent'
})
export class ChatComponent implements OnInit {

    autor = "Agustin";
    agrupacion = "Mdeo";

    constructor(private http: Http) { }

    ngOnInit() {
        //var pusher = new Pusher('5b358aae693e596e8b06');

        var pusher = new Pusher('5b358aae693e596e8b06', { encrypted: true, cluster: "us2" });

        var channel = pusher.subscribe(this.agrupacion);
        channel.bind('mensaje-nuevo', function (data: any) {
            alert("Mensaje recibido --- " + JSON.stringify(data));
            var e = JSON.stringify(data);
            alert(e);
            var x = JSON.parse(e);
            alert(x.agrupacion);
            alert(x.datetime);
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
            //var fecha = response.datetime.toString().split('T', 2);
            //var fecha2 = fecha[1].split(".", 2);
            //span2.innerHTML = fecha2[0];
            span2.innerHTML = x.datetime;
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
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "autor=" + this.autor + "&mensaje=" + mensaje + "&agrupacion=" + this.agrupacion;
        return this.http.post("https://localhost:44332/api/chats?" + postInfo, {}, options).map(data => data.json());
    }

}