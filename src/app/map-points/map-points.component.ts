import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { loadModules } from "esri-loader";
import * as moment from 'moment';

@Component({
  selector: 'app-map-points',
  templateUrl: './map-points.component.html',
  styleUrls: ['./map-points.component.css']
})
export class MapPointsComponent implements OnInit {
  @Input() dataObj: Array<any> = [];
  @Input() mapData: any;
  public zoomLevel: any;
  public isLoading = false;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes)
    if (changes) {
      if (changes?.['mapData'] && changes?.['mapData']?.currentValue) {
        this.dataObj = changes?.['mapData']?.currentValue;
      }
    }
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.dataObj ? this.loadmap() : '';
    }, 2000)
  }
  loadmap() {
    this.isLoading = true;
    console.log(this.dataObj);
    loadModules([
      "esri/Map",
      "esri/layers/FeatureLayer",
      "esri/views/MapView",
      "esri/widgets/BasemapToggle",
      "esri/Graphic",
      "esri/rest/locator",
      "esri/geometry/Point",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/symbols/SimpleLineSymbol",
      "esri/symbols/SimpleFillSymbol",
      "esri/geometry/Polyline",
      "esri/geometry/support/webMercatorUtils",
      "dojo/domReady!"
    ]).then(([Map, FeatureLayer, MapView, BasemapToggle, Graphic, locator, Point, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Polyline, webMercatorUtils]) => {
      const locatorUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";

      const map = new Map({
        basemap: "topo-vector"
      });
      const view = new MapView({
        center: [-7125.40, 16.64],
        container: "viewDiv",
        map: map,
        zoom: 5
      });
      let lineTrails: any = [];
      for (let i = 0; i < this.dataObj?.length; i++) {

        let Point = {
          type: "point",
          latitude: this.dataObj[i]?.meter?.gpsLatCoordinate,
          longitude: this.dataObj[i]?.meter?.gpsLongCoordinate,
        };
        var symbol = new SimpleMarkerSymbol({
          // "type": "picture-marker",
          style: "path",
          color: "#00FF00",
          size: "38px", // pixels,
          path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
          outline: { // autocasts as esri/symbols/SimpleLineSymbol
            // color: '#E3528C',
            width: 1 // points
          }
        });
        lineTrails.push([this.dataObj[i]?.meter?.gpsLongCoordinate, this.dataObj[i]?.meter?.gpsLatCoordinate,])
        const simpleMarkerSymbol = {
          type: "simple-marker",
          color: [226, 119, 40],  // Orange
          outline: {
            color: [255, 255, 255], // White
            width: 1
          }
        };
        const pointGraphic = new Graphic({
          geometry: Point,
          symbol: simpleMarkerSymbol,
          attributes: this.dataObj[i],
        });
        view.graphics.add(pointGraphic);


      }
      const polyline = {
        type: "polyline",
        paths: lineTrails
      };
      const simpleLineSymbol = {
        type: "simple-line",
        color: [226, 119, 40], // Orange
        width: 2
      };

      const polylineGraphic = new Graphic({
        geometry: polyline,
        symbol: simpleLineSymbol
      });
      view.graphics.add(polylineGraphic);


      let point = new Point({
        latitude: this.dataObj[0]?.meter?.gpsLatCoordinate,
        longitude: this.dataObj[0]?.meter?.gpsLongCoordinate
      });
      let opts = {
        duration: 1000  // Duration of animation will be 5 seconds
      };
      view.when().then(() => {
        this.isLoading = false;
        /** To Center and Zoom In to Last Data point */
        view.goTo({
          target: point,
          zoom: 10
        }, opts)
        /** To Center and Zoom In to Last Data point */
      }).catch(function (err: any) {
        console.error("MapView rejected:", err);
      })
      view.popup.autoOpenEnabled = false;
      view.popup.collapseEnabled = false;
      view.on("click", (event: { screenPoint: any; mapPoint: { latitude: number; longitude: number; }; }) => {
        view.hitTest(event.screenPoint).then(
          function (response: { results: string | any[]; }) {
            if (response?.results?.length) {
              var graphic = response?.results[0]?.graphic;
              // console.log(graphic);
              if (graphic && graphic?.attributes?.meter?.hasOwnProperty('tms')) {
                let tmsValue = moment.utc(graphic?.meter?.attributes.tms).local().format('DD-MM-YYYY h:mm:ss A')
                const lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
                const lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
                view.popup.open({
                  title: "BMS Asset Location",
                  location: event.mapPoint
                });
                let url: string;
                if (window.location.hostname == 'localhost') {
                  url = 'http://localhost:' + window.location.port + '/#';
                }
                else {
                  url = window.location.protocol + '//' + window.location.hostname + '/dm/#';
                }
                // console.log("hostname url =====>>>>>", url);

                const params = {
                  location: event.mapPoint
                };
                locator.locationToAddress(locatorUrl, params).then((response: { address: string; }) => {
                  view.popup.content = '<table class="esri-widget__table">' +
                    '<tr>' +
                    '<th class="esri-feature__field-header">' + "Asset Name/Id" + '</th>' +
                    '<td class="esri-feature__field-data">' +
                    `<span><a href='${(url + '/device/' + graphic.attributes.id)}'>
                    ${graphic.attributes.meter.did}</a></span>` +
                    '</td>' +
                    // '<td class="esri-feature__field-data">' + `<span><a href='${(window.location.hostname + ':4400/#/device/' + graphic.attributes.device)}'>${graphic.attributes.did}</a></span>` + '</td>' +
                    '<tr>' +
                    '<th class="esri-feature__field-header">' + "Date/Time" + '</th>' +
                    '<td class="esri-feature__field-data">' + tmsValue + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th class="esri-feature__field-header">' + "Address" + '</th>' +
                    '<td class="esri-feature__field-data">' + response.address + ' </td>' +
                    '</tr>' +
                    '<th class="esri-feature__field-header">' + "Image" + '</th>' +
                    '<td>' + `<img src=${graphic.attributes.meter.image} width="100" height="100"/>` + '</td>' +
                    // '<td class="esri-feature__field-data">' + graphic.attributes.meter.image + ' </td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th class="esri-feature__field-header">' + "Latitude/Longitude" + '</th>' +
                    '<td class="esri-feature__field-data">' + lat + "/" + lon + '</td>' +
                    '</tr>' +
                    '</table>'
                }).catch((e: any) => {
                  console.log(e);
                  view.popup.content = "No address was found for this location";
                });
              } else {
                view.popup.close()
              }
            }
          });
      });

    });

  }
}
