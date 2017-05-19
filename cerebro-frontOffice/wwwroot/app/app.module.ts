import { NgModule, enableProdMode } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { routing, routedComponents } from './app.routing';
import { APP_BASE_HREF, Location } from '@angular/common';
import { AppComponent } from './app.component';
import "rxjs/add/operator/map";

import { AgrupacionService } from './agrupacion.service';
import { ChatService, ChannelConfig, SignalrWindow } from './chat.service';
import { IndexService } from './index.service';

let channelConfig = new ChannelConfig();
channelConfig.url = "http://localhost:9123/signalr";
channelConfig.hubName = "ChatSignalrHub";

// enableProdMode();

@NgModule({
    imports: [BrowserModule, routing, HttpModule, JsonpModule, CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [AppComponent, routedComponents],
    providers: [Title, { provide: APP_BASE_HREF, useValue: '/' }, AgrupacionService, ChatService, IndexService, { provide: SignalrWindow, useValue: window }, { provide: 'channel.config', useValue: channelConfig }],
    bootstrap: [AppComponent]
})
export class AppModule { }
