import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from "rxjs/operator/map";
import { environment } from '../../environments/environment';
import { IGenericResponse } from '../interfaces/igeneric-response';
import { ICurrency } from '../interfaces/price/icurrency';
import { ICurrencyResponse } from '../interfaces/price/icurrency-response';
import { ICurrenciesResponse } from '../interfaces/price/icurrencies-response';
import { Currency } from '../classes/currency';

@Injectable()
export class CurrencyService {

  constructor(private http: Http) {
  }

  get(id: String) {
    return this.http.get(environment.API_DOMAIN + environment.CURRENCY_API_URL + id).map(res => {
      let response: ICurrencyResponse = <ICurrencyResponse> res.json();

      response.result = new Currency(<ICurrency> res.json().result);

      return response;
    });
  }

  getAll() {
    return this.http.get(environment.API_DOMAIN + environment.CURRENCY_API_URL).map(res => {
      let response: ICurrenciesResponse = <ICurrenciesResponse> res.json();

      response.result = <Currency[]> res.json().result.map(service => {
        return new Currency(<ICurrency> service);
      });

      return response;
    });
  }

  create(currency: Currency) {
    return this.http.post(environment.API_DOMAIN + environment.CURRENCY_API_URL, currency).map(res => <IGenericResponse> res.json());
  }

  update(currency: Currency) {
    return this.http.put(environment.API_DOMAIN + environment.CURRENCY_API_URL, currency).map(res => <IGenericResponse> res.json());
  }

  delete(id: String) {
    return this.http.delete(environment.API_DOMAIN + environment.CURRENCY_API_URL + id).map(res => <IGenericResponse> res.json());
  }
}
