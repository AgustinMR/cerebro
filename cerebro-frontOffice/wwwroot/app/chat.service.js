"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var SignalrWindow = (function (_super) {
    __extends(SignalrWindow, _super);
    function SignalrWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SignalrWindow;
}(Window));
exports.SignalrWindow = SignalrWindow;
var ConnectionState;
(function (ConnectionState) {
    ConnectionState[ConnectionState["Connecting"] = 1] = "Connecting";
    ConnectionState[ConnectionState["Connected"] = 2] = "Connected";
    ConnectionState[ConnectionState["Reconnecting"] = 3] = "Reconnecting";
    ConnectionState[ConnectionState["Disconnected"] = 4] = "Disconnected";
})(ConnectionState = exports.ConnectionState || (exports.ConnectionState = {}));
var ChannelConfig = (function () {
    function ChannelConfig() {
    }
    return ChannelConfig;
}());
exports.ChannelConfig = ChannelConfig;
var ChannelEvent = (function () {
    function ChannelEvent() {
        this.datetime = new Date();
    }
    return ChannelEvent;
}());
exports.ChannelEvent = ChannelEvent;
var ChannelSubject = (function () {
    function ChannelSubject() {
    }
    return ChannelSubject;
}());
var ChatService = (function () {
    function ChatService(window, channelConfig) {
        var _this = this;
        this.window = window;
        this.channelConfig = channelConfig;
        this.connectionStateSubject = new Subject_1.Subject();
        this.startingSubject = new Subject_1.Subject();
        this.errorSubject = new Subject_1.Subject();
        this.subjects = new Array();
        if (this.window.$ === undefined || this.window.$.hubConnection === undefined) {
            throw new Error("The variable '$' or the .hubConnection() function are not defined...please check the SignalR scripts have been loaded properly");
        }
        this.connectionState$ = this.connectionStateSubject.asObservable();
        this.error$ = this.errorSubject.asObservable();
        this.starting$ = this.startingSubject.asObservable();
        this.hubConnection = this.window.$.hubConnection();
        this.hubConnection.url = channelConfig.url;
        this.hubProxy = this.hubConnection.createHubProxy(channelConfig.hubName);
        this.hubConnection.stateChanged(function (state) {
            var newState = ConnectionState.Connecting;
            switch (state.newState) {
                case _this.window.$.signalR.connectionState.connecting:
                    newState = ConnectionState.Connecting;
                    break;
                case _this.window.$.signalR.connectionState.connected:
                    newState = ConnectionState.Connected;
                    break;
                case _this.window.$.signalR.connectionState.reconnecting:
                    newState = ConnectionState.Reconnecting;
                    break;
                case _this.window.$.signalR.connectionState.disconnected:
                    newState = ConnectionState.Disconnected;
                    break;
            }
            _this.connectionStateSubject.next(newState);
        });
        this.hubConnection.error(function (error) {
            _this.errorSubject.next(error);
        });
        this.hubProxy.on("onEvent", function (channel, ev) {
            var channelSub = _this.subjects.find(function (x) {
                return x.channel === channel;
            });
            if (channelSub !== undefined) {
                return channelSub.subject.next(ev);
            }
        });
    }
    ChatService.prototype.start = function () {
        var _this = this;
        this.hubConnection.start()
            .done(function () {
            _this.startingSubject.next();
        })
            .fail(function (error) {
            _this.startingSubject.error(error);
        });
    };
    ChatService.prototype.sub = function (channel) {
        var _this = this;
        var channelSub = this.subjects.find(function (x) {
            return x.channel === channel;
        });
        if (channelSub !== undefined) {
            console.log("Found existing observable for " + channel + " channel");
            return channelSub.subject.asObservable();
        }
        channelSub = new ChannelSubject();
        channelSub.channel = channel;
        channelSub.subject = new Subject_1.Subject();
        this.subjects.push(channelSub);
        this.starting$.subscribe(function () {
            _this.hubProxy.invoke("Subscribe", channel)
                .done(function () {
                console.log("Successfully subscribed to " + channel + " channel");
            })
                .fail(function (error) {
                channelSub.subject.error(error);
            });
        }, function (error) {
            channelSub.subject.error(error);
        });
        return channelSub.subject.asObservable();
    };
    ChatService.prototype.publish = function (ev) {
        this.hubProxy.invoke("Publish", ev);
    };
    return ChatService;
}());
ChatService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(SignalrWindow)), __param(1, core_1.Inject("channel.config")),
    __metadata("design:paramtypes", [SignalrWindow, ChannelConfig])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map