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
var tipo_service_1 = require("./tipo.service");
require("rxjs/add/operator/toPromise");
var TipoDeFuenteDeDatoComponent = (function () {
    function TipoDeFuenteDeDatoComponent(tipos) {
        this.tipos = tipos;
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
        //this.getEmployees();
    };
    TipoDeFuenteDeDatoComponent.prototype.agregarTipoDeFuenteDeDato = function () {
        var _this = this;
        this.tipos.agregarTipo(this.nombre, this.tipoDeDato, this.endpointWS, this.frecLectura).subscribe(function (data) { return _this.repuesta = data; }, function (responseError) { return console.log("Error: " + responseError); }, function () { return console.log(_this.repuesta); });
        this.nombre = "";
        this.tipoDeDato = "";
        this.endpointWS = "";
        this.frecLectura = "";
    };
    TipoDeFuenteDeDatoComponent.prototype.modificarTipoDeFuenteDeDato = function () {
        var _this = this;
        this.tipos.modificarTipo(this.nombreMod, this.tipoDeDatoMod, this.endpointWSMod, this.frecLecturaMod).subscribe(function (data) { return _this.repuesta = data; }, function (responseError) { return console.log("Error: " + responseError); }, function () { return console.log(_this.repuesta); });
        this.nombreMod = "";
        this.tipoDeDatoMod = "";
        this.endpointWSMod = "";
        this.frecLecturaMod = "";
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