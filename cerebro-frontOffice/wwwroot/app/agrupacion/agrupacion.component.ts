import { Component, OnInit } from '@angular/core';
import { AgrupacionService } from './agrupacion.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'frontOffice-agrupacion',
    templateUrl: 'agrupacion.component.html',
    styleUrls: ['agrupacion.component.css'],
    moduleId: module.id,
    providers: [AgrupacionService]
})
export class AgrupacionComponent implements OnInit {

    employees: any;

    constructor(private service: AgrupacionService) {
    }

    ngOnInit(): void {
        //this.getEmployees();
    }
}
