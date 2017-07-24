import { IClient } from '../interfaces/client/iclient';

export class Client {

  private _id: string;
  private pass_tvpt: string;
  private user_tvpt: string;
  private updatedAt: Date;
  private createdAt: Date;
  private name: string;
  private email: string;
  private address: string;
  private phone: string;
  private user_sogra: string;
  private pass_sogra: string;
  private is_active: boolean;
  private expiration_date: Date;
  private registration_date: Date;
  private services: any[];

  public constructor(client?: IClient) {
    this.setId(client._id);
    this.setPassTvpt(client.pass_tvpt);
    this.setUserTvpt(client.user_tvpt);
    this.setUpdatedAt(client.updatedAt);
    this.setCreatedAt(client.createdAt);
    this.setName(client.name);
    this.setEmail(client.email);
    this.setAddress(client.address);
    this.setPhone(client.phone);
    this.setUserSogra(client.user_sogra);
    this.setPassSogra(client.pass_sogra);
    this.setIsActive(client.is_active);
    this.setExpirationDate(client.expiration_date);
    this.setRegistrationDate(client.registration_date);
    this.setServices(client.services);
  }

  public getId (): string {
    return this._id;
  }

  public setId (value: string) {
    this._id = value;
  }

  public getPassTvpt(): string {
    return this.pass_tvpt;
  }

  public setPassTvpt(value: string) {
    this.pass_tvpt = value;
  }

	public getUserTvpt(): string {
		return this.user_tvpt;
	}

	public setUserTvpt(value: string) {
		this.user_tvpt = value;
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

	public getName(): string {
		return this.name;
	}

	public setName(value: string) {
		this.name = value;
	}

	public getEmail(): string {
		return this.email;
	}

	public setEmail(value: string) {
		this.email = value;
	}

	public getAddress(): string {
		return this.address;
	}

	public setAddress(value: string) {
		this.address = value;
	}

	public getPhone(): string {
		return this.phone;
	}

	public setPhone(value: string) {
		this.phone = value;
	}

	public getUserSogra(): string {
		return this.user_sogra;
	}

	public setUserSogra(value: string) {
		this.user_sogra = value;
	}

	public getPassSogra(): string {
		return this.pass_sogra;
	}

	public setPassSogra(value: string) {
		this.pass_sogra = value;
	}

	public isActive(): boolean {
		return this.is_active;
	}

	public setIsActive(value: boolean) {
		this.is_active = value;
	}

	public getExpirationDate(): Date {
		return this.expiration_date;
	}

	public setExpirationDate(value: Date) {
		this.expiration_date = value;
	}

	public getRegistrationDate(): Date {
		return this.registration_date;
	}

	public setRegistrationDate(value: Date) {
		this.registration_date = value;
	}

	public getServices(): any[] {
		return this.services;
	}

	public setServices(value: any[]) {
		this.services = value;
	}
}
