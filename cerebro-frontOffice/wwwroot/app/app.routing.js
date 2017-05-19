"use strict";
var router_1 = require("@angular/router");
var agrupacion_component_1 = require("./agrupacion.component");
var chat_component_1 = require("./chat.component");
var index_component_1 = require("./index.component");
var reporte_component_1 = require("./reporte.component");
var inicio_component_1 = require("./inicio.component");
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: index_component_1.IndexComponent, data: { title: 'Index' } },
    { path: 'agrupacion', component: agrupacion_component_1.AgrupacionComponent, data: { title: 'Agrupacion' } },
    { path: 'chat', component: chat_component_1.ChatComponent, data: { title: 'Chat' } },
    { path: 'reporte', component: reporte_component_1.ReporteComponent, data: { title: 'Reporte' } },
    { path: 'inicio', component: inicio_component_1.InicioComponent, data: { title: 'Inicio' } }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
exports.routedComponents = [agrupacion_component_1.AgrupacionComponent, index_component_1.IndexComponent, chat_component_1.ChatComponent, reporte_component_1.ReporteComponent, inicio_component_1.InicioComponent];
//# sourceMappingURL=app.routing.js.map