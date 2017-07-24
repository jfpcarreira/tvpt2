import { IGenericResponse } from '../igeneric-response'
import { Client } from '../../classes/client';

export interface IClientResponse extends IGenericResponse {
  result?: Client
}
