const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: "root",
    password: "node,js,mongo",
    database: "ecommercsql"
});
module.exports = db;