import { IService } from '../interfaces/service/iservice';
import { ICurrency } from '../interfaces/currency/icurrency';
import { GenericDbObj } from '../classes/generic-db-obj';

export class Service extends GenericDbObj implements IService {
  public code: String;
  public name: String;
  public price: Number;
  public currency: ICurrency;
  public is_selected: Boolean;
  public is_disabled: Boolean;

  public constructor(service?: IService) {
    if (service) {
      super(service);
      this.setCode(service.code);
      this.setName(service.name);
      this.setPrice(service.price);
      this.setCurrency(service.currency);
      this.setIsSelected(service.is_selected);
      this.setIsDisabled(service.is_disabled);
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

  public getPrice(): Number {
    return this.price;
  }

  public setPrice(value: Number) {
    this.price = value;
  }

  public getCurrency(): ICurrency {
    return this.currency;
  }

  public setCurrency(value: ICurrency) {
    this.currency = value;
  }

  public isSelected(): Boolean {
    return this.is_selected;
  }

  public setIsSelected(value: Boolean) {
    this.is_selected = value;
  }

  public isDisabled(): Boolean {
    return this.is_disabled;
  }

  public setIsDisabled(value: Boolean) {
    this.is_disabled = value;
  }
}
