import { Component } from '@angular/core';
import { AgrupacionService } from './agrupacion.service';
import { ChatService } from './chat.service';
import { Http, HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'cerebro-agrupacion-component',
    templateUrl: '/partial/AgrupacionComponent',
    providers: [AgrupacionService]
})

export class AgrupacionComponent {

    agrupacionAgregada: any;


    constructor(private agru: AgrupacionService ) { }

    public addAgrupacion1() {
        this.agru.addAgrupacion("gmail", "Mdeo", "TSI.NEt", "Mdeo", true).subscribe(
            (data: Response) => this.agrupacionAgregada = data,
            responseError => console.log(responseError),
            () => console.log("ok")
        );
    }
}