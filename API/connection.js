const mysql = require("mysql");
const db = mysql.createConnection({
    // user: "root",
    // host: "localhost",
    // password: "",
    // database: "lottery_pakse",
    // port: 8080,
    user: "root",
    host: "mariadb-23817-0.cloudclusters.net",
    password: "admin2020",
    database: "lottery_pakse",
    port:23817
  });
  

module.exports={
    db,
}