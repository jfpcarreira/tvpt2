import { IUser }        from '../interfaces/user/iuser';
import { GenericDbObj } from '../classes/generic-db-obj';

export class User extends GenericDbObj implements IUser {

  public name: String;
  public email: String;
  public username: String;
  public password: String;

  public constructor(user?: IUser) {
    if (user) {
      super(user);
      this.setName(user.name);
      this.setEmail(user.email);
      this.setUsername(user.username);
      this.setPassword(user.password);
    }
  }

  public getName(): String {
    return this.name;
  }

  public setName(value: String) {
    this.name = value;
  }

  public getEmail(): String {
    return this.email;
  }

  public setEmail(value: String) {
    this.email = value;
  }

  public getUsername(): String {
    return this.username;
  }

  public setUsername(value: String) {
    this.username = value;
  }

  public getPassword(): String {
    return this.password;
  }

  public setPassword(value: String) {
    this.password = value;
  }
}
