import { IGenericDbObj } from '../';

export interface IUser extends IGenericDbObj {
  name: String;
  email: String;
  username: String;
  password: String;
}
