import { Component, OnInit } from '@angular/core';
import { EventoService } from './evento.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'cerebro-evento',
    templateUrl: 'evento.component.html',
    styleUrls: ['evento.component.css'],
    moduleId: module.id,
    providers: [EventoService]
})
export class EventoComponent implements OnInit {

    employees: any;

    constructor(private eventos: EventoService) {
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
