import { ICurrency } from '../interfaces/currency/icurrency';

export class Currency implements ICurrency {
  public code: String;
  public name: String;
  public symbol: String;

  public constructor(currency?: ICurrency) {
    if (currency) {
      this.setCode(currency.code);
      this.setName(currency.name);
      this.setSymbol(currency.symbol);
    }
  }

  public getCode(): String {
    return this.code;
  }

  public setCode(value: String) {
    this.code = value;
  }

  public getName(): String {
    return this.name;
  }

  public setName(value: String) {
    this.name = value;
  }

  public getSymbol(): String {
    return this.symbol;
  }

  public setSymbol(value: String) {
    this.symbol = value;
  }
}
