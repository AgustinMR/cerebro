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
require("rxjs/add/operator/toPromise");
var AgrupacionComponent = (function () {
    function AgrupacionComponent(agru) {
        this.agru = agru;
    }
    AgrupacionComponent.prototype.addAgrupacion1 = function () {
        var _this = this;
        this.agru.addAgrupacion("gmail", "Mdeo", "TSI.NEt", "Mdeo", true).subscribe(function (data) { return _this.agrupacionAgregada = data; }, function (responseError) { return console.log(responseError); }, function () { return console.log("ok"); });
    };
    return AgrupacionComponent;
}());
AgrupacionComponent = __decorate([
    core_1.Component({
        selector: 'my-contact',
        templateUrl: '/partial/AgrupacionComponent',
        providers: [agrupacion_service_1.AgrupacionService]
    }),
    __metadata("design:paramtypes", [agrupacion_service_1.AgrupacionService])
], AgrupacionComponent);
exports.AgrupacionComponent = AgrupacionComponent;
//# sourceMappingURL=agrupacion.component.js.map