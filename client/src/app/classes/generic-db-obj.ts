import { IGenericDbObj } from '../interfaces/igeneric-db-obj';

export class GenericDbObj implements IGenericDbObj {
  public _id: String;
  public updatedAt: Date;
  public createdAt: Date;

  public constructor(dbObj: any ) {
    this.setId(dbObj._id);
    this.setUpdatedAt(dbObj.updatedAt);
    this.setCreatedAt(dbObj.createdAt);
  }

  public getId(): String {
    return this._id;
  }

  public setId(value: String) {
    this._id = value;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUpdatedAt(value: Date) {
    this.updatedAt = value;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(value: Date) {
    this.createdAt = value;
  }

}
