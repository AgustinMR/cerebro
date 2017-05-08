import { Component, OnInit } from '@angular/core';
import { EstadisticaService } from './estadistica.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'cerebro-estadistica',
    templateUrl: 'estadistica.component.html',
    styleUrls: ['estadistica.component.css'],
    moduleId: module.id,
    providers: [EstadisticaService]
})
export class EstadisticaComponent implements OnInit {

    employees: any;

    constructor(private estadisticas: EstadisticaService) {
    }

    ngOnInit(): void {
        //this.getEmployees();
    }
    /*
    getEmployees() {
        this.employeeService.getEmployees().subscribe(
            (data: Response) => this.employees = data,
            responseError => console.log(responseError),
            () => console.log("Employee Fetching operation completed")
        );
    }*/
}
