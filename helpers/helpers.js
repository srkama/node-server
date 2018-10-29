const crypto = require("crypto");
const helpers = {
	hashString: stringToHash => {
		var hashedValue = crypto
			.createHash("SHA512")
			.update(stringToHash)
			.digest("hex");
		return hashedValue;
	},
	decodeBase64: encodedString => {
		var decodedString = Buffer.from(encodedString, "base64").toString("utf-8");
		return decodedString;
	},
	encodeBase64: stringToEncode => {
		var encodedString = Buffer.from(stringToEncode).toString("base64");
		return encodedString;
	},
	createToken: (Id, expires) => {
		token = Id + ":" + expires;
		return helpers.encodeBase64(token);
	},
	decodeToken: encodedToken => {
		var decodedString = helpers.decodeBase64(encodedToken);
		return decodedString.split(":");
	}
};

module.exports = helpers;
