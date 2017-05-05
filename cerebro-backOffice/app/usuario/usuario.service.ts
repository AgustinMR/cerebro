import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsuarioService {

    constructor(private http: Http) { }

    
    //public addEmployee(Name: string, StartDate: string, Salary: string, HourlyRate: string, isFullTime: boolean) {
    //    let headers = new Headers({ 'Content-Type': 'application/json' });
    //    let options = new RequestOptions({ headers: headers });
    //    if (isFullTime) {
    //        return this.http.post("http://localhost:49222/api/employees/full?" + "Name=" + Name + "&StartDate=" + StartDate + "&Salary=" + Salary, {}, options).map(response => { });
    //    }
    //    else {
    //        return this.http.post("http://localhost:49222/api/employees/part?" + "Name=" + Name + "&StartDate=" + StartDate + "&HourlyRate=" + HourlyRate, {}, options).map(response => { });
    //    }
    //}

    //public editEmployee() {
    //    console.log('edit employee');
    //}

    //public getEmployees() {
    //    return this.http.get("http://localhost:49222/api/employees").map(data => data.json());
    //}
}
