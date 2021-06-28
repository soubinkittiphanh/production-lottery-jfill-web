const mysql = require("mysql2/promise");
const db = mysql.createPool({
  host: "mariadb-34248-0.cloudclusters.net",
  // host: "mariadb-35079-0.cloudclusters.net",
   user: "root",
    password: "admin2020",
    database: "lottery_pakse",
    // database: "int_lottery_dev",
    port:34248,
    // port:35079,
});
module.exports = {
  db,
};
