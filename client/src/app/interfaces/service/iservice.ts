import { ICurrency, IGenericDbObj } from '../';

export interface IService extends IGenericDbObj {
    code: String
  , name: String
  , price: Number
  , currency: ICurrency
  , is_selected: Boolean
  , is_disabled: Boolean
}
