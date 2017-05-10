import { Component, OnInit } from '@angular/core';
import { ReporteService } from './reporte.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'cerebro-reporte',
    templateUrl: 'reporte.component.html',
    styleUrls: ['reporte.component.css'],
    moduleId: module.id,
    providers: [ReporteService]
})
export class ReporteComponent implements OnInit {

    employees: any;

    constructor(private reporteService: ReporteService) {
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
