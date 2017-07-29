import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(
    private http: Http
  ) { }

  registerUser(user) {
    return this.http.post(environment.API_DOMAIN + '/authentication/register', user).map(res => res.json());
  }

  checkUsername(username) {
    return this.http.get(environment.API_DOMAIN + '/authentication/checkUsername/' + username).map(res => res.json());
  }

  checkEmail(email) {
    return this.http.get(environment.API_DOMAIN + '/authentication/checkEmail/' + email).map(res => res.json());
  }
}
