import { Component, OnInit } from '@angular/core';
import { VisitanteService } from './visitante.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'cerebro-visitante',
    templateUrl: 'visitante.component.html',
    styleUrls: ['visitante.component.css'],
    moduleId: module.id,
    providers: [VisitanteService]
})
export class VisitanteComponent implements OnInit {

    constructor(private visitanteService: VisitanteService) {
    }

    ngOnInit(): void {
        //this.getEmployees();
    }

}
