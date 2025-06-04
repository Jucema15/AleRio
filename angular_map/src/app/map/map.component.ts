import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Map, MapStyle, Marker, Popup, config } from '@maptiler/sdk';
import Chart from 'chart.js/auto';

import '@maptiler/sdk/dist/maptiler-sdk.css';
import { SensorsService } from './services/sensor/sensors.service';
import { interval, Subscription } from 'rxjs';
import { mapMarkers, sensorsData } from '../../environments/environment';
import { ReadingsService } from './services/readings/readings.service';
import { SensorPopupComponent } from '../sensor-popup/sensor-popup.component';
import { SubscriptionComponent } from '../subscription/subscription.component';
import { NgIf } from '@angular/common';
import { UserService } from './services/user/user.service'; // Asegúrate de importar el servicio
import { EmailService } from './services/email/email.service'; // Asegúrate de importar el servicio de email

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
  imports: [SensorPopupComponent, SubscriptionComponent, NgIf],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  sensors: Sensor[];
  sensor: string;
  subscription!: Subscription;
  markersCreation!: number;
  markers: any;
  showSubscription = false;

  intervalId: any; //
  alertMonitoringIntervalId: any; // Agrega esta propiedad para el intervalo

  constructor(
    private sensorService: SensorsService,
    private readingsService: ReadingsService,
    private userService: UserService, // <-- Agrega esto
    private emailService: EmailService // <-- Agrega esto
  ) {
    this.sensors = [];
    this.sensor = '';
    mapMarkers;
    this.markers = []
  }

  map: Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    config.apiKey = 'mdq66yB7LoGC4kpEy9Nx';

    // Primero carga los sensores y actualiza this.markers
    this.sensorService.getTasks().subscribe((data) => {
      this.sensors = data as Sensor[];
      this.markers = this.sensors;

      this.createMarkers();
    });

    this.intervalId = setInterval(() => {
      this.updateMarkersState();
    }, 5000);

    // Ejecuta alertMonitoring periódicamente cada 10 segundos (ajusta el tiempo si lo deseas)
    this.alertMonitoringIntervalId = setInterval(() => {
      this.alertMonitoring();
    }, 5000);
  }

  ngAfterViewInit() {
    const initialState = { lng: -76.5225, lat: 3.43722, zoom: 11 };
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });
  }

  createMarkers() {
    let mark;
    let tamaño;
    if (mapMarkers.length !== 0) {
      tamaño = mapMarkers.length;
      for (let j = 0; j < tamaño; j++) {
        mark = document.getElementsByClassName('maplibregl-marker')[j];
        if (mark !== undefined) {
          mark.remove();
        }
        mapMarkers[j].remove();
      }
    }

    // Usa los datos ya cargados en this.sensors
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

      this.readingsService.getLastTenReadings(element.id).subscribe((readings: Object) => {
        const readingsArray = readings as any[];
        let growthRate;
        const popupId = `chart-popup-${element.id}`;
        if (readingsArray.length !== 0) {
          growthRate = Number((readingsArray[readingsArray.length-1].reading_data - readingsArray[1].reading_data) / readingsArray[readingsArray.length-1].reading_data * 100).toFixed(2)
        }else{
          growthRate = 0;
        }
        const marker = new Marker({ color: status })
          .setLngLat([element.lng, element.lat])
          .setPopup(
            new Popup().setHTML(
              `
              <h3>${element.name}</h3>
              <table>
                <tr><th>Estado</th><td>${element.state}</td></tr>
                <tr><th>Umbral Rojo</th><td>${element.red_umbral}</td></tr>
                <tr><th>Umbral Amarillo</th><td>${element.yellow_umbral}</td></tr>
                <tr><th>Umbral Verde</th><td>${element.green_umbral}</td></tr>
                <tr><th>Tasa de crecimiento</th><td class="growth-rate">
                  ${growthRate}%
                </td></tr>
              </table>
              <div style="width:250px;height:150px">
                <canvas id="${popupId}"></canvas>
              </div>
              `,
            ),
          )
          .addTo(this.map);

        marker.addClassName('' + element.id);
        mapMarkers.push(marker);
        // Dibuja el gráfico cuando el popup se abra
        marker.getPopup().on('open', () => {
          setTimeout(() => { // Espera a que el DOM esté listo
            this.renderChartJsLine(popupId, readingsArray);
          }, 100);
        });
      });
    }
  }


  ngOnDestroy() {
    this.map?.remove();
    this.subscription && this.subscription.unsubscribe();
    clearInterval(this.intervalId);
    clearInterval(this.alertMonitoringIntervalId); // Limpia el intervalo de alertMonitoring
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
      this.markers = sensorsData;
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

  renderChartJsLine(canvasId: string, readings: any[]) {
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!ctx) return;

    const graphicParent = ctx.parentElement;

    // Ajusta estos campos según tu modelo de readings
    const labels = readings.map(r => r.reading_date);
    const data = readings.map(r => r.reading_data);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Lecturas',
          data,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          tension: 0.3,
          fill: true,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { display: true, title: { display: true, text: 'Fecha' } },
          y: { display: true, title: { display: true, text: 'Valor' } }
        }
      }
    });
    if (graphicParent) {
      graphicParent.style.width = '370px';
      graphicParent.style.height = '204px';
    }
  }

  showSubscriptionWindow() {
    this.showSubscription = true;
  }

  closeSubscription() {
    this.showSubscription = false;
  }

  // Función que se ejecuta periódicamente
  alertMonitoring() {
    for (let i = 0; i < this.sensors.length; i++) {
      const sensor = this.sensors[i];
      this.readingsService.getLastTenReadings(sensor.id).subscribe((readings: Object) => {
        let reverseArray = readings as any[];
        const readingsArray = reverseArray.reverse();
        if (readingsArray.length > 1) {
          let totalGrowth = 0;
          for (let j = 1; j < readingsArray.length; j++) {
            const prev = readingsArray[j - 1].reading_data;
            const curr = readingsArray[j].reading_data;
            totalGrowth += (curr - prev);
          }
          const avgGrowth = totalGrowth / (readingsArray.length - 1);

          const lastReading = readingsArray[readingsArray.length - 1].reading_data;
          const projectedLevel = lastReading + avgGrowth * 6;

          if (projectedLevel >= sensor.red_umbral) {
            this.userService.getAllByComunicationDir(sensor.id).subscribe((usersObj: Object) => {
              const users = usersObj as any[];
              users.forEach(user => {
                if (user.email) {
                  this.emailService.sendEmail(user.email).subscribe({
                    next: () => {
                      console.log(``);
                    },
                    error: (err) => {
                      console.error(``, err);
                    }
                  });
                }
              });
            });
          } 
        } 
      });
    }
  }
}


