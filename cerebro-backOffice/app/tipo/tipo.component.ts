import { Component, OnInit } from '@angular/core';
import { TipoDeFuenteDeDatoService } from './tipo.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'cerebro-tipo-de-fuente-de-dato',
    templateUrl: 'tipo.component.html',
    styleUrls: ['tipo.component.css'],
    moduleId: module.id,
    providers: [TipoDeFuenteDeDatoService]
})
export class TipoDeFuenteDeDatoComponent implements OnInit {

    constructor(private tipos: TipoDeFuenteDeDatoService) {
    }

    repuesta: any;
    tiposMod: any;
    tipoAeliminar = "";
    nombre_municipalidad: any = "Mdeo"

    ngOnInit(): void {
        this.getTipos();
    }

    nombre = "";
    tipoDeDato = "";
    endpointWS = "";
    frecLectura = "";

    agregarTipoDeFuenteDeDato() {
        this.tipos.agregarTipo(this.nombre, this.tipoDeDato, this.endpointWS, this.frecLectura, this.nombre_municipalidad).subscribe(
            (data: Response) => this.repuesta = data,
            responseError => console.log("Error: " + responseError),
            () => console.log(this.repuesta)
        );
        this.nombre = "";
        this.tipoDeDato = "";
        this.endpointWS = "";
        this.frecLectura = "";
        this.getTipos();
    }

    nombreMod = "";
    tipoDeDatoMod = "";
    endpointWSMod = "";
    frecLecturaMod = "";

    modificarTipoDeFuenteDeDato() {
        if (this.nombreMod != "") {
            this.tipos.modificarTipo(this.nombreMod, this.tipoDeDatoMod, this.endpointWSMod, this.frecLecturaMod, this.nombre_municipalidad).subscribe(
                (data: Response) => this.repuesta = data,
                responseError => console.log("Error: " + responseError),
                () => console.log(this.repuesta)
            );
            this.nombreMod = "Seleccione un tipo de fuente de datos";
            this.tipoDeDatoMod = "";
            this.endpointWSMod = "";
            this.frecLecturaMod = "";
        } else {
            console.log("datos incorrectos");
        }

    }

    getTipos() {
        this.tipos.obtenerTipos(this.nombre_municipalidad).subscribe(
            (data: Response) => {
                while (document.getElementById("nombre_mod").hasChildNodes()) {
                    document.getElementById("nombre_mod").removeChild(document.getElementById("nombre_mod").lastChild);
                }
                var option2 = document.createElement("option");
                option2.value = "";
                option2.selected = true;
                option2.disabled = true;
                option2.innerHTML = "Seleccione un tipo de fuente de datos...";
                document.getElementById("nombre_mod").appendChild(option2);
                this.tiposMod = data;
                for (var i = 0; i < this.tiposMod.length; i++) {
                    var option = document.createElement("option");
                    option.value = this.tiposMod[i].nombre;
                    option.innerHTML = this.tiposMod[i].nombre;
                    document.getElementById("nombre_mod").appendChild(option);
                }
                this.getTiposList();
            },
            responseError => console.log(responseError),
            () => console.log("Tipos de fuentes de datos cargadas")
        );
    }

    onChange(deviceValue: any) {
        if (deviceValue != 0) {
            for (var i = 0; i < this.tiposMod.length; i++) {
                if (this.tiposMod[i].nombre == deviceValue) {
                    var tipo;
                    if (this.tiposMod[i].tipo == 0) {
                        tipo = "TEXTO"
                    } else if (this.tiposMod[i].tipo == 1) {
                        tipo = "NUMERICO"
                    } if (this.tiposMod[i].tipo == 2) {
                        tipo = "IMAGEN"
                    }
                    if (this.tiposMod[i].tipo == 3) {
                        tipo = "VIDEO"
                    }
                    this.tipoDeDatoMod = tipo;
                    this.endpointWSMod = this.tiposMod[i].uriWebService;
                    this.frecLecturaMod = this.tiposMod[i].frecuenciaLectura;
                }
            }
        } else {
            this.nombreMod = "Seleccione un tipo de fuente de datos";
            this.tipoDeDatoMod = "";
            this.endpointWSMod = "";
            this.frecLecturaMod = "";
        }
    }

    getTiposList() {
        while (document.getElementById("tiposActuales").hasChildNodes()) {
            document.getElementById("tiposActuales").removeChild(document.getElementById("tiposActuales").lastChild);
        }
        for (var i = 0; i < this.tiposMod.length; i++) {
            var tipo;
            if (this.tiposMod[i].tipo == 0) {
                tipo = "TEXTO"
            } else if (this.tiposMod[i].tipo == 1) {
                tipo = "NUMERICO"
            } if (this.tiposMod[i].tipo == 2) {
                tipo = "IMAGEN"
            }
            if (this.tiposMod[i].tipo == 3) {
                tipo = "VIDEO"
            }
            this.tipoDeDatoMod = tipo;

            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.innerHTML = this.tiposMod[i].nombre;
            var td2 = document.createElement("td");
            td2.innerHTML = tipo;
            var td4 = document.createElement("td");
            td4.innerHTML = this.tiposMod[i].uriWebService;
            var td5 = document.createElement("td");
            td5.innerHTML = this.tiposMod[i].frecuenciaLectura;

            var td3 = document.createElement("td");
            td3.className = "w3-center";
            var img = document.createElement("img");
            img.src = "../../Content/rubbish-bin.svg";
            img.style.height = "37px";
            img.className = "w3-button w3-hover-none";
            img.onclick = () => { this.mostrarMensajeConfirmacion(); };
            td3.appendChild(img);
            tr.appendChild(td);
            tr.appendChild(td2);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td3);
            document.getElementById("tiposActuales").appendChild(tr);
        }
    }

    deleteTipo() {
        this.mostrarMensajeLoading();
        this.tipos.deleteTipo(this.tipoAeliminar).subscribe(
            (data: Response) => { this.mostrarMensajeUsuarioQuitado(); console.log(data); },
            responseError => { console.log(responseError); },
            () => console.log("Tipo de fuente de datos eliminado")
        );
    }

    mostrarMensajeExito() {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "block";
        document.getElementById("error").style.display = "none";
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
