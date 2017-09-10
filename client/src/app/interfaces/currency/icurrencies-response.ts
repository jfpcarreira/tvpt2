import { IGenericResponse } from '../';
import { Currency }         from '../../classes';

export interface ICurrenciesResponse extends IGenericResponse {
  result?: Currency[]
}
