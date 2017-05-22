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

    pusher: any;

    constructor(private http: Http) { }

    ngOnInit() {
        this.pusher = new Pusher('5b358aae693e596e8b06', { cluster: 'us2' });
    }

    suscribirseAgrupacion(agrupacion: string) {
        var channel = this.pusher.subscribe(agrupacion);
        channel.bind('mensaje.nuevo', function (data: any) {
            alert('An event was triggered with message: ' + data);
        });
    }

}