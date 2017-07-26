import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import { map } from "rxjs/operator/map";
import { environment } from '../../environments/environment';
import { IGenericResponse } from '../interfaces/igeneric-response';
import { IServiceResponse } from '../interfaces/service/iservice-response';
import { IServicesResponse } from '../interfaces/service/iservices-response';
import { IService } from '../interfaces/service/iservice';
import { Service } from '../classes/service';

@Injectable()
export class ServiceService {

  constructor(private http: Http) {
  }

  getService(id: String) {
    return this.http.get(environment.API_DOMAIN + environment.SERVICE_API_URL + id).map(res => {
      let response: IServiceResponse = <IServiceResponse> res.json();

      response.result = new Service(<IService> res.json().result);

      return response;
    });
  }

  getServices() {
    return this.http.get(environment.API_DOMAIN + environment.SERVICE_API_URL).map(res => {
      let response: IServicesResponse = <IServicesResponse> res.json();

      response.result = <Service[]> res.json().result.map(service => {
        return new Service(<IService> service);
      });

      return response;
    });
  }

  createService(service: Service) {
    return this.http.post(environment.API_DOMAIN + environment.SERVICE_API_URL, service).map(res => <IGenericResponse> res.json());
  }

  updateService(service: Service) {
    return this.http.put(environment.API_DOMAIN + environment.SERVICE_API_URL, service).map(res => <IGenericResponse> res.json());
  }

  removeService(id: String) {
    return this.http.delete(environment.API_DOMAIN + environment.SERVICE_API_URL + id).map(res => <IGenericResponse> res.json());
  }
}
