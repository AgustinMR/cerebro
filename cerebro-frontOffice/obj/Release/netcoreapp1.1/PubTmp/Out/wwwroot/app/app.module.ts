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
import { ChatService } from './chat.service';
import { IndexService } from './index.service';

// enableProdMode();

@NgModule({
    imports: [BrowserModule, routing, HttpModule, JsonpModule, CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [AppComponent, routedComponents],
    providers: [Title, { provide: APP_BASE_HREF, useValue: '/' }, AgrupacionService, ChatService, IndexService],
    bootstrap: [AppComponent]
})
export class AppModule { }
