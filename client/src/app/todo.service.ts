import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TodoService {
  headers: any;
  constructor(public http: HttpClient) {

  }

  public getToken() {
      return localStorage.getItem('token');
  }

  public getAuthHeader() {
    return  {headers: new  HttpHeaders({ Authorization: `${this.getToken()}` } )};
  }

  getTodos (callback) {
    this.http.get('http://localhost:8080/emp',this.getAuthHeader()).subscribe(data=> {
      callback(data);
    }, err=> {
      console.log(err);
    });
  }

  createTodo(emp, callback) {
 //   debugger
    this.http.post('http://localhost:8080/emp',emp, this.getAuthHeader()).subscribe(data=> {
   //   debugger
      callback(data);
    }, err=> {
    //  debugger
      console.log(err);
    });
  }

  updateTodo(id, callback) {
    this.http.put(`http://localhost:8080/emp/${id}`, {}, {}).subscribe(data=> {
      callback(data);
    }, err=> {
      console.log(err);
    });
  }

  deleteTodo(id, callback) {
    this.http.delete(`http://localhost:8080/emp/${id}`,this.getAuthHeader()).subscribe(data=> {
      callback(data);
    }, err=> {
      console.log(err);
    });
  }
}
