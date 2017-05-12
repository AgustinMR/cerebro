import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent } from './app.component'
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import "rxjs/add/operator/map";

import { AgrupacionComponent } from './agrupacion/agrupacion.component';
import { AgrupacionService } from './agrupacion/agrupacion.service';

import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat/chat.service';

import { IndexComponent } from './index/index.component';
import { IndexService } from './index/index.service';

import { InicioComponent } from './inicio/inicio.component';
import { InicioService } from './inicio/inicio.service';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        AgrupacionComponent,
        ChatComponent,
        IndexComponent,
        InicioComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'index', pathMatch: 'full' },
            { path: 'index', component: IndexComponent },
            { path: 'agrupacion', component: AgrupacionComponent },
            { path: 'chat', component: ChatComponent },
            { path: 'inicio', component: InicioComponent },
            { path: '**', redirectTo: 'index' }
        ])
    ],
    providers: [
        AgrupacionService,
        ChatService,
        IndexService,
        InicioComponent
    ]
})
export class AppModule {
}