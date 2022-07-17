import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

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
}
