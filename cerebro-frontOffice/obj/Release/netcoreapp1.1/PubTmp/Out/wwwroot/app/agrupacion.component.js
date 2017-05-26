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
var usuario_service_1 = require("./usuario.service");
require("rxjs/add/operator/toPromise");
var AgrupacionComponent = (function () {
    function AgrupacionComponent(service, usuarios) {
        this.service = service;
        this.usuarios = usuarios;
        this.nombreAgrupacionNueva = "";
        this.email = "agustinmr1995@gmail.com";
        this.municipalidad = "Florida";
        this.agrupacionActual = "";
        this.usuarioAeliminar = "";
        this.usuarioAagregar = "";
    }
    AgrupacionComponent.prototype.ngOnInit = function () {
        this.getAgrupacionesByUsuario();
        this.getUsuariosByMunicipalidad(this.municipalidad);
    };
    AgrupacionComponent.prototype.getAgrupacionesByUsuario = function () {
        this.service.getAgrupacionesByUsuario(this.email).subscribe(function (data) {
            while (document.getElementById("agrupaciones").hasChildNodes()) {
                document.getElementById("agrupaciones").removeChild(document.getElementById("agrupaciones").lastChild);
            }
            for (var u in data) {
                var option = document.createElement("option");
                option.value = data[u];
                option.innerHTML = data[u];
                document.getElementById("agrupaciones").appendChild(option);
            }
            var option2 = document.createElement("option");
            option2.value = "";
            option2.selected = true;
            option2.disabled = true;
            option2.innerHTML = "Seleccione una agrupacion...";
            document.getElementById("agrupaciones").appendChild(option2);
        }, function (responseError) { console.log(responseError); }, function () { return console.log("getUsuariosByMunicipalidad request finished"); });
    };
    AgrupacionComponent.prototype.seleccionarAgrupacion = function (agrupacion) {
        this.getUsuariosByMunicipalidad(this.municipalidad);
    };
    AgrupacionComponent.prototype.getUsuariosByMunicipalidad = function (municipalidad) {
        this.usuarios.getUsuariosByMunicipalidad(municipalidad).subscribe(function (data) {
            while (document.getElementById("usuariosAgregar").hasChildNodes()) {
                document.getElementById("usuariosAgregar").removeChild(document.getElementById("usuariosAgregar").lastChild);
            }
            var x = JSON.parse(JSON.stringify(data));
            for (var u in x) {
                var option = document.createElement("option");
                option.value = x[u].email;
                option.innerHTML = x[u].nombre + " - " + x[u].email;
                document.getElementById("usuariosAgregar").appendChild(option);
            }
            var option2 = document.createElement("option");
            option2.value = "";
            option2.selected = true;
            option2.disabled = true;
            option2.innerHTML = "Seleccione un usuario para agregar...";
            document.getElementById("usuariosAgregar").appendChild(option2);
        }, function (responseError) { console.log(responseError); }, function () { return console.log("getUsuariosByMunicipalidad request finished"); });
    };
    AgrupacionComponent.prototype.getUsuariosByAgrupacion = function (agrupacion) {
        var _this = this;
        this.service.getUsuariosAgrupacion(agrupacion).subscribe(function (data) {
            while (document.getElementById("usuariosActualesBody").hasChildNodes()) {
                document.getElementById("usuariosActualesBody").removeChild(document.getElementById("usuariosActualesBody").lastChild);
            }
            var x = JSON.parse(JSON.stringify(data));
            for (var u in x) {
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                td.className = "collapsing";
                var div = document.createElement("div");
                div.className = "ui fitted slider checkbox";
                var input = document.createElement("input");
                input.type = "checkbox";
                input.onchange = function () { _this.toggleAdminAgrupacion(input.checked); };
                var label = document.createElement("label");
                if (x[u].admin === true) {
                    input.checked = true;
                }
                div.appendChild(input);
                div.appendChild(label);
                td.appendChild(div);
                var td2 = document.createElement("td");
                td2.innerHTML = x[u].usuario_email;
                var td3 = document.createElement("td");
                td3.className = "w3-center";
                var img = document.createElement("img");
                img.src = "../images/rubbish-bin.svg";
                img.style.height = "37px";
                img.className = "w3-button w3-hover-none";
                img.onclick = function () { _this.usuarioAeliminar = x[u].usuario_email; _this.mostrarMensajeConfirmacion(); };
                td3.appendChild(img);
                tr.appendChild(td);
                tr.appendChild(td2);
                tr.appendChild(td3);
                document.getElementById("usuariosActualesBody").appendChild(tr);
            }
        }, function (responseError) { console.log(responseError); }, function () { return console.log("getUsuariosByAgrupacion request finished"); });
    };
    AgrupacionComponent.prototype.addAgrupacion = function () {
        var _this = this;
        this.mostrarMensajeLoading();
        this.service.addAgrupacion(this.email, this.municipalidad, this.nombreAgrupacionNueva).subscribe(function (data) { _this.mostrarMensajeExito(); console.log(data.json); }, function (responseError) { _this.mostrarMensajeError(); console.log(responseError); }, function () { return console.log("addAgrupacion request finished"); });
    };
    AgrupacionComponent.prototype.deleteAgrupacion = function () {
        var _this = this;
        this.mostrarMensajeLoading();
        this.service.deleteAgrupacion(this.nombreAgrupacionNueva, this.municipalidad).subscribe(function (data) { _this.mostrarMensajeExito(); console.log(data.json); }, function (responseError) { _this.mostrarMensajeError(); console.log(responseError); }, function () { return console.log("deleteAgrupacion request finished"); });
    };
    AgrupacionComponent.prototype.addUsuarioAgrupacion = function () {
        var _this = this;
        if (this.usuarioAagregar !== "" && this.usuarioAagregar !== "Seleccione un usuario para agregar...") {
            this.mostrarMensajeLoading();
            this.service.addUsuarioAgrupacion(this.usuarioAagregar, this.municipalidad, this.agrupacionActual).subscribe(function (data) { _this.mostrarMensajeExito(); console.log(data.json); }, function (responseError) { console.log(responseError); }, function () { return console.log("addUsuarioAgrupacion request finished"); });
        }
    };
    AgrupacionComponent.prototype.toggleAdminAgrupacion = function (esAdmin) {
        this.service.toggleAdminAgrupacion(this.email, this.municipalidad, this.agrupacionActual, esAdmin).subscribe(function (data) { console.log(data); }, function (responseError) { console.log(responseError); }, function () { return console.log("toggleAdminAgrupacion request finished"); });
    };
    AgrupacionComponent.prototype.deleteUsuarioAgrupacion = function () {
        var _this = this;
        this.mostrarMensajeLoading();
        this.service.deleteUsuarioAgrupacion(this.usuarioAeliminar, this.municipalidad, this.agrupacionActual).subscribe(function (data) { _this.mostrarMensajeUsuarioQuitado(); console.log(data); }, function (responseError) { console.log(responseError); }, function () { return console.log("toggleAdminAgrupacion request finished"); });
    };
    AgrupacionComponent.prototype.mostrarMensajeExito = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "block";
        document.getElementById("error").style.display = "none";
        this.nombreAgrupacionNueva = "";
        document.getElementById("usuarioQuitado").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("errorAgregarUsuario").style.display = "none";
        document.getElementById("successAgregarUsuario").style.display = "none";
    };
    AgrupacionComponent.prototype.mostrarMensajeError = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "block";
        document.getElementById("usuarioQuitado").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("errorAgregarUsuario").style.display = "none";
        document.getElementById("successAgregarUsuario").style.display = "none";
    };
    AgrupacionComponent.prototype.mostrarMensajeLoading = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "block";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("usuarioQuitado").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("errorAgregarUsuario").style.display = "none";
        document.getElementById("successAgregarUsuario").style.display = "none";
    };
    AgrupacionComponent.prototype.mostrarMensajeConfirmacion = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("usuarioQuitado").style.display = "none";
        document.getElementById("confirmation").style.display = "block";
        document.getElementById("errorAgregarUsuario").style.display = "none";
        document.getElementById("successAgregarUsuario").style.display = "none";
    };
    AgrupacionComponent.prototype.mostrarMensajeUsuarioQuitado = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("usuarioQuitado").style.display = "block";
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("errorAgregarUsuario").style.display = "none";
        document.getElementById("successAgregarUsuario").style.display = "none";
    };
    AgrupacionComponent.prototype.mostrarMensajeUsuarioAgregado = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("usuarioQuitado").style.display = "block";
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("errorAgregarUsuario").style.display = "none";
        document.getElementById("successAgregarUsuario").style.display = "block";
    };
    AgrupacionComponent.prototype.mostrarMensajeErrorAgregarUsuario = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("usuarioQuitado").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("errorAgregarUsuario").style.display = "block";
        document.getElementById("successAgregarUsuario").style.display = "none";
    };
    AgrupacionComponent.prototype.ocultarMensajes = function () {
        document.getElementById("message").style.display = "none";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("usuarioQuitado").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("errorAgregarUsuario").style.display = "none";
        document.getElementById("successAgregarUsuario").style.display = "none";
    };
    return AgrupacionComponent;
}());
AgrupacionComponent = __decorate([
    core_1.Component({
        selector: 'cerebro-agrupacion-component',
        templateUrl: '/partial/AgrupacionComponent',
        providers: [agrupacion_service_1.AgrupacionService]
    }),
    __metadata("design:paramtypes", [agrupacion_service_1.AgrupacionService, usuario_service_1.UsuarioService])
], AgrupacionComponent);
exports.AgrupacionComponent = AgrupacionComponent;
//# sourceMappingURL=agrupacion.component.js.map