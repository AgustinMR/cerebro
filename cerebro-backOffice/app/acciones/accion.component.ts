﻿import { Component, OnInit } from '@angular/core';
import { AccionService } from './accion.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var ol: any;
declare var $: any;

@Component({
    selector: 'cerebro-accion-evento',
    templateUrl: 'accion.component.html',
    styleUrls: ['accion.component.css'],
    moduleId: module.id,
    providers: [AccionService]
})
export class AccionComponent implements OnInit {

    nombre = "";
    nombreMod = "";
    nombre_municipalidad: any = "";
    acciones: any;
    accionSelect = "";

    ngOnInit(): void {
        $(document).ready(function () {
            $('.ui.sidebar').sidebar('attach events', '.toc.item');
            $('.ui.dropdown').dropdown();
        });

        var muniL = window.location.toString().split("/")[2].split(".")[1].split("");
        this.nombre_municipalidad = muniL[0].toUpperCase();
        for (var h = 1; h < muniL.length; h++) {
            this.nombre_municipalidad += muniL[h];
        }
        this.getAcciones();
    }

    constructor(private service: AccionService) { }

    enviarDll() {
        var forms = document.getElementById("nuevo").getElementsByTagName('FORM');
        var _this = this;
        if (this.nombre != "" && forms[0][0].files.length != 0) {
            var form = new FormData($('form')[0]);
            form.append("nombre", this.nombre);
            form.append("muni", this.nombre_municipalidad);

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://www.cerebro-frontoffice.com/api/dispositivos/dll",
                "method": "POST",
                "headers": {
                    "cache-control": "no-cache"
                },
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": form
            }

            $.ajax(settings).done(function (response: any) {
                (<HTMLInputElement>document.getElementById("nombre")).value = "";
                forms[0][0].value = "";
                _this.getAcciones();
                _this.mostrarMensajeExito();
            });
        } else {
            console.log("error");
        }
    }

    getAcciones() {
        this.service.obtenerAcciones(this.nombre_municipalidad).subscribe(
            (data: Response) => {
                this.acciones = data;
            },
            responseError => console.log(responseError),
            () => { }
        );
    }

    onChange(val: any) {
        for (var a of this.acciones) {
            if (a.Id == val) {
                this.nombreMod = a.nombre;
            }
        }
    }

    delAcciones() {
        var _this = this;
        var forms = document.getElementById("modificar").getElementsByTagName('FORM');
        if (this.accionSelect != "") {
            var form = new FormData();
            form.append("id", this.accionSelect);

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://www.cerebro-frontoffice.com/api/dispositivos/dllDel",
                "method": "DELETE",
                "headers": {
                    "cache-control": "no-cache"
                },
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": form
            }

            $.ajax(settings).done(function (response: any) {
                (<HTMLInputElement>document.getElementById("nombreMod")).value = "";
                forms[0][0].value = "";
                _this.getAcciones();
                _this.mostrarMensajeAccionEliminada();
            });
        }
    }

    modAcciones() {
        var forms = document.getElementById("modificar").getElementsByTagName('FORM');
        if (this.nombreMod != "") {
            var _this = this;
            if (forms[0][0].files.length != 0) {
                var form = new FormData($('form')[1]);
                form.append("nombre", this.nombreMod);
                form.append("id", this.accionSelect);

                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://www.cerebro-frontoffice.com/api/dispositivos/dll",
                    "method": "PUT",
                    "headers": {
                        "cache-control": "no-cache"
                    },
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": form
                }
                $.ajax(settings).done(function (response: any) {
                    (<HTMLInputElement>document.getElementById("nombreMod")).value = "";
                    forms[0][0].value = "";
                    _this.getAcciones();
                    _this.mostrarMensajeAccionModificada();
                });
                this.getAcciones();
            } else {
                var form2 = new FormData();
                form2.append("nombre", this.nombreMod);
                form2.append("id", this.accionSelect);

                var settings2 = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://www.cerebro-frontoffice.com/api/dispositivos/dllMod",
                    "method": "PUT",
                    "headers": {
                        "cache-control": "no-cache"
                    },
                    "processData": false,
                    "contentType": false,
                    "mimeType": "multipart/form-data",
                    "data": form2
                }

                $.ajax(settings2).done(function (response: any) {
                    (<HTMLInputElement>document.getElementById("nombreMod")).value = "";
                    forms[0][0].value = "";
                    _this.getAcciones();
                });
                this.getAcciones();
            }
        }
    }

    mostrarMensajeExito() {
        document.getElementById("dimmer").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "block";
        document.getElementById("error").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "none";
        document.getElementById("dispositivoEliminado").style.display = "none";
        document.getElementById("warning").style.display = "none";
    }

    mostrarMensajeError() {
        document.getElementById("dimmer").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "block";
        document.getElementById("warning").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "none";
        document.getElementById("dispositivoEliminado").style.display = "none";
    }

    mostrarMensajeLoading() {
        document.getElementById("dimmer").style.display = "block";
        document.getElementById("loading").style.display = "block";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "none";
        document.getElementById("dispositivoEliminado").style.display = "none";
        document.getElementById("warning").style.display = "none";
    }

    mostrarMensajeWarning() {
        document.getElementById("dimmer").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "none";
        document.getElementById("dispositivoEliminado").style.display = "none";
        document.getElementById("warning").style.display = "block";
    }

    mostrarMensajeAccionModificada() {
        document.getElementById("dimmer").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "block";
        document.getElementById("dispositivoEliminado").style.display = "none";
        document.getElementById("warning").style.display = "none";
    }

    mostrarMensajeAccionEliminada() {
        document.getElementById("dimmer").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "none";
        document.getElementById("dispositivoEliminado").style.display = "block";
        document.getElementById("warning").style.display = "none";
    }

    ocultarMensajes() {
        document.getElementById("dimmer").style.display = "none";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "none";
        document.getElementById("dispositivoEliminado").style.display = "none";
        document.getElementById("warning").style.display = "none";
    }
}