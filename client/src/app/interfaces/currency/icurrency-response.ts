import { IGenericResponse } from '../'
import { Currency }         from '../../classes';

export interface ICurrencyResponse extends IGenericResponse {
  result?: Currency
}
