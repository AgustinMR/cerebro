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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var inicio_service_1 = require("./inicio.service");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var InicioComponent = (function () {
    function InicioComponent(http) {
        this.http = http;
        this.dispositivo = false;
        this.evento = false;
        this.tipo = false;
        this.usuario = false;
        this.estadistica = true;
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
        // Start the connection up!
        //
        //console.log("Starting the channel service");
        //this.channelService.start();
        //this.channelService.sub("USUARIO_CONECTADO").map(response => {
        //    if (response.Name === "user.registred") {
        //        this.showNotification();
        //    }
        //}).subscribe(response => console.log("incomming message at USUARIO_CONECTADO channel with Name:", response), error => console.log("Ha ocurrido un error: ", error), () => { });
    };
    return InicioComponent;
}());
InicioComponent = __decorate([
    core_1.Component({
        selector: 'cerebro-backoffice-inicio',
        templateUrl: 'inicio.component.html',
        styleUrls: ['inicio.component.css'],
        moduleId: module.id,
        providers: [inicio_service_1.InicioService]
    }),
    __metadata("design:paramtypes", [http_1.Http])
], InicioComponent);
exports.InicioComponent = InicioComponent;
//# sourceMappingURL=inicio.component.js.map