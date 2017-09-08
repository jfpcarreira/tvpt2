import { IUser } from '../interfaces/user/iuser';

export class User implements IUser {

	public _id: String;
	public name: String;
    public email: String;	
	public username: String;
    public password: String;
	public updatedAt: Date;
    public createdAt: Date;

    public constructor(user?: IUser) {
		if (user) {
			this.setId(user._id);
			this.setName(user.name);
			this.setEmail(user.email);
			this.setUsername(user.username);
			this.setPassword(user.password);
			this.setUpdatedAt(user.updatedAt);
			this.setCreatedAt(user.createdAt);
        }
    }

	public getId(): String {
		return this._id;
	}

	public setId(value: String) {
		this._id = value;
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
