import { IGenericResponse } from '../igeneric-response';
import { Service }          from '../../classes/service';

export interface IServiceResponse extends IGenericResponse {
  result?: Service
}
