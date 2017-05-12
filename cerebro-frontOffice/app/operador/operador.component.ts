import { Component, OnInit } from '@angular/core';
import { OperadorService } from './operador.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'cerebro-operador',
    templateUrl: 'operador.component.html',
    styleUrls: ['operador.component.css'],
    moduleId: module.id,
    providers: [OperadorService]
})
export class OperadorComponent implements OnInit {

    constructor(private operadorService: OperadorService) {
    }

    ngOnInit(): void {
        //this.getEmployees();
    }

}
