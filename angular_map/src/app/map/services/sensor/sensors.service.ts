import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { API_HOST } from '../../../globals/environment';
@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  constructor(private http: HttpClient) {}
  getTasks() {
    return this.http.get(`${API_HOST}/sensors`).pipe(map((res) => res));
  }
}
