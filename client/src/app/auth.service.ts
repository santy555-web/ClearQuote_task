import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(public http: HttpClient) {

  }

  login(user, callback) {
    var header = '';
    var url = 'http://localhost:8080/login';
    this.http.post(url, user, {}).subscribe((data: any) => {
     // debugger
      if (data.status) {
        localStorage.setItem('token', data.token);
        callback(true)
      } else {
        callback(false)
      }
    }, err => {
     // debugger
      callback(false)
    });
  }

  register(user, callback) {
    var header = '';
    var url = 'http://localhost:8080/register';
    this.http.post(url, user, {}).subscribe((data: any) => {
     // debugger
      if (data.status) {
        callback(true)
      } else {
        callback(false)
      }
    }, err => {
    //  debugger
      callback(false)
    });
  }

  isAuth() {
    return true;
  }
}
