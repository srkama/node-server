class User {
	constructor(firstName, lastName, phoneNumber, password) {
		this._firstName = this._validateForString(firstName);
		this._lastName = this._validateForString(lastName);
		this._phoneNumber = this._validateForPhonenumber(phoneNumber);
		this._password = this._validateForPassword(password);
	}

	get firstName() {
		return this._firstName;
	}

	set firstName(val) {
		this._firstName = this._validateForString(val);
	}

	get lastName() {
		return this.lastName;
	}

	set lastName(val) {
		this._lastName = this._validateForString(val);
	}

	set phoneNumber(val) {
		this._phoneNumber = this._validateForPhonenumber(val);
	}

	get phoneNumber() {
		return this._phoneNumber;
	}

	set password(val) {
		this._password = this._validateForPassword(val);
	}

	_validateForString(val) {
		console.log(val);
		if (!val) {
			throw Error("Value is Empty");
		} else if (!/^[a-zA-Z]+$/.test(val)) {
			throw Error("Not a Valid Strig");
		}
		return val;
	}

	_validateForPassword(val) {
		if (!val) {
			throw Error("Password is Empty");
		} else if (!val.length > 6) {
			throw Error("Password should be atleast 6 characters");
		}
		return val;
	}

	_validateForPhonenumber(val) {
		if (!val) {
			throw Error("Phone Number is Empty");
		} else if (!/^[a-zA-Z0-9]+$/.test(val)) {
			throw Error("Phone Number can't contain alphabets");
		} else if (!(val.length >= 10 && val.length <= 12)) {
			throw Error("Phone Number should be exactly 10 digits");
		}
		return val;
	}

	get_object() {
		var obj = {
			firstName: this._firstName,
			lastName: this._lastName,
			password: this._password,
			phoneNumber: this._phoneNumber
		};
		return obj;
	}

	get_json() {
		return JSON.stringify(this.get_object());
	}
}

module.exports = User;
