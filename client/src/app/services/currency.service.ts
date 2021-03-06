import { Injectable }               from '@angular/core';
import { HttpClient }               from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { API_URLS }                 from '../../environments/environment';
import { ICurrency }                from '../interfaces/currency/icurrency';
import { ICurrencyResponse }        from '../interfaces/currency/icurrency-response';
import { ICurrenciesResponse }      from '../interfaces/currency/icurrencies-response';
import { IGenericResponse }         from '../interfaces/igeneric-response';
import { Currency }                 from '../classes/currency';

@Injectable()
export class CurrencyService {

  constructor(
      private http: HttpClient
    , private spinner: Ng4LoadingSpinnerService) {
  }

  get(id: String): Observable<ICurrencyResponse> {
    this.spinner.show();
    return this.http.get<ICurrencyResponse>(API_URLS.CURRENCY + id).map(res => {
      res.result = new Currency(<ICurrency> res.result);
      return res;
    });
  }

  getAll(): Observable<ICurrenciesResponse> {
    this.spinner.show();
    return this.http.get<ICurrenciesResponse>(API_URLS.CURRENCY).map(res => {
      res.result = res.result.map(curr => new Currency(curr));
      return res;
    });
  }

  create(currency: Currency): Observable<IGenericResponse> {
    this.spinner.show();
    return this.http.post<IGenericResponse>(API_URLS.CURRENCY, currency);
  }

  update(currency: Currency): Observable<IGenericResponse> {
    this.spinner.show();
    return this.http.put<IGenericResponse>(API_URLS.CURRENCY, currency);
  }

  delete(id: String): Observable<IGenericResponse> {
    this.spinner.show();
    return this.http.delete<IGenericResponse>(API_URLS.CURRENCY + id);
  }
}
