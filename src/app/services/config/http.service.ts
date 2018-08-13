
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CONFIGPROD } from '../config/api-url.constant';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient) { }
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  url = CONFIGPROD.url;

	GET(method) {
		return this._http.get(this.url + method, this.options)
	}

	POST(method, body) {
		return this._http.post(this.url + method, body, this.options)
	}

	PUT(method, body) {
		return this._http.put(this.url + method, body, this.options)
	}

	DELETE(method) {
		return this._http.delete(this.url + method, this.options)
	}


	private handleError(error: HttpErrorResponse) {
	
	};
}
