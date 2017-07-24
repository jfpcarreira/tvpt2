import { IGenericResponse } from '../igeneric-response'
import { Client } from '../../classes/client';

export interface IClientsResponse extends IGenericResponse {
  result?: Client[]
}
