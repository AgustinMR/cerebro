import { Component, OnInit } from '@angular/core';
import { FuenteDeDatoService } from './dispositivo.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var ol: any;
declare var $: any;

@Component({
    selector: 'cerebro-dispositivo',
    templateUrl: 'dispositivo.component.html',
    styleUrls: ['dispositivo.component.css'],
    moduleId: module.id,
    providers: [FuenteDeDatoService]
})
export class FuenteDeDatoComponent implements OnInit {

    nombre_municipalidad: any = "Mdeo"
    source: any;
    map: any;
    vectorLayerMod: any;
    point_feature: any;
    draw: any;
    geom = "";
    geomMod = "";
    nombreNew: any;
    modifyInteraction: any;
    selectInteraction: any;


    tipoDeFuneteDeDato: any;
    tiposRet: any;
    dispositivosMod: any;

    tipoDeFuneteDeDatoSelect = "";
    tipoDeFuneteDeDatoSelectMod = "";
    selectBorrar = "";
    ipNew = "";
    userAgentNew = "";

    ipMod = "";
    nombreMod = "";
    userAgentMod = "";

    tipoGuardar = "nuevo";

    constructor(private dispositivos: FuenteDeDatoService) {
    }

    ngOnInit(): void {
        $(document).ready(function () {
            $('.ui.sidebar').sidebar('attach events', '.toc.item');
            $('.ui.dropdown').dropdown();
        });
        var raster = new ol.layer.Tile({ source: new ol.source.OSM() });
        this.source = new ol.source.Vector({ wrapX: false });
        var vector = new ol.layer.Vector({
            source: this.source,
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: 'orange'
                    })
                })
            })
        });

        this.map = new ol.Map({
            layers: [raster, vector],
            target: 'map',
            view: new ol.View({
                projection: 'EPSG:4326',
                center: [-56.16466616190428, -34.89647351494282],
                zoom: 12
            })
        });
        var features = new ol.Collection();
        this.draw = new ol.interaction.Draw({
            source: this.source,
            features: features,
            type: "Point"
        });
        this.draw.on('drawend', function (evt: any) {
            this.geom = evt.feature.getGeometry().getCoordinates();
            this.geomMod = evt.feature.getGeometry().getCoordinates();
            this.map.removeInteraction(this.draw);
        }, this);
        this.cargarTipos();
    }

    cargarTipos() {
        this.dispositivos.obtenerTipos(this.nombre_municipalidad).subscribe(
            (data: Response) => {
                this.tipoDeFuneteDeDato = data;
                this.cargarDispositivos();
            },
            responseError => console.log(responseError),
            () => console.log("Tipos de fuentes de datos cargadas")
        );
    }

    cargarDispositivos() {
        this.dispositivos.obtenerDis(this.nombre_municipalidad).subscribe(
            (data: Response) => {
                this.dispositivosMod = data;
                //this.getDispositivosList();
            },
            responseError => console.log(responseError),
            () => console.log("Fuentes de datos cargadas")
        );
    }

    nuevoPunto() {
        if (this.tipoGuardar == "nuevo") {
            this.source.clear();
        } else if (this.tipoGuardar == "modificar") {
            if (this.geomMod != "") {
                this.source.clear();
                this.map.removeLayer(this.vectorLayerMod);
            }
        }
        this.map.addInteraction(this.draw);

    }

    guardar() {
        if (this.tipoGuardar == "nuevo") {
            if (this.ipNew != "" && this.userAgentNew != "" && this.tipoDeFuneteDeDatoSelect != "" && this.nombreNew != "" && this.geom != "") {
                this.dispositivos.agregarFuente(this.ipNew, this.userAgentNew, this.tipoDeFuneteDeDatoSelect, this.geom, this.nombre_municipalidad, this.nombreNew).subscribe(
                    (data: Response) => {
                        this.ipNew = "";
                        this.userAgentNew = "";
                        this.tipoDeFuneteDeDatoSelect = "";
                        this.nombreNew = "";
                        this.source.clear();
                        this.cargarTipos();
                    },
                    responseError => console.log(responseError),
                    () => console.log("Tipos de fuentes de datos cargadas")
                );
            }
        } else if (this.tipoGuardar == "modificar") {
            if (this.ipMod != "" && this.userAgentMod != "" && this.geomMod != "") {
                //console.log(this.tipoDeFuneteDeDatoSelectMod);
                this.dispositivos.modificarFuente(this.ipMod, this.userAgentMod, this.geomMod, this.tipoDeFuneteDeDatoSelectMod).subscribe(
                    (data: Response) => {
                        this.nombreMod = "";
                        this.ipMod = "";
                        this.userAgentMod = "";
                        this.geomMod = "";
                        this.tipoDeFuneteDeDatoSelectMod = "";
                        this.source.clear();
                        this.map.removeInteraction(this.modifyInteraction);
                        this.map.removeInteraction(this.selectInteraction);
                        this.map.removeLayer(this.vectorLayerMod);
                        this.cargarDispositivos();
                    },
                    responseError => console.log(responseError),
                    () => console.log("Tipos de fuentes de datos cargadas")
                );
            }
        }

    }

    onChange(val: any) {
        for (var dis of this.dispositivosMod) {
            if (dis.Id == val) {
                this.nombreMod = dis.nombre;
                this.ipMod = dis.direccionIP;
                this.userAgentMod = dis.userAgent;

                if (this.geomMod != "") {
                    this.source.clear();
                    this.map.removeInteraction(this.modifyInteraction);
                    this.map.removeInteraction(this.selectInteraction);
                    this.map.removeLayer(this.vectorLayerMod);
                    this.geomMod = "";
                }

                this.point_feature = new ol.Feature({});
                var point_geom = new ol.geom.Point(dis.ubicacion);
                this.point_feature.setGeometry(point_geom);
                this.vectorLayerMod = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: [this.point_feature]
                    }),
                    style: new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 7,
                            fill: new ol.style.Fill({
                                color: 'orange'
                            })
                        })
                    })
                });
                this.map.addLayer(this.vectorLayerMod);

                this.geomMod = dis.ubicacion;
            }
        }
    }

    borrarMapa(comp: any) {
        this.map.removeInteraction(this.draw);
        //console.log(this.geomMod);
        if (this.geom != "") {
            this.source.clear();
            this.geom = "";
            this.geomMod = "";
        } else if (this.geomMod != "") {
            this.map.removeInteraction(this.modifyInteraction);
            this.map.removeInteraction(this.selectInteraction);
            this.map.removeLayer(this.vectorLayerMod);
            this.geomMod = "";
            this.geom = "";
        }
        this.tipoGuardar = comp;
        if (comp === "quitar") {
            document.getElementById("mapBtn").style.display = "none";
        } else {
            document.getElementById("mapBtn").style.display = "block";
        }
    }

    deleteDis() {
        this.dispositivos.deleteDis(this.selectBorrar).subscribe(
            (data: Response) => { this.cargarTipos(); console.log(data); },
            responseError => { console.log(responseError); },
            () => console.log("Tipo de fuente de datos eliminado")
        );
    }

    //mostrarMensajeExito() {
    //    document.getElementById("message").style.display = "block";
    //    document.getElementById("loading").style.display = "none";
    //    document.getElementById("success").style.display = "block";
    //    document.getElementById("error").style.display = "none";
    //    document.getElementById("dispositivoModificado").style.display = "none";
    //    document.getElementById("dispositivoElimiando").style.display = "none";
    //    document.getElementById("confirmation").style.display = "none";
    //}

    //mostrarMensajeError() {
    //    document.getElementById("message").style.display = "block";
    //    document.getElementById("loading").style.display = "none";
    //    document.getElementById("success").style.display = "none";
    //    document.getElementById("error").style.display = "block";
    //    document.getElementById("confirmation").style.display = "none";
    //    document.getElementById("dispositivoModificado").style.display = "none";
    //    document.getElementById("dispositivoElimiando").style.display = "none";
    //}

    //mostrarMensajeLoading() {
    //    document.getElementById("message").style.display = "block";
    //    document.getElementById("loading").style.display = "block";
    //    document.getElementById("success").style.display = "none";
    //    document.getElementById("error").style.display = "none";
    //    document.getElementById("dispositivoModificado").style.display = "none";
    //    document.getElementById("dispositivoElimiando").style.display = "none";
    //    document.getElementById("confirmation").style.display = "none";
    //}

    //mostrarMensajeConfirmacion() {
    //    document.getElementById("message").style.display = "block";
    //    document.getElementById("loading").style.display = "none";
    //    document.getElementById("success").style.display = "none";
    //    document.getElementById("error").style.display = "none";
    //    document.getElementById("dispositivoModificado").style.display = "none";
    //    document.getElementById("dispositivoElimiando").style.display = "none";
    //    document.getElementById("confirmation").style.display = "block";
    //}

    //mostrarMensajeDispositivoModificado() {
    //    document.getElementById("message").style.display = "block";
    //    document.getElementById("loading").style.display = "none";
    //    document.getElementById("success").style.display = "none";
    //    document.getElementById("error").style.display = "none";
    //    document.getElementById("dispositivoModificado").style.display = "block";
    //    document.getElementById("dispositivoElimiando").style.display = "none";
    //    document.getElementById("confirmation").style.display = "none";
    //}

    //mostrarMensajeDispositivoEliminado() {
    //    document.getElementById("message").style.display = "block";
    //    document.getElementById("loading").style.display = "none";
    //    document.getElementById("success").style.display = "none";
    //    document.getElementById("error").style.display = "none";
    //    document.getElementById("dispositivoModificado").style.display = "none";
    //    document.getElementById("dispositivoElimiando").style.display = "block";
    //    document.getElementById("confirmation").style.display = "none";
    //}

    //ocultarMensajes() {
    //    document.getElementById("message").style.display = "none";
    //    document.getElementById("loading").style.display = "none";
    //    document.getElementById("success").style.display = "none";
    //    document.getElementById("error").style.display = "none";
    //    document.getElementById("dispositivoModificado").style.display = "none";
    //    document.getElementById("dispositivoElimiando").style.display = "none";
    //    document.getElementById("confirmation").style.display = "none";
    //}

}
