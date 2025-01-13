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
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  sensors: Sensor[];
  sensor: string;
  subscription!: Subscription;
  markersCreation!: number;

  constructor(
    private sensorService: SensorsService,
    private readingsService: ReadingsService,
  ) {
    this.sensors = [];
    this.sensor = '';
    mapMarkers;
  }

  map: Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    config.apiKey = 'mdq66yB7LoGC4kpEy9Nx';
    const source = interval(10000);
    this.subscription = source.subscribe((val) => this.createMarkers());
    this.subscription = source.subscribe((val) => this.createReading());
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
    if (mapMarkers.length !== 0) {
      mapMarkers.splice(0, 5);
      for (let j = 0; j < mapMarkers.length; j++) {
        mapMarkers[j].remove();
      }
    }

    const sensor = this.sensorService.getTasks().subscribe((data) => {
      sensorsData.push(data);
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
              <h4>Último registro: ${24 + index} cm sobre el umbral</h4> `,
            ),
          )
          .addTo(this.map);

        marker.addClassName('' + element.id);
        mapMarkers.push(marker);
        marker.on('mouseenter', function () {
          debugger;
          console.log('popup was opened');
        });
      }
    });
    console.log('this.sensors');
    console.log(mapMarkers);
  }

  createReading() {
    console.log('Creating readings')
    const reading = this.readingsService.setReadings().subscribe(() => {});
  }

  ngOnDestroy() {
    this.map?.remove();
    this.subscription && this.subscription.unsubscribe();
  }
}
