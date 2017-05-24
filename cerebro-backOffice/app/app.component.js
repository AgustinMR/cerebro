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
var http_1 = require("@angular/http");
var dispositivo_service_1 = require("./dispositivo/dispositivo.service");
var estadistica_service_1 = require("./estadistica/estadistica.service");
var evento_service_1 = require("./evento/evento.service");
var tipo_service_1 = require("./tipo/tipo.service");
var usuario_service_1 = require("./usuario/usuario.service");
var login_service_1 = require("./login/login.service");
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
    }
    AppComponent.prototype.ngOnInit = function () {
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
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'tsi1-cerebro-gr17',
        templateUrl: 'app.component.html',
        styleUrls: ['app.component.css'],
        moduleId: module.id,
        //providers: [EmployeeTaskService]
        providers: [dispositivo_service_1.FuenteDeDatoService, estadistica_service_1.EstadisticaService, evento_service_1.EventoService, tipo_service_1.TipoDeFuenteDeDatoService, usuario_service_1.UsuarioService, login_service_1.LoginService]
    }),
    __metadata("design:paramtypes", [http_1.Http])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map