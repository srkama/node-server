const usersApi = require("./user");
const authApi = require("./auth");

const hanlders = {
	home: (data, callback) => {
		authApi.check(data, authStatus => {
			if (authStatus) {
				callback(200, "Hello ! this is Node JS");
			} else {
				callback("403", "Access Denied");
			}
		});
	},
	hello: (data, callback) => {
		const name = data.queryParams["name"] ? data.queryParams["name"] : "User!";
		callback(200, "Hello " + name);
	},
	users: (data, callback) => {
		allowedMethods = ["get", "post", "put", "delete"];
		method = data.method.toLowerCase();
		if (allowedMethods.indexOf(method) >= 0) {
			usersApi[method](data, callback);
		} else {
			callback(405, "Method Not Supported!");
		}
	},
	login: (data, callback) => {
		allowedMethods = ["post"];
		method = data.method.toLowerCase();
		if (allowedMethods.indexOf(method) >= 0) {
			authApi.login(data, callback);
		} else {
			callback(405, "Method Not Supported!");
		}
	},
	logout: (data, callback) => {
		authApi.logout(data, callback);
	}
};

module.exports = hanlders;
