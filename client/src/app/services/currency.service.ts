import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { API_URLS }   from '../../environments/environment';
import { ICurrency, ICurrencyResponse, ICurrenciesResponse, IGenericResponse } from '../interfaces';
import { Currency }   from '../classes';

@Injectable()
export class CurrencyService {

  constructor(private http: HttpClient) { }

  get(id: String): Observable<ICurrencyResponse> {
    return this.http.get<ICurrencyResponse>(API_URLS.CURRENCY + id).map(res => {
      res.result = new Currency(<ICurrency> res.result);
      return res;
    });
  }

  getAll(): Observable<ICurrenciesResponse> {
    return this.http.get<ICurrenciesResponse>(API_URLS.CURRENCY).map(res => {
      res.result = res.result.map(curr => new Currency(curr));
      return res;
    });
  }

  create(currency: Currency): Observable<IGenericResponse> {
    return this.http.post<IGenericResponse>(API_URLS.CURRENCY, currency);
  }

  update(currency: Currency): Observable<IGenericResponse> {
    return this.http.put<IGenericResponse>(API_URLS.CURRENCY, currency);
  }

  delete(id: String): Observable<IGenericResponse> {
    return this.http.delete<IGenericResponse>(API_URLS.CURRENCY + id);
  }
}
