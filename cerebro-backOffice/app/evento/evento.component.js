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
var evento_service_1 = require("./evento.service");
require("rxjs/add/operator/toPromise");
var EventoComponent = (function () {
    function EventoComponent(eventos) {
        this.eventos = eventos;
    }
    EventoComponent.prototype.ngOnInit = function () {
        //this.getEmployees();
    };
    return EventoComponent;
}());
EventoComponent = __decorate([
    core_1.Component({
        selector: 'cerebro-evento',
        templateUrl: 'evento.component.html',
        styleUrls: ['evento.component.css'],
        moduleId: module.id,
        providers: [evento_service_1.EventoService]
    }),
    __metadata("design:paramtypes", [evento_service_1.EventoService])
], EventoComponent);
exports.EventoComponent = EventoComponent;
//# sourceMappingURL=evento.component.js.map