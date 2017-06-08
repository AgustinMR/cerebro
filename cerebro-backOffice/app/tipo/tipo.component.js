"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var tipo_service_1 = require("./tipo.service");
require("rxjs/add/operator/toPromise");
var TipoDeFuenteDeDatoComponent = (function () {
    function TipoDeFuenteDeDatoComponent(tipos) {
        this.tipos = tipos;
        this.nombre_municipalidad = "";
        this.tipoSeleccionado = "";
        this.nombre = "";
        this.tipoDeDato = "";
        this.endpointWS = "";
        this.frecLectura = "";
        this.nombreMod = "";
        this.tipoDeDatoMod = "";
        this.endpointWSMod = "";
        this.frecLecturaMod = "";
    }
    TipoDeFuenteDeDatoComponent.prototype.ngOnInit = function () {
        $(document).ready(function () {
            $('.ui.sidebar').sidebar('attach events', '.toc.item');
            $('.ui.dropdown').dropdown();
        });
        var muniL = window.location.toString().split("/")[2].split(".")[1].split("");
        this.nombre_municipalidad = muniL[0].toUpperCase();
        for (var h = 1; h < muniL.length; h++) {
            this.nombre_municipalidad += muniL[h];
        }
        this.getTipos();
    };
    TipoDeFuenteDeDatoComponent.prototype.agregarTipoDeFuenteDeDato = function () {
        var _this = this;
        this.mostrarMensajeLoading();
        this.tipos.agregarTipo(this.nombre, this.tipoDeDato, this.endpointWS, this.frecLectura, this.nombre_municipalidad).subscribe(function (data) { _this.repuesta = data; _this.mostrarMensajeExito(); }, function (responseError) { console.log("Error: " + responseError); _this.mostrarMensajeError(); }, function () { return console.log(_this.repuesta); });
        this.nombre = "";
        this.tipoDeDato = "";
        this.endpointWS = "";
        this.frecLectura = "";
        this.getTipos();
    };
    TipoDeFuenteDeDatoComponent.prototype.modificarTipoDeFuenteDeDato = function () {
        var _this = this;
        if (this.nombreMod != "") {
            this.tipos.modificarTipo(this.nombreMod, this.tipoDeDatoMod, this.endpointWSMod, this.frecLecturaMod, this.nombre_municipalidad).subscribe(function (data) { _this.repuesta = data; _this.mostrarMensajeTipoModificado(); }, function (responseError) { console.log("Error: " + responseError); _this.mostrarMensajeError(); }, function () { return console.log(_this.repuesta); });
            this.nombreMod = "";
            this.tipoDeDatoMod = "";
            this.endpointWSMod = "";
            this.frecLecturaMod = "";
        }
        else {
            console.log("datos incorrectos");
        }
    };
    TipoDeFuenteDeDatoComponent.prototype.getTipos = function () {
        var _this = this;
        this.tipos.obtenerTipos(this.nombre_municipalidad).subscribe(function (data) {
            _this.tipoMod = data;
        }, function (responseError) { return console.log(responseError); }, function () { return console.log("Tipos de fuentes de datos cargadas"); });
    };
    TipoDeFuenteDeDatoComponent.prototype.onChange = function (deviceValue) {
        if (deviceValue != 0) {
            for (var i = 0; i < this.tipoMod.length; i++) {
                if (this.tipoMod[i].Id == deviceValue) {
                    this.endpointWSMod = this.tipoMod[i].uriWebService;
                    this.frecLecturaMod = this.tipoMod[i].frecuenciaLectura;
                    this.nombreMod = this.tipoMod[i].nombre;
                    this.tipoSeleccionado = this.tipoMod[i].Id;
                }
            }
        }
        else {
            this.nombreMod = "";
            this.tipoDeDatoMod = "";
            this.endpointWSMod = "";
            this.frecLecturaMod = "";
        }
    };
    TipoDeFuenteDeDatoComponent.prototype.deleteTipo = function () {
        var _this = this;
        if (this.tipoSeleccionado !== "") {
            this.mostrarMensajeLoading();
            this.tipos.deleteTipo(this.tipoSeleccionado).subscribe(function (data) { _this.mostrarMensajeTipoQuitado(); _this.getTipos(); console.log(data); }, function (responseError) { console.log(responseError); _this.mostrarMensajeError(); }, function () { return console.log("Tipo de fuente de datos eliminado"); });
        }
    };
    TipoDeFuenteDeDatoComponent.prototype.mostrarMensajeExito = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "block";
        document.getElementById("error").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("tipoEliminado").style.display = "none";
        document.getElementById("tipoModificado").style.display = "none";
    };
    TipoDeFuenteDeDatoComponent.prototype.mostrarMensajeError = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "block";
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("tipoEliminado").style.display = "none";
        document.getElementById("tipoModificado").style.display = "none";
    };
    TipoDeFuenteDeDatoComponent.prototype.mostrarMensajeLoading = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "block";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("tipoEliminado").style.display = "none";
        document.getElementById("tipoModificado").style.display = "none";
    };
    TipoDeFuenteDeDatoComponent.prototype.mostrarMensajeConfirmacion = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("confirmation").style.display = "block";
        document.getElementById("tipoEliminado").style.display = "none";
        document.getElementById("tipoModificado").style.display = "none";
    };
    TipoDeFuenteDeDatoComponent.prototype.mostrarMensajeTipoQuitado = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("tipoEliminado").style.display = "block";
        document.getElementById("tipoModificado").style.display = "none";
    };
    TipoDeFuenteDeDatoComponent.prototype.mostrarMensajeTipoModificado = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("tipoEliminado").style.display = "none";
        document.getElementById("tipoModificado").style.display = "block";
    };
    TipoDeFuenteDeDatoComponent.prototype.ocultarMensajes = function () {
        document.getElementById("message").style.display = "none";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("tipoEliminado").style.display = "none";
        document.getElementById("tipoModificado").style.display = "none";
    };
    return TipoDeFuenteDeDatoComponent;
}());
TipoDeFuenteDeDatoComponent = __decorate([
    core_1.Component({
        selector: 'cerebro-tipo-de-fuente-de-dato',
        templateUrl: 'tipo.component.html',
        styleUrls: ['tipo.component.css'],
        moduleId: module.id,
        providers: [tipo_service_1.TipoDeFuenteDeDatoService]
    }),
    __metadata("design:paramtypes", [tipo_service_1.TipoDeFuenteDeDatoService])
], TipoDeFuenteDeDatoComponent);
exports.TipoDeFuenteDeDatoComponent = TipoDeFuenteDeDatoComponent;
//# sourceMappingURL=tipo.component.js.map