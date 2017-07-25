import { IService } from '../interfaces/service/iservice';
import { IPrice } from '../interfaces/service/iprice';

export class Service implements IService {
  public code: String;
  public name: String;
  public is_selected: Boolean;
  public is_disabled: Boolean;
  public price: IPrice;

  public constructor(service?: IService) {
    this.setCode(service.code);
    this.setName(service.name);
    this.setIsSelected(service.is_selected);
    this.setIsDisabled(service.is_disabled);
    this.setPrice(service.price);
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

  public getPrice(): IPrice {
    return this.price;
  }

  public setPrice(value: IPrice) {
    this.price = value;
  }
}
