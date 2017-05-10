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

    employees: any;

    constructor(private operadorService: OperadorService) {
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
