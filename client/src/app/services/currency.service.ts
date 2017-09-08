import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment, API_URLS } from '../../environments/environment';
import { IGenericResponse } from '../interfaces/igeneric-response';
import { ICurrencyResponse } from '../interfaces/currency/icurrency-response';
import { ICurrenciesResponse } from '../interfaces/currency/icurrencies-response';
import { ICurrency } from '../interfaces/currency/icurrency';
import { Currency } from '../classes/currency';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CurrencyService {

  constructor(private http: HttpClient) {
  }

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

  create(currency: Currency): Promise<IGenericResponse> {
    return this.http.post<IGenericResponse>(API_URLS.CURRENCY, currency).toPromise();
  }

  update(currency: Currency): Promise<IGenericResponse> {
    return this.http.put<IGenericResponse>(API_URLS.CURRENCY, currency).toPromise();
  }

  delete(id: String): Promise<IGenericResponse> {
    return this.http.delete<IGenericResponse>(API_URLS.CURRENCY + id).toPromise();
  }
}
