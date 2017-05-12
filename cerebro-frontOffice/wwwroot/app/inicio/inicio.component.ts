import { Component, OnInit } from '@angular/core';
import { InicioService } from './inicio.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'frontOffice-inicio',
    templateUrl: 'inicio.component.html',
    styleUrls: ['inicio.component.css'],
    moduleId: module.id,
    providers: [InicioService]
})
export class InicioComponent implements OnInit {

    employees: any;

    constructor(private service: InicioService) {
    }

    ngOnInit(): void {
        //this.getEmployees();
    }

}
