import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';

// Agrupacion
import { AgrupacionComponent } from './agrupacion/agrupacion.component';
import { AgrupacionService } from './agrupacion/agrupacion.service';
// Chat
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat/chat.service';
// Operador
import { OperadorComponent } from './operador/operador.component';
import { OperadorService } from './operador/operador.service';
// Reporte
import { ReporteComponent } from './reporte/reporte.component';
import { ReporteService } from './reporte/reporte.service';
// Visitante
import { VisitanteComponent } from './visitante/visitante.component';
import { VisitanteService } from './visitante/visitante.service';

const routes: Routes = [
    { path: 'agrupaciones', component: AgrupacionComponent },
    { path: 'chats', component: ChatComponent },
    { path: 'operadores', component: OperadorComponent },
    { path: 'reportes', component: ReporteComponent },
    { path: 'visitantes', component: VisitanteComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [Location, { provide: LocationStrategy, useClass: HashLocationStrategy }, AgrupacionService, ChatService, OperadorService, ReporteService, VisitanteService]
})
export class AppRoutingModule { }