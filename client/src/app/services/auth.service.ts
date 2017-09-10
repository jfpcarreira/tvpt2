import { Injectable }       from '@angular/core';
import { HttpClient }       from '@angular/common/http';
import { Observable }       from 'rxjs/Observable';
import { API_URLS }         from '../../environments/environment';
import { IGenericResponse } from '../interfaces';
import { User }             from '../classes';

@Injectable()
export class AuthService {

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
}
