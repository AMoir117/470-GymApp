var mysql = require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "8025407",
	database: "gymappdb",
});

module.exports = connection;
