import { ICurrency }      from '../currency/icurrency';
import { IGenericDbObj }  from '../igeneric-db-obj';

export interface IService extends IGenericDbObj {
    code: String
  , name: String
  , price: Number
  , currency: ICurrency
  , is_selected: Boolean
  , is_disabled: Boolean
}
