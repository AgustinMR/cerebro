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
        this.tipoAeliminar = "";
        this.nombre_municipalidad = "Mdeo";
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
        this.getTipos();
    };
    TipoDeFuenteDeDatoComponent.prototype.agregarTipoDeFuenteDeDato = function () {
        var _this = this;
        this.tipos.agregarTipo(this.nombre, this.tipoDeDato, this.endpointWS, this.frecLectura, this.nombre_municipalidad).subscribe(function (data) { return _this.repuesta = data; }, function (responseError) { return console.log("Error: " + responseError); }, function () { return console.log(_this.repuesta); });
        this.nombre = "";
        this.tipoDeDato = "";
        this.endpointWS = "";
        this.frecLectura = "";
        this.getTipos();
    };
    TipoDeFuenteDeDatoComponent.prototype.modificarTipoDeFuenteDeDato = function () {
        var _this = this;
        if (this.nombreMod != "") {
            this.tipos.modificarTipo(this.nombreMod, this.tipoDeDatoMod, this.endpointWSMod, this.frecLecturaMod, this.nombre_municipalidad).subscribe(function (data) { return _this.repuesta = data; }, function (responseError) { return console.log("Error: " + responseError); }, function () { return console.log(_this.repuesta); });
            this.nombreMod = "Seleccione un tipo de fuente de datos";
            this.tipoDeDatoMod = "";
            this.endpointWSMod = "";
            this.frecLecturaMod = "";
        }
        else {
            console.log("datos incorrectos");
        }
    };
    TipoDeFuenteDeDatoComponent.prototype.getTipos = function () {
        var _this = this;
        this.tipos.obtenerTipos(this.nombre_municipalidad).subscribe(function (data) {
            while (document.getElementById("nombre_mod").hasChildNodes()) {
                document.getElementById("nombre_mod").removeChild(document.getElementById("nombre_mod").lastChild);
            }
            var option2 = document.createElement("option");
            option2.value = "";
            option2.selected = true;
            option2.disabled = true;
            option2.innerHTML = "Seleccione un tipo de fuente de datos...";
            document.getElementById("nombre_mod").appendChild(option2);
            _this.tiposMod = data;
            for (var i = 0; i < _this.tiposMod.length; i++) {
                var option = document.createElement("option");
                option.value = _this.tiposMod[i].nombre;
                option.innerHTML = _this.tiposMod[i].nombre;
                document.getElementById("nombre_mod").appendChild(option);
            }
            _this.getTiposList();
        }, function (responseError) { return console.log(responseError); }, function () { return console.log("Tipos de fuentes de datos cargadas"); });
    };
    TipoDeFuenteDeDatoComponent.prototype.onChange = function (deviceValue) {
        if (deviceValue != 0) {
            for (var i = 0; i < this.tiposMod.length; i++) {
                if (this.tiposMod[i].nombre == deviceValue) {
                    var tipo;
                    if (this.tiposMod[i].tipo == 0) {
                        tipo = "TEXTO";
                    }
                    else if (this.tiposMod[i].tipo == 1) {
                        tipo = "NUMERICO";
                    }
                    if (this.tiposMod[i].tipo == 2) {
                        tipo = "IMAGEN";
                    }
                    if (this.tiposMod[i].tipo == 3) {
                        tipo = "VIDEO";
                    }
                    this.tipoDeDatoMod = tipo;
                    this.endpointWSMod = this.tiposMod[i].uriWebService;
                    this.frecLecturaMod = this.tiposMod[i].frecuenciaLectura;
                }
            }
        }
        else {
            this.nombreMod = "Seleccione un tipo de fuente de datos";
            this.tipoDeDatoMod = "";
            this.endpointWSMod = "";
            this.frecLecturaMod = "";
        }
    };
    TipoDeFuenteDeDatoComponent.prototype.getTiposList = function () {
        var _this = this;
        while (document.getElementById("tiposActuales").hasChildNodes()) {
            document.getElementById("tiposActuales").removeChild(document.getElementById("tiposActuales").lastChild);
        }
        var x = JSON.parse(JSON.stringify(this.tiposMod));
        for (var i in x) {
            var tipo;
            if (x[i].tipo == 0) {
                tipo = "TEXTO";
            }
            else if (x[i].tipo == 1) {
                tipo = "NUMERICO";
            }
            if (x[i].tipo == 2) {
                tipo = "IMAGEN";
            }
            if (x[i].tipo == 3) {
                tipo = "VIDEO";
            }
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.innerHTML = x[i].nombre;
            var td2 = document.createElement("td");
            td2.innerHTML = tipo;
            var td4 = document.createElement("td");
            td4.innerHTML = x[i].uriWebService;
            var td5 = document.createElement("td");
            td5.innerHTML = x[i].frecuenciaLectura;
            var td3 = document.createElement("td");
            td3.className = "w3-center";
            var img = document.createElement("img");
            img.src = "../../Content/rubbish-bin.svg";
            img.style.height = "37px";
            img.className = "w3-button w3-hover-none";
            img.onclick = function () { _this.tipoAeliminar = x[i].Id; _this.mostrarMensajeConfirmacion(); };
            td3.appendChild(img);
            tr.appendChild(td);
            tr.appendChild(td2);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td3);
            document.getElementById("tiposActuales").appendChild(tr);
        }
    };
    TipoDeFuenteDeDatoComponent.prototype.deleteTipo = function () {
        var _this = this;
        this.mostrarMensajeLoading();
        this.tipos.deleteTipo(this.tipoAeliminar).subscribe(function (data) { _this.mostrarMensajeUsuarioQuitado(); console.log(data); }, function (responseError) { console.log(responseError); }, function () { return console.log("Tipo de fuente de datos eliminado"); });
    };
    TipoDeFuenteDeDatoComponent.prototype.mostrarMensajeExito = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "block";
        document.getElementById("error").style.display = "none";
        document.getElementById("usuarioQuitado").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
    };
    TipoDeFuenteDeDatoComponent.prototype.mostrarMensajeError = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "block";
        document.getElementById("usuarioQuitado").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
    };
    TipoDeFuenteDeDatoComponent.prototype.mostrarMensajeLoading = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "block";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("usuarioQuitado").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
    };
    TipoDeFuenteDeDatoComponent.prototype.mostrarMensajeConfirmacion = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("usuarioQuitado").style.display = "none";
        document.getElementById("confirmation").style.display = "block";
    };
    TipoDeFuenteDeDatoComponent.prototype.mostrarMensajeUsuarioQuitado = function () {
        document.getElementById("message").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("usuarioQuitado").style.display = "block";
        document.getElementById("confirmation").style.display = "none";
    };
    TipoDeFuenteDeDatoComponent.prototype.ocultarMensajes = function () {
        document.getElementById("message").style.display = "none";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("usuarioQuitado").style.display = "none";
        document.getElementById("confirmation").style.display = "none";
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