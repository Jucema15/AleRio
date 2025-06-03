import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { API_HOST } from '../../../globals/environment';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) {}
  sendEmail(to: string) {
    return this.http.post(`${API_HOST}/email/send`,
      {
        to,
        subject: "Alerta en el río ",
        text: "El rio está creciendo de forma constante y se calcula que en una hora llegara a niveles peligroso para las persona cercanas a la zona"
      }
    ).pipe(map((res) => res));
  }
}
