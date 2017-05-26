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
var agrupacion_service_1 = require("./agrupacion.service");
var usuario_service_1 = require("./usuario.service");
require("rxjs/add/operator/toPromise");
var AgrupacionComponent = (function () {
    function AgrupacionComponent(service, usuarios) {
        this.service = service;
        this.usuarios = usuarios;
        this.nombreAgrupacionNueva = "";
        this.email = "agustinmr1995@gmail.com";
        this.municipalidad = "Florida";
    }
    AgrupacionComponent.prototype.ngOnInit = function () {
        this.getUsuariosByMunicipalidad();
    };
    AgrupacionComponent.prototype.getUsuariosByMunicipalidad = function () {
        this.usuarios.getUsuariosByMunicipalidad(this.municipalidad).subscribe(function (data) {
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
        }, function (responseError) { console.log(responseError); }, function () { return console.log("getUsuariosByMunicipalidad request finished"); });
    };
    AgrupacionComponent.prototype.addAgrupacion = function () {
        var _this = this;
        this.mostrarMensajeLoading();
        this.service.addAgrupacion(this.email, this.municipalidad, this.nombreAgrupacionNueva).subscribe(function (data) { _this.mostrarMensajeExito(); console.log(data.json); }, function (responseError) { _this.mostrarMensajeError(); console.log(responseError); }, function () { return console.log("addAgrupacion request finished"); });
    };
    AgrupacionComponent.prototype.deleteAgrupacion = function () {
        var _this = this;
        this.mostrarMensajeLoading();
        this.service.deleteAgrupacion(this.nombreAgrupacionNueva, this.municipalidad).subscribe(function (data) { _this.mostrarMensajeExito(); console.log(data.json); }, function (responseError) { _this.mostrarMensajeError(); console.log(responseError); }, function () { return console.log("deleteAgrupacion request finished"); });
    };
    AgrupacionComponent.prototype.toggleAdminAgrupacion = function (esAdmin) {
        var _this = this;
        this.mostrarMensajeLoading();
        this.service.addAgrupacion(this.email, this.municipalidad, this.nombreAgrupacionNueva).subscribe(function (data) { _this.mostrarMensajeExito(); console.log(data.json); }, function (responseError) { _this.mostrarMensajeError(); console.log(responseError); }, function () { return console.log("toggleAdminAgrupacion request finished"); });
    };
    AgrupacionComponent.prototype.mostrarMensajeExito = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "block";
        document.getElementById("error").style.display = "none";
        this.nombreAgrupacionNueva = "";
    };
    AgrupacionComponent.prototype.mostrarMensajeError = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "block";
    };
    AgrupacionComponent.prototype.mostrarMensajeLoading = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "block";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
    };
    AgrupacionComponent.prototype.ocultarMensajes = function () {
        document.getElementById("message").style.display = "none";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
    };
    return AgrupacionComponent;
}());
AgrupacionComponent = __decorate([
    core_1.Component({
        selector: 'cerebro-agrupacion-component',
        templateUrl: '/partial/AgrupacionComponent',
        providers: [agrupacion_service_1.AgrupacionService]
    }),
    __metadata("design:paramtypes", [agrupacion_service_1.AgrupacionService, usuario_service_1.UsuarioService])
], AgrupacionComponent);
exports.AgrupacionComponent = AgrupacionComponent;
//# sourceMappingURL=agrupacion.component.js.map