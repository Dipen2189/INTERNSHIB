const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
    host: '163.123.183.87',
    port: '28672',
    user: 'dipen',
    password: 'dipen1999',
    database: 'project'
});
dbConn.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
});
module.exports = dbConn;