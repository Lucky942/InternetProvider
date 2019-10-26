const mysql = require("mysql");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "R12350000r",
    database: "InternetProvider",
    dateStrings: true
});

module.exports = connection;