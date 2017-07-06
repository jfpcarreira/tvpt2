import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  apiDomain = 'http://localhost:3000';

  constructor(
    private http: Http
  ) { }

  registerUser(user) {
    return this.http.post(this.apiDomain + '/authentication/register', user).map(res => res.json());
  }

  checkUsername(username) {
    return this.http.get(this.apiDomain + '/authentication/checkUsername/' + username).map(res => res.json());
  }

  checkEmail(email) {
    return this.http.get(this.apiDomain + '/authentication/checkEmail/' + email).map(res => res.json());
  }
}
