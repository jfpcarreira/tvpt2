import { IGenericDbObj }  from '../';
import { Service }        from '../../classes';

export interface IClient extends IGenericDbObj {
  pass_tvpt: String;
  user_tvpt: String;
  name: String;
  email: String;
  address: String;
  phone: String;
  user_sogra: String;
  pass_sogra: String;
  is_active: Boolean;
  expiration_date: Date;
  registration_date: Date;
  services: Service[];
}
