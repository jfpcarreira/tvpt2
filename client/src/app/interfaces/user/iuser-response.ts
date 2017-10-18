import { IGenericResponse } from '../igeneric-response';
import { User }             from '../../classes/user';

export interface IUserResponse extends IGenericResponse {
  result?: User
}
