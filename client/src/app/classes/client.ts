import { IClient }                from '../interfaces';
import { Service, GenericDbObj }  from '../classes';

export class Client extends GenericDbObj implements IClient {

	public name: String;
	public email: String;
	public address: String;
	public phone: String;
	public user_tvpt: String;
  public pass_tvpt: String;
	public user_sogra: String;
	public pass_sogra: String;
	public is_active: Boolean;
	public expiration_date: Date;
	public registration_date: Date;
	public services: Service[];

	public constructor(client?: IClient) {
		if (client) {
      super(client);
			this.setName(client.name);
			this.setEmail(client.email);
			this.setAddress(client.address);
			this.setPhone(client.phone);
			this.setUserTvpt(client.user_tvpt);
			this.setPassTvpt(client.pass_tvpt);
			this.setUserSogra(client.user_sogra);
			this.setPassSogra(client.pass_sogra);
			this.setIsActive(client.is_active);
			this.setExpirationDate(client.expiration_date);
			this.setRegistrationDate(client.registration_date);
			this.setServices(client.services);
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

	public getAddress(): String {
		return this.address;
	}

	public setAddress(value: String) {
		this.address = value;
	}

	public getPhone(): String {
		return this.phone;
	}

	public setPhone(value: String) {
		this.phone = value;
	}

	public getUserTvpt(): String {
		return this.user_tvpt;
	}

	public setUserTvpt(value: String) {
		this.user_tvpt = value;
	}

	public getPassTvpt(): String {
		return this.pass_tvpt;
	}

	public setPassTvpt(value: String) {
		this.pass_tvpt = value;
	}

	public getUserSogra(): String {
		return this.user_sogra;
	}

	public setUserSogra(value: String) {
		this.user_sogra = value;
	}

	public getPassSogra(): String {
		return this.pass_sogra;
	}

	public setPassSogra(value: String) {
		this.pass_sogra = value;
	}

	public isActive(): Boolean {
		return this.is_active;
	}

	public setIsActive(value: Boolean) {
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

	public getServices(): Service[] {
		return this.services;
	}

	public setServices(value: Service[]) {
		this.services = value;
	}
}
