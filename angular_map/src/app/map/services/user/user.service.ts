import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { API_HOST } from '../../../globals/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private generateRandomUsername(length: number = 10): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let username = '';
    for (let i = 0; i < length; i++) {
      username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return username;
  }

  setUser(comunication_dir: number, email: string) {
    const randomUsername = this.generateRandomUsername();
    return this.http
      .post(`${API_HOST}/users`, { 
        username: randomUsername,
        password: 'asdASKMdOAnfgaoiwne12alksfnalskfd',
        comunication_option: 'email',
        comunication_dir,
        email,
      })
      .pipe(map((res) => res));
  }

  getOneUser(comunication_dir: number, email: string) {
    return this.http
      .get(`${API_HOST}/users/find-by-email-comunication`, {
        params: {
          email,
          comunication_dir: comunication_dir.toString()
        }
      })
      .pipe(map((res) => res));
  }

  deleteUser(userId: number) {
    return this.http
      .delete(`${API_HOST}/users/${userId}`)
      .pipe(map((res) => res));
  }

  getAllByComunicationDir(comunication_dir: number) {
    return this.http
      .get(`${API_HOST}/users/find-all-by-comunication`, {
        params: {
          comunication_dir: comunication_dir.toString()
        }
      })
      .pipe(map((res) => res));
  }
}
