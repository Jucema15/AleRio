import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { API_HOST } from '../../../globals/environment';

@Injectable({
  providedIn: 'root',
})
export class ReadingsService {

  constructor(private http: HttpClient) {}
  getReadings() {
    return this.http.get(`${API_HOST}/readings`).pipe(map((res) => res));
  }

  setReadings() {
    return this.http
      .post(`${API_HOST}/readings`, { reading_data: '2222111', sensor_id: 1 })
      .pipe(map((res) => res));
  }

  getLastTenReadings(sensorId:  number) {
    return this.http
      .get(`${API_HOST}/readings/last-ten/${sensorId}`).pipe(map((res) => res));
  }
}
