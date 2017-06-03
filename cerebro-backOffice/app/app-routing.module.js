"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
// Fuentes de Dato
var dispositivo_component_1 = require("./dispositivo/dispositivo.component");
var dispositivo_service_1 = require("./dispositivo/dispositivo.service");
// Eventos
var evento_component_1 = require("./evento/evento.component");
var evento_service_1 = require("./evento/evento.service");
// Tipos de Fuentes de Datos
var tipo_component_1 = require("./tipo/tipo.component");
var tipo_service_1 = require("./tipo/tipo.service");
// Usuarios
var usuario_component_1 = require("./usuario/usuario.component");
var usuario_service_1 = require("./usuario/usuario.service");
// Estadistica
var estadistica_component_1 = require("./estadistica/estadistica.component");
var estadistica_service_1 = require("./estadistica/estadistica.service");
// Inicio
var inicio_component_1 = require("./inicio/inicio.component");
var inicio_service_1 = require("./inicio/inicio.service");
var login_service_1 = require("./inicio/login.service");
var routes = [
    { path: 'dispositivos', component: dispositivo_component_1.FuenteDeDatoComponent },
    { path: 'estadisticas', component: estadistica_component_1.EstadisticaComponent },
    { path: 'eventos', component: evento_component_1.EventoComponent },
    { path: 'inicio', component: inicio_component_1.InicioComponent },
    { path: 'tipos', component: tipo_component_1.TipoDeFuenteDeDatoComponent },
    { path: 'usuarios', component: usuario_component_1.UsuarioComponent },
    { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule],
        providers: [common_1.Location, { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }, dispositivo_service_1.FuenteDeDatoService, estadistica_service_1.EstadisticaService, evento_service_1.EventoService, tipo_service_1.TipoDeFuenteDeDatoService, usuario_service_1.UsuarioService, login_service_1.LoginService, inicio_service_1.InicioService]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map