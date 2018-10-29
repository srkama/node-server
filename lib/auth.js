const helpers = require("../helpers/helpers");
const dataOperations = require("./data");
const config = require("../config");
const Auth = {
	login: (data, callback) => {
		encodedCredentials = data.headers["authorization"].split(" ")[1];
		decodedCredentials = helpers.decodeBase64(encodedCredentials).split(":");
		dataOperations.read("User", decodedCredentials[0], (status, data) => {
			if (status === "success") {
				user = JSON.parse(data);
				hashedPassword = helpers.hashString(decodedCredentials[1]);
				if (hashedPassword === user.password) {
					token = helpers.createToken(
						decodedCredentials[0],
						(Date.now() + config.loginExpiryTime * 60 * 60 * 1000).toString()
					);
					Auth.updateAuthRecords(decodedCredentials[0], status => {
						if (status === "success") {
							callback("200", token);
						} else {
							callback("500", "Error login");
						}
					});
				} else {
					callback("403", "invalid Username or password");
				}
			} else {
				callback("403", "invalid Username or password");
			}
		});
	},
	check: (data, callback) => {
		let [authMethod, token] = data.headers["authorization"].split(" ");
		if (authMethod.toLowerCase() === "token") {
			let [phoneNumber, expiry] = helpers.decodeToken(token);
			console.log(phoneNumber, expiry, config.loginExpiryTime, Date.now());
			if (expiry < Date.now().toString()) {
				console.log("token Expired");
				callback(false);
			} else {
				Auth.readAuthRecords(decodedCredentials[0], status => {
					if (status === "success") {
						callback("200", token);
					} else {
						callback("500", "Error login");
					}
				});
			}
		} else {
			callback(false);
		}
	},
	logout: (data, callback) => {
		let [authMethod, token] = data.headers["authorization"].split(" ");
		if (authMethod.toLowerCase() === "token") {
			let [phoneNumber, expiry] = helpers.decodeToken(token);
			Auth.deleteAuthRecord(phoneNumber, status => {
				if (status === "success") {
					callback("200", "loggedout");
				} else {
					callback("500", "Error in logging out");
				}
			});
		} else {
			console.log("else part");
			callback("500", "Error in request");
		}
	},
	deleteAuthRecord: (phoneNumber, callback) => {
		Auth.readAuthRecords(data => {
			if (data !== "error") {
				for (i = 0; i <= data.length; i++) {
					if (data[i] === phoneNumber) {
						data.splice(i, 1);
						break;
					}
				}
				dataOperations.update(data, "Auth", "auth", (status, data) => {
					if (status === "success") {
						callback("success");
					} else {
						callback("error");
					}
				});
			}
		});
	},
	updateAuthRecords: (phoneNumber, callback) => {
		Auth.readAuthRecords(data => {
			if (data !== "error") {
				data.push(phoneNumber);
				dataOperations.update(data, "Auth", "auth", (status, data) => {
					if (status === "success") {
						callback("success");
					} else {
						callback("error");
					}
				});
			}
		});
	},
	readAuthRecords: callback => {
		dataOperations.read("Auth", "auth", (status, data) => {
			if (status === "success") {
				if (data.length) {
					callback(data);
				} else {
					callback([]);
				}
			} else {
				callback("error");
			}
		});
	}
};

module.exports = Auth;
