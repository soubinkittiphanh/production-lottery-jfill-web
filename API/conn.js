const mysql = require("mysql2/promise");
const db = mysql.createPool({
  host: "mariadb-34248-0.cloudclusters.net",
   user: "root",
    password: "admin2020",
    database: "lottery_pakse",
    port:34248,
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
