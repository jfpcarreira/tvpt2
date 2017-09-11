import { IGenericDbObj } from '../igeneric-db-obj';

export interface ICurrency extends IGenericDbObj {
  code: String,
  name: String,
  symbol: String
}
