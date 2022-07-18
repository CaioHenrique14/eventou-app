import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private storage: Storage) {

  }

  get userData(): Promise<User>
{
 return this.storage.get('user') as Promise<User>;
}

  authUser(body) {
    return new Promise((resolve, reject) => {
      this.http.post(`${SERVER_URL}/auth/login`, body).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.http.get(`${SERVER_URL}/user/findAll`).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  update(id) {
    return new Promise((resolve, reject) => {
      this.http.get(`${SERVER_URL}/user/${id}`).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${SERVER_URL}/user/${id}`).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      });
    });
  }

  create(body) {
    return new Promise((resolve, reject) => {
      this.http.post(`${SERVER_URL}/user`, body).subscribe((res: any) => {
        resolve(res);
      }, (err: any) => {
        reject(err);
      });
    });
  }
}
