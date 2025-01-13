import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {
  host = 'http://localhost:3000';

  constructor(private http: HttpClient) {}
  getTasks() {
    return this.http.get(`${this.host}/sensors`).pipe(map((res) => res));
  }
}
