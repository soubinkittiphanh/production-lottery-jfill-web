const mysql = require("mysql");
const db = mysql.createConnection({
    user: "root",
    host: "mariadb-34248-0.cloudclusters.net",
    // host: "mariadb-35079-0.cloudclusters.net",
    password: "admin2020",
    database: "lottery_pakse",
    // database: "int_lottery_dev",
    port:34248,
    // port:35079,
  });
  

module.exports={
    db,
}