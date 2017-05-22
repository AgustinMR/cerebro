import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChatService {

    constructor(private http: Http) { }

    enviarMensaje(mensaje: string, agrupacion: string, autor: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var postInfo = "agrupacion=" + agrupacion + "&autor=" + autor + "&mensaje=" + mensaje;
        return this.http.post("https://localhost:44332/api/chats?agrupacion=" + agrupacion + "&autor=" + autor + "&mensaje=" + mensaje, {}, options).map(data => data.json());
    }
}