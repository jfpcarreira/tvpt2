import { IGenericResponse } from '../';
import { Client }           from '../../classes';

export interface IClientsResponse extends IGenericResponse {
  result?: Client[]
}
