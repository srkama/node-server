const handlers = require("./lib/handlers");

const route = {
	"": handlers.home,
	"/hello": handlers.hello,
	"/users": handlers.users,
	"/login": handlers.login,
	"/logout": handlers.logout,
	defaultHandler: handlers.home
};

const handleRoute = (data, callback) => {
	var handler = route[data.path] ? route[data.path] : route.defaultHandler;
	handler(data, callback);
};

module.exports = handleRoute;
