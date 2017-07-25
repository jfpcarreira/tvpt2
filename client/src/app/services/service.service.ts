import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import { map } from "rxjs/operator/map";
import { environment } from '../../environments/environment';
import { IGenericResponse } from '../interfaces/igeneric-response';
import { IServiceResponse } from '../interfaces/service/iservice-response';
import { IService } from '../interfaces/service/iservice';

@Injectable()
export class ServiceService {

  constructor(private http: Http) {
  }

  getClient(id) {
    return this.http.get(environment.API_DOMAIN + environment.SERVICE_API_URL + id).map(res => {
      let response: IServiceResponse = <IServiceResponse> res.json();

      response.result = new Client(<IService> res.json().result);

      return response;
    });
  }

}
