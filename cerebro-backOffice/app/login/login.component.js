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
var login_service_1 = require("./login.service");
var router_1 = require("@angular/router");
require("rxjs/add/operator/toPromise");
var LoginComponent = (function () {
    function LoginComponent(loginService, router) {
        this.loginService = loginService;
        this.router = router;
        this.login = true;
        this.inicio = false;
    }
    LoginComponent.prototype.ingresar = function () {
        var _this = this;
        this.loginService.loginAdmin("admin", "Mdeo", "hola").subscribe(function (data) {
            _this.autenticado = data;
            if (_this.autenticado == true) {
                _this.login = false;
                _this.inicio = true;
            }
        }, function (responseError) { return console.log("Error: " + responseError); }, function () { return console.log(_this.autenticado); });
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.getMunicipalidades();
    };
    LoginComponent.prototype.getMunicipalidades = function () {
        var _this = this;
        this.loginService.obtenerMunicipalidades().subscribe(function (data) { return _this.municipalidades = data; }, function (responseError) { return console.log(responseError); }, function () { return console.log("Municipalidades cargadas"); });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'cerebro-login',
        templateUrl: 'login.component.html',
        styleUrls: ['login.component.css'],
        moduleId: module.id,
        providers: [login_service_1.LoginService]
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map