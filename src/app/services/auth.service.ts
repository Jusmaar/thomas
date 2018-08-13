import { Injectable } from '@angular/core';
import { HttpService } from './config/http.service';
import { Observable } from 'rxjs';


@Injectable()
export class AuthService {
  constructor(
    private http: HttpService
  ) { }

  login(obj: any): Observable<any> {
    let path = `/api/login`;
    let data = JSON.stringify(obj);
    return this.http.POST(path, data);
  }
  setTokenLS(obj): void {
    localStorage.setItem('user', JSON.stringify(obj));
  }
  islogged(): boolean {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }
  register(obj: any): Observable<any> {
    let path = `/api/register`;
    let data = JSON.stringify(obj);
    return this.http.POST(path, data);
  }
  logout(): boolean {
    if (localStorage.getItem('user')) {
      localStorage.clear();
      return true;
    } else {
      return false;
    }
  }
}
