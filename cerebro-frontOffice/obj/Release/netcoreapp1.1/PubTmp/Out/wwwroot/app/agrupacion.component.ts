import { Component, OnInit } from '@angular/core';
import { AgrupacionService } from './agrupacion.service';
import { ChatService } from './chat.service';
import { UsuarioService } from './usuario.service';
import { Http, HttpModule, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'cerebro-agrupacion-component',
    templateUrl: '/partial/AgrupacionComponent',
    providers: [AgrupacionService]
})

export class AgrupacionComponent implements OnInit {

    agrupacionAgregada: any;
    nombreAgrupacionNueva = "";
    email = "agustinmr1995@gmail.com";
    municipalidad = "Florida";
    agrupacionActual = "";
    usuarioAeliminar = "";

    constructor(private service: AgrupacionService, private usuarios: UsuarioService) { }

    ngOnInit() {
        this.getAgrupacionesByUsuario();
        this.getUsuariosByMunicipalidad(this.municipalidad);
    }

    public getAgrupacionesByUsuario() {
        this.service.getAgrupacionesByUsuario(this.email).subscribe(
            (data: Response) => {
<<<<<<< HEAD
<<<<<<< HEAD
                while (document.getElementById("agrupaciones").hasChildNodes()) {
                    document.getElementById("agrupaciones").removeChild(document.getElementById("agrupaciones").lastChild);
                }
                for (var u in data) {
                    var option = document.createElement("option");
                    option.value = data[u];
                    option.innerHTML = data[u];
                    document.getElementById("agrupaciones").appendChild(option);
                }
                var option2 = document.createElement("option");
                option2.value = "";
                option2.selected = true;
                option2.disabled = true;
                option2.innerHTML = "Seleccione una agrupacion...";
                document.getElementById("agrupaciones").appendChild(option2);
            },
            responseError => { console.log(responseError); },
            () => console.log("getUsuariosByMunicipalidad request finished")
        );
    }

    public seleccionarAgrupacion(agrupacion: string) {
        this.getUsuariosByMunicipalidad(this.municipalidad);

    }

    public getUsuariosByMunicipalidad(municipalidad: string) {
        this.usuarios.getUsuariosByMunicipalidad(municipalidad).subscribe(
            (data: Response) => {
=======
>>>>>>> refs/remotes/origin/Bruno
=======
>>>>>>> refs/remotes/origin/master
                while (document.getElementById("usuariosAgregar").hasChildNodes()) {
                    document.getElementById("usuariosAgregar").removeChild(document.getElementById("usuariosAgregar").lastChild);
                }
                var x = JSON.parse(JSON.stringify(data));
                for (var u in x) {
                    var option = document.createElement("option");
                    option.value = x[u].email;
                    option.innerHTML = x[u].nombre + " - " + x[u].email;
                    document.getElementById("usuariosAgregar").appendChild(option);
                }
                var option2 = document.createElement("option");
                option2.value = "";
                option2.selected = true;
                option2.disabled = true;
                option2.innerHTML = "Seleccione un usuario para agregar...";
                document.getElementById("usuariosAgregar").appendChild(option2);
            },
            responseError => { console.log(responseError); },
            () => console.log("getUsuariosByMunicipalidad request finished")
        );
    }

    public getUsuariosByAgrupacion(agrupacion: string) {
        this.service.getUsuariosAgrupacion(agrupacion).subscribe(
            (data: Response) => {
                while (document.getElementById("usuariosActualesBody").hasChildNodes()) {
                    document.getElementById("usuariosActualesBody").removeChild(document.getElementById("usuariosActualesBody").lastChild);
                }
                var x = JSON.parse(JSON.stringify(data));
                for (var u in x) {
                    var tr = document.createElement("tr");
                    var td = document.createElement("td");
                    td.className = "collapsing";
                    var div = document.createElement("div");
                    div.className = "ui fitted slider checkbox";
                    var input = document.createElement("input");
                    input.type = "checkbox";
                    input.onchange = () => { this.toggleAdminAgrupacion(input.checked); };
                    var label = document.createElement("label");
                    if (x[u].admin === true) {
                        input.checked = true;
                    }
                    div.appendChild(input);
                    div.appendChild(label);
                    td.appendChild(div);
                    var td2 = document.createElement("td");
                    td2.innerHTML = x[u].usuario_email;
                    var td3 = document.createElement("td");
                    td3.className = "w3-center";
                    var img = document.createElement("img");
                    img.src = "../images/rubbish-bin.svg";
                    img.style.height = "37px";
                    img.className = "w3-button w3-hover-none";
                    img.onclick = () => { this.usuarioAeliminar = x[u].usuario_email; this.mostrarMensajeConfirmacion(); };
                    td3.appendChild(img);
                    tr.appendChild(td);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    document.getElementById("usuariosActualesBody").appendChild(tr);
                }
            },
            responseError => { console.log(responseError); },
            () => console.log("getUsuariosByAgrupacion request finished")
        );
    }

    public addAgrupacion() {
        this.mostrarMensajeLoading();
        this.service.addAgrupacion(this.email, this.municipalidad, this.nombreAgrupacionNueva).subscribe(
            (data: Response) => { this.mostrarMensajeExito(); console.log(data.json); },
            responseError => { this.mostrarMensajeError(); console.log(responseError); },
            () => console.log("addAgrupacion request finished")
        );
    }

    public deleteAgrupacion() {
        this.mostrarMensajeLoading();
        this.service.deleteAgrupacion(this.nombreAgrupacionNueva, this.municipalidad).subscribe(
            (data: Response) => { this.mostrarMensajeExito(); console.log(data.json); },
            responseError => { this.mostrarMensajeError(); console.log(responseError); },
            () => console.log("deleteAgrupacion request finished")
        );
    }

    //public addUsuarioAgrupacion(email: string) {
    //    this.mostrarMensajeLoading();
    //    this.service.addUsuarioAgrupacion(email, this.municipalidad, this.agrupacion).subscribe(
    //        (data: Response) => { this.mostrarMensajeExito(); console.log(data.json); },
    //        responseError => { this.mostrarMensajeError(); console.log(responseError); },
    //        () => console.log("deleteAgrupacion request finished")
    //    );
    //}

    public toggleAdminAgrupacion(esAdmin: boolean) {
        this.service.toggleAdminAgrupacion(this.email, this.municipalidad, this.agrupacionActual, esAdmin).subscribe(
            (data: Response) => { console.log(data); },
            responseError => { console.log(responseError); },
            () => console.log("toggleAdminAgrupacion request finished")
        );
    }

    public deleteUsuarioAgrupacion() {
        this.mostrarMensajeLoading();
<<<<<<< HEAD
        this.service.deleteUsuarioAgrupacion(this.usuarioAeliminar, this.municipalidad, this.agrupacionActual).subscribe(
            (data: Response) => { this.mostrarMensajeUsuarioQuitado(); console.log(data); },
=======
        this.service.addAgrupacion(this.email, this.municipalidad, this.nombreAgrupacionNueva).subscribe(
            (data: Response) => { console.log(data.json); },
<<<<<<< HEAD
>>>>>>> refs/remotes/origin/Bruno
=======
>>>>>>> refs/remotes/origin/master
            responseError => { console.log(responseError); },
            () => console.log("toggleAdminAgrupacion request finished")
        );
    }

    mostrarMensajeExito() {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "block";
        document.getElementById("error").style.display = "none";
        this.nombreAgrupacionNueva = "";
        document.getElementById("usuarioQuitado").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
    }

    mostrarMensajeError() {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "block";
        document.getElementById("usuarioQuitado").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
    }

    mostrarMensajeLoading() {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "block";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("usuarioQuitado").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
    }

    mostrarMensajeConfirmacion() {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("usuarioQuitado").style.display = "none";
        document.getElementById("confirmation").style.display = "block";
    }

    mostrarMensajeUsuarioQuitado() {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("usuarioQuitado").style.display = "block";
        document.getElementById("confirmation").style.display = "none";
    }

    ocultarMensajes() {
        document.getElementById("message").style.display = "none";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("usuarioQuitado").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
    }
}