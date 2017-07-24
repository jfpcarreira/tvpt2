import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import { environment } from '../../environments/environment';
import { IGenericResponse } from '../interfaces/igeneric-response';
import { IClientsResponse } from '../interfaces/client/iclients-response';
import { IClientResponse } from '../interfaces/client/iclient-response';
import { IClient } from '../interfaces/client/iclient';
import { Client } from '../classes/client';
import { map } from "rxjs/operator/map";

@Injectable()
export class ClientService {

  constructor(private http: Http) {
  }

  getClient(id) {
    return this.http.get(environment.API_DOMAIN + environment.CLIENT_API_URL + id).map(res => {
      let response: IClientResponse = <IClientResponse> res.json();

      response.result = new Client(<IClient> res.json().result);

      return response;
    });
  }

  getClients() {
    return this.http.get(environment.API_DOMAIN + environment.CLIENT_API_URL).map(res => {
      let response: IClientsResponse = <IClientsResponse> res.json();

      response.result = <Client[]> res.json().result.map(client => {
        return new Client(client);
      });

      return response;
    });
  }

  createClient(client: Client) {
    return this.http.post(environment.API_DOMAIN + environment.CLIENT_API_URL, client).map(res => <IGenericResponse> res.json());
  }

  removeClient(client: Client) {
    return this.http.delete(environment.API_DOMAIN + environment.CLIENT_API_URL + client.getId()).map(res => <IGenericResponse> res.json());
  }
}
