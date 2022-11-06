import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'arcgis';
  public mapData: Array<any> = [];

  public rawData: any = {
    "count": 1334,
    "code": 200,
    "message": "Events retrieved successfully.",
    "data": [
      {
        "timezone": "Asia/Calcutta",
        "meter": {
          "tms": "2022-10-26T18:18:12.000Z",
          "gpsFixStatus": 1,
          "gpsNoOfSatellites": 8,
          "gpsLatDir": 78,
          "gpsLongDir": 69,
          "gpsLatCoordinate": 28.6997857,
          "gpsLongCoordinate": 77.3249884,
          "gpsSpeed": 0,
          "id": "JBT860987051385075",
          "image": "https://source.unsplash.com/random"
        }
      },
      {
        "timezone": "Asia/Calcutta",
        "meter": {
          "tms": "2022-10-26T18:17:42.000Z",
          "gpsFixStatus": 1,
          "gpsNoOfSatellites": 8,
          "gpsLatDir": 78,
          "gpsLongDir": 69,
          "gpsLatCoordinate": 28.613745723706575,
          "gpsLongCoordinate": 77.44369625294655,
          "gpsSpeed": 0,
          "id": "JBT860987051385075",
          "image": "https://source.unsplash.com/random"
        }
      },
      {
        "meter": {
          "tms": "2022-10-26T18:17:12.000Z",
          "gpsFixStatus": 1,
          "gpsNoOfSatellites": 8,
          "gpsLatDir": 78,
          "gpsLongDir": 69,
          "gpsLatCoordinate": 28.620712231478866,
          "gpsLongCoordinate": 77.39360606885236,
          "gpsSpeed": 0,
          "id": "JBT860987051385075",
          "image": "https://source.unsplash.com/random"
        }
      },
      {
        "meter": {
          "tms": "2022-10-26T18:17:12.000Z",
          "gpsFixStatus": 1,
          "gpsNoOfSatellites": 8,
          "gpsLatDir": 78,
          "gpsLongDir": 69,
          "gpsLatCoordinate": 28.618865460865248, 
          "gpsLongCoordinate": 77.24518140576275,
          "gpsSpeed": 0,
          "id": "JBT860987051385075",
          "image": "https://source.unsplash.com/random"
        }
      },
      {
        "meter": {
          "tms": "2022-10-26T18:17:12.000Z",
          "gpsFixStatus": 1,
          "gpsNoOfSatellites": 8,
          "gpsLatDir": 78,
          "gpsLongDir": 69,
          "gpsLatCoordinate": 28.650807869498355,  
          "gpsLongCoordinate":77.34619762275256,
          "gpsSpeed": 0,
          "id": "JBT860987051385075",
          "image": "https://source.unsplash.com/random"
        }
      },
      {
        "meter": {
          "tms": "2022-10-26T18:17:12.000Z",
          "gpsFixStatus": 1,
          "gpsNoOfSatellites": 8,
          "gpsLatDir": 78,
          "gpsLongDir": 69,
          "gpsLatCoordinate": 25.33,  
          "gpsLongCoordinate":84.39,
          "gpsSpeed": 0,
          "id": "JBT860987051385075",
          "image": "https://source.unsplash.com/random"
        }
      },
      {
        "meter": {
          "tms": "2022-10-26T18:17:12.000Z",
          "gpsFixStatus": 1,
          "gpsNoOfSatellites": 8,
          "gpsLatDir": 78,
          "gpsLongDir": 69,
          "gpsLatCoordinate": 25.554451384728765,   
          "gpsLongCoordinate":84.67081619691128,
          "gpsSpeed": 0,
          "id": "JBT860987051385075",
          "image": "https://source.unsplash.com/random"
        }
      },
    ]
  }


  ngOnInit(): void {
    this.mapData = this.rawData.data
    // for (let a of this.rawData.data) {
    //   if (a.meter.gpsLatCoordinate != 0 || a.meter.gpsLongCoordinate != 0) {
    //     this.mapData.push(a.items[0])
    //   }

    // }
  }
}
