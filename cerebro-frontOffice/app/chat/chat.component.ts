import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'cerebro-chat',
    templateUrl: 'chat.component.html',
    styleUrls: ['chat.component.css'],
    moduleId: module.id,
    providers: [ChatService]
})
export class ChatComponent implements OnInit {

    employees: any;

    constructor(private dispositivos: ChatService) {
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
