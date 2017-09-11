import { IGenericResponse } from '../igeneric-response'
import { User }             from '../../classes/user';

export interface IUsersResponse extends IGenericResponse {
  result?: User[]
}
