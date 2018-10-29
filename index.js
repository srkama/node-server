// Simple Webserver that supports both HTTP and HTTPs requests
// can be taken and modified further

const http = require("http");
const url = require("url");
const https = require("https");
const StringDecoder = require("string_decoder").StringDecoder;
const fs = require("fs");

const config = require("./config");
const handleRoute = require("./route");
const User = require("./models/user");

//Handles all the request for
const CommonServer = (req, res) => {
	const parsedURL = url.parse(req.url, true);

	var buffer = "";
	let decoder = new StringDecoder("utf-8");

	req.on("data", data => {
		buffer += decoder.write(data);
	});

	req.on("end", () => {
		buffer += decoder.end();

		if (
			req.headers["content-type"].toLowerCase() ===
				"application/json".toLowerCase() &&
			buffer.length > 0
		) {
			buffer = JSON.parse(buffer);
		}

		const data = {
			path: parsedURL.pathname,
			headers: req.headers,
			method: req.method,
			queryParams: parsedURL.query,
			payload: buffer
		};

		handleRoute(data, (statusCode, response) => {
			res.setHeader("Content-Type", "application/json");
			res.writeHead(statusCode);
			res.end(JSON.stringify(response));
		});
	});
};

const httpServer = http.createServer(CommonServer);
httpServer.listen(config.http.port, () => {
	console.log("http server listening in" + config.http.port);
});

const httpsOptions = {
	key: fs.readFileSync(config.https.keyFile),
	cert: fs.readFileSync(config.https.certFile)
};

const httpsServer = https.createServer(httpsOptions, CommonServer);
httpsServer.listen(config.https.port, () => {
	console.log("https server listening in" + config.https.port);
});
