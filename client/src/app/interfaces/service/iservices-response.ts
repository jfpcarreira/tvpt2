import { IGenericResponse } from '../igeneric-response'
import { Service } from '../../classes/service';

export interface IServicesResponse extends IGenericResponse {
  result?: Service[]
}
