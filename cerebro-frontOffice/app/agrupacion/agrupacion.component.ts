import { Component, OnInit } from '@angular/core';
import { AgrupacionService } from './agrupacion.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'cerebro-agrupacion',
    templateUrl: 'agrupacion.component.html',
    styleUrls: ['agrupacion.component.css'],
    moduleId: module.id,
    providers: [AgrupacionService]
})
export class AgrupacionComponent implements OnInit {

    employees: any;

    constructor(private dispositivos: AgrupacionService) {
    }

    ngOnInit(): void {
        //this.getEmployees();
    }

    //getEmployees() {
    //    this.employeeService.getEmployees().subscribe(
    //        (data: Response) => this.employees = data,
    //        responseError => console.log(responseError),
    //        () => console.log("Employee Fetching operation completed")
    //    );
    //}
}
