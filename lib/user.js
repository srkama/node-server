const dataOperations = require("./data");
const userModel = require("../models/user");
const helpers = require("../helpers/helpers");
userApi = {
	get: (data, callback) => {
		phoneNumber = data.queryParams["phoneNumber"];
		dataOperations.read("User", phoneNumber, (status, data) => {
			if (status === "success") {
				user = JSON.parse(data);
				callback(200, user);
			} else {
				callback(500, data);
			}
		});
	},
	post: (data, callback) => {
		phoneNumber = data.payload["phoneNumber"];
		user = new userModel(
			data.payload.firstName,
			data.payload.lastName,
			data.payload.phoneNumber,
			helpers.hashString(data.payload.password)
		);
		dataOperations.create(
			user.get_json(),
			"User",
			phoneNumber,
			(status, data) => {
				console.log(status, data);
				if (status === "success") {
					callback(200, "created");
				} else {
					callback(500, "Error in creating a record");
				}
			}
		);
	},
	put: (data, callback) => {
		phoneNumber = data.queryParams["phoneNumber"];
		user = new userModel(
			data.payload.firstName,
			data.payload.lastName,
			data.payload.phoneNumber,
			helper.hashString(data.payload.password)
		);
		dataOperations.update(
			user.get_json(),
			"User",
			phoneNumber,
			(status, data) => {
				console.log(status, data);
				if (status === "success") {
					callback(200, "updated");
				} else {
					callback(500, "Error in creating a record");
				}
			}
		);
	},
	delete: (data, callback) => {
		phoneNumber = data.queryParams["phoneNumber"];
		dataOperations.delete("User", phoneNumber, (status, data) => {
			if (status === "success") {
				callback(200, "deleted");
			} else {
				callback(500, "Error in creating a record");
			}
		});
	}
};

module.exports = userApi;
