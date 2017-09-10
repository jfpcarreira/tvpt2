import { IGenericDbObj } from '../';

export interface ICurrency extends IGenericDbObj {
  code: String,
  name: String,
  symbol: String
}
