import { Component } from '@angular/core';
import { AgrupacionService } from './agrupacion.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'my-contact',
    templateUrl: '/partial/AgrupacionComponent',
    providers: [AgrupacionService]
})

export class AgrupacionComponent {

    public constructor(private agru: AgrupacionService) { }

    agrupacionAgregada: any;

    public addAgrupacion1() {
        this.agru.addAgrupacion("gmail", "Mdeo", "TSI.NEt", "Mdeo", true).subscribe(
            (data: Response) => this.agrupacionAgregada = data,
            responseError => console.log(responseError),
            () => console.log("ok")
        );
    }
}