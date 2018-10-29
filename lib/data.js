const config = require("../config");
const fs = require("fs");

dataOperations = {
	create: (data, model, id, callback) => {
		var modelPath = config.baseDataPath + "/" + model;
		fs.mkdir(modelPath, err => {
			var filePath = modelPath + "/" + id + ".json";
			console.log(filePath);
			fs.open(filePath, "wx", (err, fd) => {
				if (!err) {
					fs.writeFile(fd, JSON.stringify(data), err => {
						fs.close(fd, err => {
							if (!err) {
								callback("success", "");
							} else {
								callback("error", " error in closing file");
							}
						});
					});
				} else {
					callback("error", err);
				}
			});
		});
		return null;
	},
	read: (model, id, callback) => {
		var filePath = config.baseDataPath + "/" + model + "/" + id + ".json";
		fs.open(filePath, "r", (err, fd) => {
			if (!err) {
				fs.readFile(fd, "utf-8", (err, data) => {
					if (!err) {
						callback("success", JSON.parse(data));
					} else {
						callback("error", err);
					}
				});
			} else {
				callback("error", "File not Found or Error in Opening file");
			}
		});
	},
	update: (data, model, id, callback) => {
		var filePath = config.baseDataPath + "/" + model + "/" + id + ".json";
		fs.open(filePath, "r+", (err, fd) => {
			if (!err) {
				fs.truncate(fd, err => {
					if (!err) {
						fs.writeFile(fd, JSON.stringify(data), err => {
							if (!err) {
								callback("success");
							} else {
								callback("error", err);
							}
						});
					} else {
						callback("error", err);
					}
				});
			} else {
				callback("error", err);
			}
		});
	},
	delete: (model, id, callback) => {
		var filePath = config.baseDataPath + "/" + model + "/" + id + ".json";
		fs.unlink(filePath, err => {
			if (!err) {
				callback("success", "deleted!");
			} else {
				callback("error", err);
			}
		});
	}
};

module.exports = dataOperations;
