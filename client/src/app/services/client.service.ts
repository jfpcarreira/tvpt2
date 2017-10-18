import { Injectable }               from '@angular/core';
import { HttpClient }               from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { API_URLS }                 from '../../environments/environment';
import { IClient }                  from '../interfaces/client/iclient';
import { IService }                 from '../interfaces/service/iservice';
import { IClientResponse }          from '../interfaces/client/iclient-response';
import { IClientsResponse }         from '../interfaces/client/iclients-response';
import { IGenericResponse }         from '../interfaces/igeneric-response';
import { Client }                   from '../classes/client';
import { Service }                  from '../classes/service';

@Injectable()
export class ClientService {

  constructor(
      private http: HttpClient
    , private spinner: Ng4LoadingSpinnerService) {
  }

  get(id: String): Observable<IClientResponse> {
    this.spinner.show();
    return this.http.get<IClientResponse>(API_URLS.CLIENT + id).map(res => {
      res.result = new Client(<IClient> res.result);
      res.result.services = <Service[]> res.result.services.map(service =>
        new Service(<IService> service)
      );
      return res;
    });
  }

  getAll(): Observable<IClientsResponse> {
    this.spinner.show();
    return this.http.get<IClientsResponse>(API_URLS.CLIENT).map(res => {
      res.result = <Client[]> res.result.map(client => {
        client = new Client(<IClient> client);
        client.services = <Service[]> client.services.map(service => {
          return new Service(<IService> service);
        });
        return client;
      });
      return res;
    });
  }

  create(client: Client): Observable<IGenericResponse> {
    this.spinner.show();
    return this.http.post<IGenericResponse>(API_URLS.CLIENT, client);
  }

  update(client: Client): Observable<IGenericResponse> {
    this.spinner.show();
    return this.http.put<IGenericResponse>(API_URLS.CLIENT, client);
  }

  delete(id: String): Observable<IGenericResponse> {
    this.spinner.show();
    return this.http.delete<IGenericResponse>(API_URLS.CLIENT + id);
  }
}
