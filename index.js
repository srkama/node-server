// Simple Webserver that supports both HTTP and HTTPs requests
// can be taken and modified further

const http = require('http');
const url =  require('url');
const https = require('https');
const StringDecoder = require('string_decoder').StringDecoder
const fs = require('fs');

const config = require('./config');

//Handles all the request for 
const CommonServer = (req, res) => {
    const parsedURL = url.parse(req.url, true);
    
    var buffer = "";
    let decoder = new StringDecoder('utf-8')
    
    req.on('data', (data) => { 
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();

        const data = {
            path: parsedURL.pathname,
            headers: req.headers,
            queryParams: parsedURL.query,
            payload: buffer
        }

        console.log(data);
        res.writeHead(200)
        
        res.end("Hello world!");
    });
}

const httpServer = http.createServer(CommonServer)
httpServer.listen(config.http.port, () => { console.log("http server listening in" + config.http.port)});

const httpsOptions  = {
    key: fs.readFileSync(config.https.keyFile),
    cert: fs.readFileSync(config.https.certFile)
}

const httpsServer = https.createServer(httpsOptions, CommonServer)
httpsServer.listen(config.https.port, () => {console.log("https server listening in" + config.https.port)})