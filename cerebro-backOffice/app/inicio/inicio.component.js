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
var inicio_service_1 = require("./inicio.service");
var login_service_1 = require("./login.service");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var InicioComponent = (function () {
    function InicioComponent(http, loginService) {
        this.http = http;
        this.loginService = loginService;
        this.dispositivo = false;
        this.evento = false;
        this.tipo = false;
        this.usuario = false;
        this.estadistica = true;
        this.login = true;
        this.inicio = false;
    }
    InicioComponent.prototype.showEstadistica = function () {
        this.dispositivo = false;
        this.evento = false;
        this.tipo = false;
        this.usuario = false;
        this.estadistica = true;
    };
    InicioComponent.prototype.showDispositivo = function () {
        this.dispositivo = true;
        this.evento = false;
        this.tipo = false;
        this.usuario = false;
        this.estadistica = false;
    };
    InicioComponent.prototype.showEvento = function () {
        this.dispositivo = false;
        this.evento = true;
        this.tipo = false;
        this.usuario = false;
        this.estadistica = false;
    };
    InicioComponent.prototype.showTipo = function () {
        this.dispositivo = false;
        this.evento = false;
        this.tipo = true;
        this.usuario = false;
        this.estadistica = false;
    };
    InicioComponent.prototype.showUsuario = function () {
        this.dispositivo = false;
        this.evento = false;
        this.tipo = false;
        this.usuario = true;
        this.estadistica = false;
    };
    InicioComponent.prototype.ngOnInit = function () {
        this.getMunicipalidades();
        $(document).ready(function () {
            $('.ui.sidebar').sidebar('attach events', '.toc.item');
            $('.ui.dropdown').dropdown();
        });
    };
    InicioComponent.prototype.ingresar = function () {
        var _this = this;
        this.loginService.loginAdmin("admin", "Mdeo", "hola").subscribe(function (data) {
            _this.autenticado = data;
            if (_this.autenticado == true) {
                _this.login = false;
                _this.inicio = true;
            }
        }, function (responseError) { return console.log("Error: " + responseError); }, function () { return console.log(_this.autenticado); });
    };
    InicioComponent.prototype.getMunicipalidades = function () {
        var _this = this;
        this.loginService.obtenerMunicipalidades().subscribe(function (data) { return _this.municipalidades = data; }, function (responseError) { return console.log(responseError); }, function () { return console.log("Municipalidades cargadas"); });
    };
    return InicioComponent;
}());
InicioComponent = __decorate([
    core_1.Component({
        selector: 'cerebro-backoffice-inicio',
        templateUrl: 'inicio.component.html',
        styleUrls: ['inicio.component.css'],
        moduleId: module.id,
        providers: [inicio_service_1.InicioService, login_service_1.LoginService]
    }),
    __metadata("design:paramtypes", [http_1.Http, login_service_1.LoginService])
], InicioComponent);
exports.InicioComponent = InicioComponent;
//# sourceMappingURL=inicio.component.js.map