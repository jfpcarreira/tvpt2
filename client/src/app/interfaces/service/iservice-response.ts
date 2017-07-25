import { IGenericResponse } from '../igeneric-response'
import { IService } from './iservice';

export interface IServiceResponse extends IGenericResponse {
  result?: IService
}
