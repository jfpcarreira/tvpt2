import { ICurrency } from '../currency/icurrency';

export interface IService {
    code: String
  , name: String
  , price: Number
  , currency: ICurrency
  , is_selected: Boolean
  , is_disabled: Boolean
}
