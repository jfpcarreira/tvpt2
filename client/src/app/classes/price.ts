import { IPrice } from '../interfaces/service/iprice';

export class Price implements IPrice {
  public amount: Number;
  public currency: String;
  public symbol: String;

  public constructor(price?: IPrice) {
    if (price) {
      this.setAmount(price.amount);
      this.setCurrency(price.currency);
      this.setSymbol(price.symbol);
    }
  }

  public getAmount(): Number {
    return this.amount;
  }

  public setAmount(value: Number) {
    this.amount = value;
  }

  public getCurrency(): String {
    return this.currency;
  }

  public setCurrency(value: String) {
    this.currency = value;
  }

  public getSymbol(): String {
    return this.symbol;
  }

  public setSymbol(value: String) {
    this.symbol = value;
  }

  public getFormattedPrice(): String {
    return (this.amount + " " + this.symbol);
  }
}
