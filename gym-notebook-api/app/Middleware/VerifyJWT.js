const jwt = require('koa-jwt');

// Validate that the access_token cookie is sent with the request and ensure that
// it was signed by the API server. `debug: true` simply allows for more detailed error
// messages in internal logging.
module.exports = jwt({
    secret: process.env.JWT_KEY,
    cookie: 'access_token',
    key: 'jwtdata',
    debug: true
});
