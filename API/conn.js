const mysql = require("mysql2/promise");
const con = require("./package.json");
const db = mysql.createPool({
  host: con.dbConf.host, //"mariadb-34248-0.cloudclusters.net",
  // host: "mariadb-35079-0.cloudclusters.net",
  user: con.dbConf.user, // "root",
  password: con.dbConf.password, // "admin2020",
  database: con.dbConf.database, //"lottery_pakse",
  // database: "int_lottery_dev",
  port: con.dbConf.port, // 34248,
  // port:35079,
});
module.exports = {
  db,
};
