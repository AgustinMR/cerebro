"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var app_routing_1 = require("./app.routing");
var common_2 = require("@angular/common");
var app_component_1 = require("./app.component");
require("rxjs/add/operator/map");
var agrupacion_service_1 = require("./agrupacion.service");
var chat_service_1 = require("./chat.service");
var index_service_1 = require("./index.service");
var channelConfig = new chat_service_1.ChannelConfig();
channelConfig.url = "http://localhost:9123/signalr";
channelConfig.hubName = "ChatSignalrHub";
// enableProdMode();
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, app_routing_1.routing, http_1.HttpModule, http_1.JsonpModule, common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
        declarations: [app_component_1.AppComponent, app_routing_1.routedComponents],
        providers: [platform_browser_1.Title, { provide: common_2.APP_BASE_HREF, useValue: '/' }, agrupacion_service_1.AgrupacionService, chat_service_1.ChatService, index_service_1.IndexService, { provide: chat_service_1.SignalrWindow, useValue: window }, { provide: 'channel.config', useValue: channelConfig }],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map