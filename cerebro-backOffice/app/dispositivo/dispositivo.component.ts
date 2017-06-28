import { Component, OnInit } from '@angular/core';
import { FuenteDeDatoService } from './dispositivo.service';
import { Http, HttpModule, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var ol: any;
declare var $: any;
declare var jsts: any;

@Component({
    selector: 'cerebro-dispositivo',
    templateUrl: 'dispositivo.component.html',
    styleUrls: ['dispositivo.component.css'],
    moduleId: module.id,
    providers: [FuenteDeDatoService]
})
export class FuenteDeDatoComponent implements OnInit {

    nombre_municipalidad: any = "";
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
    privilegios: any;

    munis: any;
    featureMuni: any;

    tipoDeFuneteDeDatoSelect = "";
    tipoDeFuneteDeDatoSelectMod = "";
    selectBorrar = "";
    ipNew = "";
    userAgentNew = "";
    privilegioSelect = "";
    privilegioSelectMod = "";

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

        var muniL = window.location.toString().split("/")[2].split(".")[1].split("");
        this.nombre_municipalidad = muniL[0].toUpperCase();
        for (var h = 1; h < muniL.length; h++) {
            this.nombre_municipalidad += muniL[h];
        }

        var raster = new ol.layer.Tile({ source: new ol.source.OSM() });
        this.source = new ol.source.Vector({ wrapX: false });
        var vector = new ol.layer.Vector({
            source: this.source,
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 6,
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
            var format = new ol.format.GeoJSON();
            var geojsonReader = new jsts.io.GeoJSONReader();

            var polygon1Jsts = geojsonReader.read(
                format.writeFeatureObject(this.featureMuni)).geometry;
            var polygon2Jsts = geojsonReader.read(
                format.writeFeatureObject(evt.feature)).geometry;

            if (polygon1Jsts.contains(polygon2Jsts)) {
                this.geom = evt.feature.getGeometry().getCoordinates();
                this.geomMod = evt.feature.getGeometry().getCoordinates();
                this.map.removeInteraction(this.draw);
            } else {
                this.mostrarMensajeErrorMapa();
                this.map.removeInteraction(this.draw);
                this.geom = "";
                this.geomMod = "";
                this.source.clear();
            }            
        }, this);
        this.cargarTipos();

        this.cargarMapaMuni();
    }

    cargarTipos() {
        this.dispositivos.obtenerTipos(this.nombre_municipalidad).subscribe(
            (data: Response) => {
                this.tipoDeFuneteDeDato = data;
                this.cargarDispositivos();
                this.cargarPrivilegios();
            },
            responseError => console.log(responseError),
            () => console.log("Tipos de fuentes de datos cargadas")
        );
    }

    cargarMapaMuni() {
        this.dispositivos.obtenerMunis().subscribe(
            (data: Response) => {
                this.munis = data;
                for (var muni of this.munis) {
                    if (muni.nombre == this.nombre_municipalidad) {
                        //alert(muni.nombre);
                        var tmp = muni.ubicacion.toString().split(",");
                        var array = [];

                        var j = 0;
                        for (var i = 0; i < (tmp.length / 2); i++) {
                            var arraryTmp = [];
                            arraryTmp[0] = tmp[j]
                            arraryTmp[1] = tmp[j + 1];
                            array[i] = arraryTmp;
                            j++;
                            j++;
                        }
                        var polygon = new ol.geom.Polygon([array]);
                        var feature = new ol.Feature(polygon);
                        this.featureMuni = feature;
                        var vectorSource = new ol.source.Vector();
                        vectorSource.addFeature(feature);

                        var vector_layer = new ol.layer.Vector({
                            source: vectorSource
                        });
                        this.map.addLayer(vector_layer);
                    }
                }
            },
            responseError => console.log(responseError),
            () => { }
        );
    }

    cargarDispositivos() {
        this.dispositivos.obtenerDis(this.nombre_municipalidad).subscribe(
            (data: Response) => {
                this.dispositivosMod = data;
            },
            responseError => console.log(responseError),
            () => console.log("Fuentes de datos cargadas")
        );
    }

    cargarPrivilegios() {
        this.dispositivos.obtenerPrivilegios(this.nombre_municipalidad).subscribe(
            (data: Response) => {
                this.privilegios = data;
            },
            responseError => console.log(responseError),
            () => console.log("Privilegios cargados")
        );
    }

    nuevoPunto() {
        //if ($('#sumulado').is(':checked')) {
        //    alert('checked');
        //}
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
            var userAgent = this.userAgentNew;
            var ipNew = this.ipNew;
            if (this.tipoDeFuneteDeDatoSelect != "" && this.nombreNew != "" && this.geom != "" && this.privilegioSelect != "") {
                this.dispositivos.agregarFuente(ipNew, userAgent, this.tipoDeFuneteDeDatoSelect, this.geom, this.nombre_municipalidad, this.nombreNew, this.privilegioSelect).subscribe(
                    (data: Response) => {
                        this.ipNew = "";
                        this.userAgentNew = "";
                        this.tipoDeFuneteDeDatoSelect = "";
                        this.nombreNew = "";
                        this.source.clear();
                        this.cargarTipos();
                        this.mostrarMensajeExito();
                    },
                    responseError => console.log(responseError),
                    () => console.log("Tipos de fuentes de datos cargadas")
                );
            }
        } else if (this.tipoGuardar == "modificar") {
            var userAgentMod = this.userAgentMod;
            var ipMod = this.ipMod;
            if (this.geomMod != "") {
                this.dispositivos.modificarFuente(ipMod, userAgentMod, this.geomMod, this.tipoDeFuneteDeDatoSelectMod, this.privilegioSelectMod, this.nombreMod).subscribe(
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
                        this.mostrarMensajeDispositivoModificado();
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
                this.ipMod = dis.direccionIP;
                this.userAgentMod = dis.userAgent;
                this.nombreMod = dis.nombre;
                $('#privilegiosSelectMod').dropdown('set selected', dis.privilegios);
                $('#privilegiosSelectMod').dropdown('refresh');

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
                            radius: 6,
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
            document.getElementById("o1").style.display = "none";
            document.getElementById("o2").style.display = "none";
        } else {
            document.getElementById("o1").style.display = "block";
            document.getElementById("o2").style.display = "block";
        }
    }

    deleteDis() {
        this.dispositivos.deleteDis(this.selectBorrar).subscribe(
            (data: Response) => {
                this.cargarTipos();
                console.log(data);
                this.mostrarMensajeDispositivoEliminado();
            },
            responseError => { console.log(responseError); },
            () => console.log("Tipo de fuente de datos eliminado")
        );
    }

    mostrarMensajeExito() {
        document.getElementById("dimmer").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "block";
        document.getElementById("error").style.display = "none";
        document.getElementById("errorMapa").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "none";
        document.getElementById("dispositivoEliminado").style.display = "none";
        document.getElementById("warning").style.display = "none";
    }

    mostrarMensajeError() {
        document.getElementById("dimmer").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "block";
        document.getElementById("errorMapa").style.display = "none";
        document.getElementById("warning").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "none";
        document.getElementById("dispositivoEliminado").style.display = "none";
    }

    mostrarMensajeLoading() {
        document.getElementById("dimmer").style.display = "block";
        document.getElementById("loading").style.display = "block";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("errorMapa").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "none";
        document.getElementById("dispositivoEliminado").style.display = "none";
        document.getElementById("warning").style.display = "none";
    }

    mostrarMensajeWarning() {
        document.getElementById("dimmer").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("errorMapa").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "none";
        document.getElementById("dispositivoEliminado").style.display = "none";
        document.getElementById("warning").style.display = "block";
    }

    mostrarMensajeDispositivoModificado() {
        document.getElementById("dimmer").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("errorMapa").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "block";
        document.getElementById("dispositivoEliminado").style.display = "none";
        document.getElementById("warning").style.display = "none";
    }

    mostrarMensajeDispositivoEliminado() {
        document.getElementById("dimmer").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("errorMapa").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "none";
        document.getElementById("dispositivoEliminado").style.display = "block";
        document.getElementById("warning").style.display = "none";
    }

    mostrarMensajeErrorMapa() {
        document.getElementById("dimmer").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("errorMapa").style.display = "block";
        document.getElementById("dispositivoModificado").style.display = "none";
        document.getElementById("dispositivoEliminado").style.display = "none";
        document.getElementById("warning").style.display = "none";
    }

    ocultarMensajes() {
        document.getElementById("dimmer").style.display = "none";
        document.getElementById("loading").style.display = "none";
        document.getElementById("success").style.display = "none";
        document.getElementById("error").style.display = "none";
        document.getElementById("errorMapa").style.display = "none";
        document.getElementById("dispositivoModificado").style.display = "none";
        document.getElementById("dispositivoEliminado").style.display = "none";
        document.getElementById("warning").style.display = "none";
    }

}
