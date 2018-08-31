const util = require('util');

let defaultConfig = {
    env: 'dev',
    http: {
        port: '3005',
    },
    https: {
        port:'3445',
        keyFile: 'config/certs/key.pem',
        certFile: 'config/certs/cert.pem'
    }
}

let productionConfig =Object.assign({}, defaultConfig)

productionConfig.http.port = '3080';
productionConfig.https.port = '3443';
productionConfig.env = 'prod'

configToExport = process.env.NODE_ENV === 'prod' ? productionConfig : defaultConfig;

module.exports = configToExport
