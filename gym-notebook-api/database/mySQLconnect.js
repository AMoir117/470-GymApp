var mysql      = require('mysql');

/*
var connection = mysql.createConnection({
//    debug: true,

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});
*/


var connection = mysql.createConnection({
//    debug: true,

    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'gymappdb'
});

module.exports = connection;
