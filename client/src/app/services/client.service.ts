import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientService {

  constructor(
    private http: Http
  ) { }

  getClient(id) {
    return this.http.get(environment.API_DOMAIN + '/api/client/' + id).map(res => res.json());
  }

  getAllClients() {
    return this.http.get(environment.API_DOMAIN + '/api/client').map(res => res.json());
  }

  createClient(client) {
    return this.http.post(environment.API_DOMAIN + '/api/client', client).map(res => res.json());
  }

  removeClient(client) {
    return this.http.delete(environment.API_DOMAIN + '/api/client/' + client._id, client).map(res => res.json());
  }
}
