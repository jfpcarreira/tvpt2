import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IGenericResponse } from '../interfaces/igeneric-response';
import { ICurrencyResponse } from '../interfaces/price/icurrency-response';
import { ICurrenciesResponse } from '../interfaces/price/icurrencies-response';
import { ICurrency } from '../interfaces/price/icurrency';
import { Currency } from '../classes/currency';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CurrencyService {

  constructor(private http: HttpClient) {
  }

  get(id: string): Promise<ICurrencyResponse> {
    return this.http
      .get<ICurrencyResponse>(environment.API_DOMAIN + environment.CURRENCY_API_URL + id)
      .toPromise();
  }

  /*
    get(id: String) {
      return this.http.get(environment.API_DOMAIN + environment.CURRENCY_API_URL + id).map(res => {
        let response: ICurrencyResponse = <ICurrencyResponse> res.json();

        response.result = new Currency(<ICurrency> res.json().result);

        return response;
      });
  */

  getAll(): Observable<ICurrenciesResponse> {
    return this.http
      .get<ICurrenciesResponse>(API_URLS.CURRENCY)
      .map(res => {
        res.result = res.result.map(curr => new Currency(curr));
        return res;
      });
  }
  /*
        return this.http.get(environment.API_DOMAIN + environment.CURRENCY_API_URL).map(res => {
          let response: ICurrenciesResponse = <ICurrenciesResponse> res.json();

        response.result = <Currency[]> res.json().result.map(service => {
          return new Currency(<ICurrency> service);
        });

        return response;
      });
  */
}

create(currency: Currency): Promise < IGenericResponse > {
  return this.http
    .post<IGenericResponse>(environment.API_DOMAIN + environment.CURRENCY_API_URL, currency)
    .toPromise();

  //    return this.http.post(environment.API_DOMAIN + environment.CURRENCY_API_URL, currency).map(res => <IGenericResponse> res.json());
}

update(currency: Currency): Promise < IGenericResponse > {
  return this.http
    .put<IGenericResponse>(environment.API_DOMAIN + environment.CURRENCY_API_URL, currency)
    .toPromise();

  //    return this.http.put(environment.API_DOMAIN + environment.CURRENCY_API_URL, currency).map(res => <IGenericResponse> res.json());
}

delete (id: String): Promise < IGenericResponse > {
  return this.http
    .delete<IGenericResponse>(environment.API_DOMAIN + environment.CURRENCY_API_URL + id)
    .toPromise();

  //    return this.http.delete(environment.API_DOMAIN + environment.CURRENCY_API_URL + id).map(res => <IGenericResponse> res.json());
}
}
