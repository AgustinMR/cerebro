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
require("rxjs/add/operator/toPromise");
var chat_service_1 = require("./chat.service");
var ChatComponent = (function () {
    function ChatComponent(http, service) {
        this.http = http;
        this.service = service;
        this.autor = "Agustin";
        this.agrupacion = "Mdeo";
        this.email = "agustinmr1995@gmail.com";
    }
    ChatComponent.prototype.ngOnInit = function () {
        var pusher = new Pusher('5b358aae693e596e8b06', { encrypted: true, cluster: "us2" });
        var channel = pusher.subscribe(this.agrupacion);
        var email = this.email;
        channel.bind('mensaje-nuevo', function (data) {
            var e = JSON.stringify(data);
            var x = JSON.parse(e);
            if (x.email === email) {
                var ele1 = document.createElement("div");
                ele1.className = 'w3-row w3-margin-top';
                ele1.setAttribute("style", "margin-bottom: 7px");
                var ele2 = document.createElement("div");
                ele2.className = 'w3-third w3-pale-green w3-right w3-round w3-card';
                ele1.appendChild(ele2);
                var ele3 = document.createElement("div");
                ele3.className = 'w3-row w3-small w3-margin-left';
                var span1 = document.createElement("span");
                span1.className = "w3-text-cerebro-red";
                span1.innerHTML = x.autor;
                ele3.appendChild(span1);
                var span2 = document.createElement("span");
                span2.className = "w3-right w3-margin-right w3-text-grey";
                var fecha = x.datetime.toString().split('T', 2);
                var fecha2 = fecha[1].split(".", 2);
                span2.innerHTML = fecha2[0];
                ele3.appendChild(span2);
                ele2.appendChild(ele3);
                var ele4 = document.createElement("div");
                ele4.style.marginBottom = '3px';
                ele4.className = 'w3-row w3-text-dark-gray w3-margin-left w3-margin-right';
                ele4.textContent = x.mensaje;
                ele2.appendChild(ele4);
                document.getElementById("chat").appendChild(ele1);
            }
            else {
                var ele1 = document.createElement("div");
                ele1.className = 'w3-row w3-margin-top';
                ele1.setAttribute("style", "margin-bottom: 7px");
                var ele2 = document.createElement("div");
                ele2.className = 'w3-third w3-white w3-round w3-card';
                ele1.appendChild(ele2);
                var ele3 = document.createElement("div");
                ele3.className = 'w3-row w3-small w3-margin-left';
                var span1 = document.createElement("span");
                span1.className = "w3-text-cerebro-red";
                span1.innerHTML = x.autor;
                ele3.appendChild(span1);
                var span2 = document.createElement("span");
                span2.className = "w3-right w3-margin-right w3-text-grey";
                var fecha = x.datetime.toString().split('T', 2);
                var fecha2 = fecha[1].split(".", 2);
                span2.innerHTML = fecha2[0];
                ele3.appendChild(span2);
                ele2.appendChild(ele3);
                var ele4 = document.createElement("div");
                ele4.style.marginBottom = '3px';
                ele4.className = 'w3-row w3-text-dark-gray w3-margin-left w3-margin-right';
                ele4.textContent = x.mensaje;
                ele2.appendChild(ele4);
                document.getElementById("chat").appendChild(ele1);
            }
        });
    };
    ChatComponent.prototype.enviarMensaje = function (mensaje) {
        this.service.enviarMensaje(mensaje, this.agrupacion, this.autor, this.email).subscribe(function (data) { return document.getElementById("mensaje").innerHTML = ""; }, function (responseError) { return console.log("Error:  -" + responseError); }, function () { return console.log("finished"); });
    };
    return ChatComponent;
}());
ChatComponent = __decorate([
    core_1.Component({
        selector: 'cerebro-chat-component',
        templateUrl: '/partial/ChatComponent',
        providers: [chat_service_1.ChatService]
    }),
    __metadata("design:paramtypes", [http_1.Http, chat_service_1.ChatService])
], ChatComponent);
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map