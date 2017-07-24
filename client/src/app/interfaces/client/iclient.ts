export interface IClient {
  _id: string;
  pass_tvpt: string;
  user_tvpt: string;
  updatedAt: Date;
  createdAt: Date;
  name: string;
  email: string;
  address: string;
  phone: string;
  user_sogra: string;
  pass_sogra: string;
  is_active: boolean;
  expiration_date: Date;
  registration_date: Date;
  services: any[];
}
