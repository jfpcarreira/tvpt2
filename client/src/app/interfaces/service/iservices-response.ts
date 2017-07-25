import { IGenericResponse } from '../igeneric-response'
import { IService } from './iservice';

export interface IServicesResponse extends IGenericResponse {
  result?: IService[]
}
