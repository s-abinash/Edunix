const mysql = require('mysql');
const con = mysql.createConnection({
    host: process.env.DB_URL,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
con.connect((err)=> {if (err) throw err;console.log("Connected!");});

module.exports = con;