import { IGenericResponse } from '../igeneric-response'
import { Currency } from '../../classes/currency';

export interface ICurrenciesResponse extends IGenericResponse {
  result?: Currency[]
}
