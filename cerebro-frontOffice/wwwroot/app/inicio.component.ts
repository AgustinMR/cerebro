import { OnInit, Input, Component } from "@angular/core";
import { Http, HttpModule, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { InicioService } from "./inicio.service";
import { Observable } from "rxjs/Observable";

declare var Pusher: any;
declare var ol: any;

@Component({
    selector: 'my-contact',
    templateUrl: '/partial/InicioComponent',
    providers: [InicioService]
})

export class InicioComponent implements OnInit {

    chat = false;
    agrupacion = false;
    evento = false;
    reporte = false;

    nombre_municipalidad: any = "Mdeo";

    agrupacionAgregada: any;

    source: any;
    map: any;
    point_feature: any;
    vectorLayer: any;

    dispositivos: any;

    constructor(private inicio: InicioService) { }

    ngOnInit() {
        //Inicio MAPA
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
        //Fin MAPA
        this.cargarDispositivos();
    }

    cargarDispositivos() {
        this.inicio.getDispositivos(this.nombre_municipalidad).subscribe(
            (data: Response) => this.dispositivos = data,
            responseError => console.log("Error:  " + responseError),
            () => {
                for (var dis of this.dispositivos) {
                    //Cargar MAPA
                    this.point_feature = new ol.Feature({});
                    var point_geom = new ol.geom.Point(dis.ubicacion);
                    this.point_feature.setGeometry(point_geom);
                    this.vectorLayer = new ol.layer.Vector({
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
                    this.map.addLayer(this.vectorLayer);
                    //Fin cargar MAPA

                    //Inicio subscribe datos enviados
                    var pusher = new Pusher('474881b81d9d92dd2713', { encrypted: true, cluster: "mt1" });
                    var channel = pusher.subscribe(dis.Id);
                    channel.bind('dato-nuevo', function (data: any) {
                        var e = JSON.stringify(data);
                        var x = JSON.parse(e);
                        console.log(x.medida);
                    });
                    //Fin subcribe datos enviados
                }

                var mapa = this.map;
                var disp = this.dispositivos;
                this.map.on("click", function (e: any) {
                    var feature = mapa.forEachFeatureAtPixel(e.pixel,
                        function (feature: any) {
                            return feature;
                        });
                    if (feature) {
                        for (var dis of disp) {
                            if (String(dis.ubicacion) === String(feature.getGeometry().getCoordinates())) {
                                console.log("ID dispositivo: " + dis.Id);
                            }
                        }
                    }
                });
            }
        );
    }

    showChat() {
        this.chat = true;
        this.agrupacion = false;
        this.evento = false;
        this.reporte = false;
    }

    showAgrupacion() {
        this.chat = false;
        this.agrupacion = true;
        this.evento = false;
        this.reporte = false;
    }

}