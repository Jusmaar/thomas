import { Injectable } from '@angular/core';
import { HttpService } from './config/http.service';
import { Observable } from 'rxjs';


@Injectable()
export class UserService {
  constructor(
    private http: HttpService
  ) { }

  getUsers(): Observable<any> {
    let path = `/api/users?page=1`;
    return this.http.GET(path);
  }
  createUser(obj: any): Observable<any> {
    let path = `/api/users`;
    let data = JSON.stringify(obj);
    return this.http.POST(path, data);
  }
  deleteUser(id): Observable<any> {
    let path = `/api/users/${id}`;
    return this.http.DELETE(path);
  }
  updateUser(obj: any, id: any): Observable<any> {
    let path = `/api/users/${id}`;
    let data = JSON.stringify(obj);
    return this.http.PUT(path, data);
  }
}
