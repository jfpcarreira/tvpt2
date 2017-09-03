import { IPrice } from '../interfaces/price/iprice';
import { ICurrency } from '../interfaces/price/icurrency';

export class Price implements IPrice {
  public value: Number;
  public currency: ICurrency;

  public constructor(price?: IPrice) {
    if (price) {
      this.setValue(price.value);
      this.setCurrency(price.currency);
    }
  }

  public getValue(): Number {
    return this.value;
  }

  public setValue(value: Number) {
    this.value = value;
  }

  public getCurrency(): ICurrency {
    return this.currency;
  }

  public setCurrency(value: ICurrency) {
    this.currency = value;
  }

  public getFormattedPrice(): String {
    return (this.value + " " + this.currency.symbol);
  }
}
