import { Injectable }       from '@angular/core';
import { HttpClient }       from '@angular/common/http';
import { Observable }       from 'rxjs/Observable';
import { API_URLS }         from '../../environments/environment';
import { IGenericResponse } from '../interfaces/igeneric-response';
import { User }             from '../classes/user';

@Injectable()
export class AuthService {

  private authToken;
  private user;

  constructor(private http: HttpClient) { }

  create(user: User): Observable<IGenericResponse> {
    return this.http.post<IGenericResponse>(API_URLS.AUTH, user);
  }

  checkUsername(username: String): Observable<IGenericResponse> {
    return this.http.get<IGenericResponse>(API_URLS.AUTH + 'checkUsername/' + username);
  }

  checkEmail(email: String): Observable<IGenericResponse> {
    return this.http.get<IGenericResponse>(API_URLS.AUTH + 'checkEmail/' + email);
  }

  login(user) {
    return this.http.post<IGenericResponse>(API_URLS.AUTH + 'login', user);
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
}
