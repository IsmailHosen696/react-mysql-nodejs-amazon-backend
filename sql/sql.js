const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: "root",
    password: "root",
    database: "ecommercsql"
});
module.exports = db;