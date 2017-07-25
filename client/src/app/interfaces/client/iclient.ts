export interface IClient {
  _id: String;
  pass_tvpt: String;
  user_tvpt: String;
  updatedAt: Date;
  createdAt: Date;
  name: String;
  email: String;
  address: String;
  phone: String;
  user_sogra: String;
  pass_sogra: String;
  is_active: Boolean;
  expiration_date: Date;
  registration_date: Date;
  services: any[];
}
