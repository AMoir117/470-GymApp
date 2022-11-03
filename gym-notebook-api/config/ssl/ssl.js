// const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

module.exports = function (app) {
    return http.createServer(app);
};

