import { Component } from '@angular/core';
import { AgrupacionService } from './agrupacion.service';
import { ChatService } from './chat.service';
import { Http, HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'cerebro-agrupacion-component',
    templateUrl: '/partial/AgrupacionComponent',
    providers: [AgrupacionService]
})

export class AgrupacionComponent {

    agrupacionAgregada: any;
    nombreAgrupacionNueva = "";
    email = "agustinmr1995@gmail.com";
    municipalidad = "Florida";

    constructor(private service: AgrupacionService) { }

    public addAgrupacion() {
        this.mostrarMensajeLoading();
        this.service.addAgrupacion(this.email, this.municipalidad, this.nombreAgrupacionNueva).subscribe(
            (data: Response) => { this.mostrarMensajeExito(); console.log(data.json()); },
            responseError => { this.mostrarMensajeError(); console.log(responseError); },
            () => console.log("addAgrupacion request finished")
        );
    }

    public deleteAgrupacion() {
        this.mostrarMensajeLoading();
        this.service.deleteAgrupacion(this.nombreAgrupacionNueva, this.municipalidad).subscribe(
            (data: Response) => { this.mostrarMensajeExito(); console.log(data.json()); },
            responseError => { this.mostrarMensajeError(); console.log(responseError); },
            () => console.log("deleteAgrupacion request finished")
        );
    }

    public toggleAdminAgrupacion(esAdmin: boolean) {
        this.mostrarMensajeLoading();
        this.service.addAgrupacion(this.email, this.municipalidad, this.nombreAgrupacionNueva).subscribe(
            (data: Response) => { this.mostrarMensajeExito(); console.log(data.json()); },
            responseError => { this.mostrarMensajeError(); console.log(responseError); },
            () => console.log("toggleAdminAgrupacion request finished")
        );
    }

    mostrarMensajeExito() {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "block";
        document.getElementById("error").style.display = "none";
    }

    mostrarMensajeError() {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "block";
    }

    mostrarMensajeLoading() {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "block";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
    }

    ocultarMensajes() {
        document.getElementById("message").style.display = "none";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
    }
}