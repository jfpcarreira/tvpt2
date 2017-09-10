import { IGenericResponse } from '../';
import { Service }          from '../../classes';

export interface IServiceResponse extends IGenericResponse {
  result?: Service
}
