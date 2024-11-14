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
import { SensorsService } from '../sensors.service';

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

  constructor(private sensorService: SensorsService) {
    this.sensors = [];
    this.sensor = '';
  }

  map: Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    config.apiKey = 'mdq66yB7LoGC4kpEy9Nx';

    const sensorss = this.sensorService.getTasks().subscribe((data) => {
      console.log(data);
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
        console.log(element);
        const marker = new Marker({ color: status })
          .setLngLat([element.lng, element.lat])
          .setPopup(
            new Popup().setHTML(
              `<h4>Último registro: ${24 + index} cm sobre el umbral</h4> `,
            ),
          )
          .addTo(this.map);

        marker.addClassName('' + element.id);
        marker.on('mouseenter', function () {
          debugger;
          console.log('popup was opened');
        });
      }
      return data;
    });
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

  ngOnDestroy() {
    this.map?.remove();
  }
}
