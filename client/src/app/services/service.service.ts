import { Injectable }         from '@angular/core';
import { HttpClient }         from '@angular/common/http';
import { Observable }         from 'rxjs/Observable';
import { API_URLS }           from '../../environments/environment';
import { IGenericResponse }   from '../interfaces/igeneric-response';
import { IServiceResponse }   from '../interfaces/service/iservice-response';
import { IServicesResponse }  from '../interfaces/service/iservices-response';
import { IService }           from '../interfaces/service/iservice';
import { ICurrency }          from '../interfaces/currency/icurrency';
import { Service }            from '../classes/service';
import { Currency }           from '../classes/currency';

@Injectable()
export class ServiceService {

  constructor(private http: HttpClient) { }

  get(id: String): Observable<IServiceResponse> {
    return this.http.get<IServiceResponse>(API_URLS.SERVICE + id).map(res => {
      res.result = new Service(<IService> res.result);
      res.result.currency = new Currency(<ICurrency> res.result.currency);
      return res;
    });
  }

  getAll(): Observable<IServicesResponse> {
    return this.http.get<IServicesResponse>(API_URLS.SERVICE).map(res => {
      res.result = <Service[]> res.result.map(service => {
        service = new Service(<IService> service);
        service.currency = new Currency(<ICurrency> service.currency);
        return service;
      });
      return res;
    });
  }

  create(service: Service): Observable<IGenericResponse> {
    return this.http.post<IGenericResponse>(API_URLS.SERVICE, service);
  }

  update(service: Service): Observable<IServiceResponse> {
    return this.http.put<IGenericResponse>(API_URLS.SERVICE, service);
  }

  delete(id: String): Observable<IServiceResponse> {
    return this.http.delete<IGenericResponse>(API_URLS.SERVICE + id);
  }
}
