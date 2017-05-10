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

    employees: any;

    constructor(private visitanteService: VisitanteService) {
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
