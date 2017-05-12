import { Component, OnInit } from '@angular/core';
import { IndexService } from './index.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'frontOffice-index',
    templateUrl: 'index.component.html',
    styleUrls: ['index.component.css'],
    moduleId: module.id,
    providers: [IndexService]
})
export class IndexComponent implements OnInit {

    employees: any;

    constructor(private service: IndexService) {
    }

    ngOnInit(): void {
        //this.getEmployees();
    }
}
