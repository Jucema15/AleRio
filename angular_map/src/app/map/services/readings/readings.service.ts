import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReadingsService {
  host = 'http://localhost:3000';

  constructor(private http: HttpClient) {}
  getReadings() {
    return this.http.get(`${this.host}/readings`).pipe(map((res) => res));
  }

  setReadings() {
    return this.http
      .post(`${this.host}/readings`, { reading_data: '2222111', sensor_id: 1 })
      .pipe(map((res) => res));
  }
}
