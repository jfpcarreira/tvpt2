import { IGenericDbObj } from '../igeneric-db-obj';

export interface IUser extends IGenericDbObj {
  name: String;
  email: String;
  username: String;
  password: String;
}
