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
var chat_service_1 = require("./chat.service");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var AgrupacionComponent = (function () {
    function AgrupacionComponent(channelService, http, agru) {
        this.channelService = channelService;
        this.http = http;
        this.agru = agru;
        this.connectionState$ = this.channelService.connectionState$.map(function (state) { return chat_service_1.ConnectionState[state]; });
        this.channelService.error$.subscribe(function (error) { console.warn(error); }, function (error) { console.error("errors$ error", error); });
        this.channelService.starting$.subscribe(function () { console.log("signalr service has been started"); }, function () { console.warn("signalr service failed to start!"); });
    }
    AgrupacionComponent.prototype.addAgrupacion1 = function () {
        var _this = this;
        this.agru.addAgrupacion("gmail", "Mdeo", "TSI.NEt", "Mdeo", true).subscribe(function (data) { return _this.agrupacionAgregada = data; }, function (responseError) { return console.log(responseError); }, function () { return console.log("ok"); });
    };
    AgrupacionComponent.prototype.showNotification = function () {
        alert("algo me llego");
    };
    AgrupacionComponent.prototype.enviarMensaje = function () {
        this.http.get("http://localhost:9123/tasks/employees")
            .map(function (res) { return res.json(); })
            .subscribe(function (message) { console.log(message); });
    };
    AgrupacionComponent.prototype.suscribirseAgrupacion = function () {
        var _this = this;
        this.channelService.start();
        this.channelService.sub(this.agrupacion).map(function (response) {
            if (response.name === "mensaje.nuevo") {
                _this.showNotification();
            }
        }).subscribe(function (response) { return console.log("incomming message at USUARIO_CONECTADO channel with Name:", response); }, function (error) { return console.log("Ha ocurrido un error: ", error); }, function () { });
    };
    AgrupacionComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Start the connection up!
        //
        console.log("Starting the channel service");
        this.channelService.start();
        this.channelService.sub(this.agrupacion).map(function (response) {
            if (response.name === "mensaje.nuevo") {
                _this.showNotification();
            }
        }).subscribe(function (response) { return console.log("incomming message at USUARIO_CONECTADO channel with Name:", response); }, function (error) { return console.log("Ha ocurrido un error: ", error); }, function () { });
    };
    return AgrupacionComponent;
}());
AgrupacionComponent = __decorate([
    core_1.Component({
        selector: 'my-contact',
        templateUrl: '/partial/AgrupacionComponent',
        providers: [agrupacion_service_1.AgrupacionService]
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService, http_1.Http, agrupacion_service_1.AgrupacionService])
], AgrupacionComponent);
exports.AgrupacionComponent = AgrupacionComponent;
//# sourceMappingURL=agrupacion.component.js.map