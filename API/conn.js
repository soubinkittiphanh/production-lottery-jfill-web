const mysql = require("mysql2/promise");
const db = mysql.createPool({
  host: "mariadb-23817-0.cloudclusters.net",
   user: "root",
    password: "admin2020",
    database: "lottery_pakse",
    port:23817,
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "lottery_pakse",
  // port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
module.exports = {
  db,
};
