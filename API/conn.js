const mysql = require("mysql2/promise");
const db = mysql.createPool({
  host: "163.123.183.93",
   user: "root",
    password: "admin2020",
    database: "lottery_pakse",
    port:28672,
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "lottery_pakse",
  // port: 8080,
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,
});
module.exports = {
  db,
};
