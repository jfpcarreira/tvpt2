import { Injectable }             from '@angular/core';
import { HttpClient }             from '@angular/common/http';
import { Observable }             from 'rxjs/Observable';
import { environment, API_URLS }  from '../../environments/environment';
import { IGenericResponse }       from '../interfaces/igeneric-response';
import { IClientsResponse }       from '../interfaces/client/iclients-response';
import { IClientResponse }        from '../interfaces/client/iclient-response';
import { IClient }                from '../interfaces/client/iclient';
import { Client }                 from '../classes/client';

@Injectable()
export class ClientService {

  constructor(private http: HttpClient) { }

  get(id: String): Observable<IClientResponse> {
    return this.http.get<IClientResponse>(API_URLS.CLIENT + id).map(res => {
      res.result = new Client(<IClient> res.result);
      return res;
    });
  }

  getAll(): Observable<IClientsResponse> {
    return this.http.get<IClientsResponse>(API_URLS.CLIENT).map(res => {
      res.result = <Client[]> res.result.map(client => new Client(<IClient> client));
      return res;
    });
  }

  create(client: Client): Observable<IGenericResponse> {
    return this.http.post<IGenericResponse>(API_URLS.CLIENT, client);
  }

  update(client: Client) {
    return this.http.put<IGenericResponse>(API_URLS.CLIENT, client);
  }

  delete(id: String) {
    return this.http.delete<IGenericResponse>(API_URLS.CLIENT + id);
  }
}
