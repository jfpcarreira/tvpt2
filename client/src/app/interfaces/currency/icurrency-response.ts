import { IGenericResponse } from '../igeneric-response'
import { Currency }         from '../../classes/currency';

export interface ICurrencyResponse extends IGenericResponse {
  result?: Currency
}
