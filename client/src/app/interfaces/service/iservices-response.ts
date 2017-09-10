import { IGenericResponse } from '../';
import { Service }          from '../../classes';

export interface IServicesResponse extends IGenericResponse {
  result?: Service[]
}
