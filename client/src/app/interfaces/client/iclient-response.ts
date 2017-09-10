import { IGenericResponse } from '../';
import { Client }           from '../../classes';

export interface IClientResponse extends IGenericResponse {
  result?: Client
}
