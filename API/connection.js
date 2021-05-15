const mysql = require("mysql");
const db = mysql.createConnection({
    // user: "root",
    // host: "localhost",
    // password: "",
    // database: "lottery_pakse",
    // port: 8080,
    user: "root",
    host: "163.123.183.93",
    password: "admin2020",
    database: "lottery_pakse",
    port:28672
  });
  

module.exports={
    db,
}