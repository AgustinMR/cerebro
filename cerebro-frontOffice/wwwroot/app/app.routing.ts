import { Routes, RouterModule } from '@angular/router';

import { AgrupacionComponent } from './agrupacion.component';
import { ChatComponent } from './chat.component';
import { ReporteComponent } from './reporte.component';
import { InicioComponent } from './inicio.component';

const appRoutes: Routes = [
    //{ path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'agrupacion', component: AgrupacionComponent, data: { title: 'Agrupacion' } },
    { path: 'chat', component: ChatComponent, data: { title: 'Chat' } },
    { path: 'reporte', component: ReporteComponent, data: { title: 'Reporte' } },
    { path: 'inicio', component: InicioComponent, data: { title: 'Inicio' } }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [AgrupacionComponent, ChatComponent, ReporteComponent, InicioComponent];