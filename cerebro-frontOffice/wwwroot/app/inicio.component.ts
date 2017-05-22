import { OnInit, Input, Component } from "@angular/core";
import { Http, HttpModule, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ChatService } from "./chat.service";
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

    agrupacionAgregada: any;

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

    constructor(private http: Http) { }

}