import { IPrice } from '../price/iprice';

export interface IService {
    code: String
  , name: String
  , is_selected: Boolean
  , is_disabled: Boolean
  , price: Number
}
