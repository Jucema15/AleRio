import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Map, MapStyle, Marker, Popup, config } from '@maptiler/sdk';

import '@maptiler/sdk/dist/maptiler-sdk.css';
import { SensorsService } from './services/sensor/sensors.service';
import { interval, Subscription } from 'rxjs';
import { mapMarkers, sensorsData } from '../../environments/environment';
import { ReadingsService } from './services/readings/readings.service';
import { SensorPopupComponent } from '../sensor-popup/sensor-popup.component';
interface Sensor {
  id: number;
  name: string;
  lat: number;
  lng: number;
  state: string;
  red_umbral: number;
  yellow_umbral: number;
  green_umbral: number;
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [SensorPopupComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  sensors: Sensor[];
  sensor: string;
  subscription!: Subscription;
  markersCreation!: number;
  markers: any;

  intervalId: any; //

  constructor(
    private sensorService: SensorsService,
    private readingsService: ReadingsService,
  ) {
    this.sensors = [];
    this.sensor = '';
    mapMarkers;
    this.markers = [
      {
        "id": 1,
        "name": "Rio Cali",
        "lat": "3.503517000",
        "lng": "-76.491614000",
        "state": "yellow",
        "red_umbral": "30.00",
        "yellow_umbral": "20.20",
        "green_umbral": "10.00"
    },
    {
        "id": 2,
        "name": "Rio pance",
        "lat": "3.403517000",
        "lng": "-76.491614000",
        "state": "yellow",
        "red_umbral": "30.00",
        "yellow_umbral": "20.20",
        "green_umbral": "10.00"
    }]
  }

  map: Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    config.apiKey = 'mdq66yB7LoGC4kpEy9Nx';
    this.createMarkers();

    // Ejecutar updateMarkersState cada cinco segundos (5000 ms)
    this.intervalId = setInterval(() => {
      this.updateMarkersState();
    }, 5000);
  }

  ngAfterViewInit() {
    const initialState = { lng: -76.5225, lat: 3.43722, zoom: 11 };
    console.log('Checkpoint');
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });
  }

  createMarkers() {
/*     debugger;
 */ let mark;
    let tamaño;
    if (mapMarkers.length !== 0) {
      /* mapMarkers.splice(0, 5); */
      tamaño = mapMarkers.length;
      for (let j = 0; j < tamaño; j++) {
/*         debugger;
 */        mark = document.getElementsByClassName('maplibregl-marker')[j];
        if (mark !== undefined) {
          mark.remove();
        }
        mapMarkers[j].remove();
      }
    }

    const sensor = this.sensorService.getTasks().subscribe((data) => {
      sensorsData.push(data);
      console.log('sensorsData');
      console.log(sensorsData);

      this.sensors = data as Sensor[];
      for (let index = 0; index < this.sensors.length; index++) {
        const element = this.sensors[index];
        let status = '';

        if (element.state === 'green') {
          status = '#5cc433';
        } else if (element.state === 'yellow') {
          status = '#ebdd46';
        } else if (element.state === 'red') {
          status = '#ff0000';
        }
        const marker = new Marker({ color: status })
          .setLngLat([element.lng, element.lat])
          .setPopup(
            new Popup().setHTML(
              `
              <h3>Nombre: Rio Cali</h3>
              <h4>Último registro: ${24 + index} cm sobre el umbral</h4>
              <app-sensor-popup
                [sensorId]="${element.id}"
                [sensorName]="${element.name}"
                [sensorState]="${element.state}"
                [sensorRedUmbral]="${element.red_umbral}"
                [sensorYellowUmbral]="${element.yellow_umbral}"
                [sensorGreenUmbral]="${element.green_umbral}"
              ></app-sensor-popup>
              `,
            ),
          )
          .addTo(this.map);

        marker.addClassName('' + element.id);
        mapMarkers.push(marker);
        marker.on('mouseenter', function () {
/*           debugger;
 */          console.log('popup was opened');
        });
      }
    });
    console.log('this.sensors');
    console.log(mapMarkers);
  }

  //Función para insertar datos artificiales a la base de datos
  /* createReading() {
    console.log('Creating readings');
    const reading = this.readingsService.setReadings().subscribe(() => {});
  } */

  ngOnDestroy() {
    this.map?.remove();
    this.subscription && this.subscription.unsubscribe();

  }

  mapTravel(opt){
    opt = opt.target.value - 1;
    let lat = parseFloat(this.markers[opt].lat)
    let lng = parseFloat(this.markers[opt].lng)
    this.map?.flyTo({
      center: [lng, lat],
      zoom: 13,
      speed: 0.2,
      easing(t) {
        return t;
      }
    })
  }

  updateMarkersState() {
    this.sensorService.getTasks().subscribe((data: Object) => {
      const sensorsData = data as Sensor[];
      console.log('ACTUALIZANDO  ESTADOS DE LOS MARCADORES');
      for (let i = 0; i < this.sensors.length; i++) {
        const sensor = this.sensors[i];
        const updated = sensorsData.find(s => s.id === sensor.id);
        if (updated) {
          sensor.state = updated.state;
          let color = '';
          if (sensor.state === 'green') {
            color = '#5cc433';
          } else if (sensor.state === 'yellow') {
            color = '#ebdd46';
          } else if (sensor.state === 'red') {
            color = '#ff0000';
          }
          if (mapMarkers[i]) {
            mapMarkers[i].getElement().getElementsByTagName("g")[2].attributes[0].value = color;
          }
        }
      }
    });
  }
}


