import { IGenericResponse } from '../';
import { User }             from '../../classes';

export interface IUserResponse extends IGenericResponse {
  result?: User
}
