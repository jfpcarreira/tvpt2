import { IGenericResponse } from '../'
import { User }             from '../../classes';

export interface IUsersResponse extends IGenericResponse {
  result?: User[]
}
