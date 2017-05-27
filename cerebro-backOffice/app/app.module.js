"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
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
// Login    
var login_component_1 = require("./login/login.component");
var login_service_1 = require("./login/login.service");
// Inicio
var inicio_component_1 = require("./inicio/inicio.component");
var inicio_service_1 = require("./inicio/inicio.service");
//import { EmployeeService } from './employee/employee.service';
//import { EmployeeTaskService, ChannelConfig, SignalrWindow } from './employee/employee.task.service';
//let channelConfig = new ChannelConfig();
//channelConfig.url = "http://localhost:9123/signalr";
//channelConfig.hubName = "EmployeeHub";
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, app_routing_module_1.AppRoutingModule, common_1.CommonModule, forms_1.ReactiveFormsModule, forms_1.FormsModule, http_1.HttpModule],
        declarations: [app_component_1.AppComponent, dispositivo_component_1.FuenteDeDatoComponent, tipo_component_1.TipoDeFuenteDeDatoComponent, evento_component_1.EventoComponent, usuario_component_1.UsuarioComponent, estadistica_component_1.EstadisticaComponent, login_component_1.LoginComponent, inicio_component_1.InicioComponent],
        //providers: [EmployeeService, HttpModule, EmployeeTaskService,
        //    { provide: SignalrWindow, useValue: window },
        //    { provide: 'channel.config', useValue: channelConfig }],
        providers: [dispositivo_service_1.FuenteDeDatoService, tipo_service_1.TipoDeFuenteDeDatoService, evento_service_1.EventoService, usuario_service_1.UsuarioService, estadistica_service_1.EstadisticaService, http_1.HttpModule, login_service_1.LoginService, inicio_service_1.InicioService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map