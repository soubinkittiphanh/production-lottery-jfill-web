const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
const conn = require("./connection");
const con = require("./conn");
const bcrypt = require("./custom-bcrypt");
const { json } = require("express");

app.get("/", (req, res) => {
  res.send("Hello Welcome to JFILL Lottery");
});

app.get("/employees", (req, res) => {
  conn.db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      // conn.db.end();
    }
  });
});
// ############ ຕັ້ງຄ່າງວດ #######################
app.get("/fetchism", (req, res) => {
  const param_date = req.query.date;
  console.log(param_date);
  conn.db.query(
    "SELECT * FROM installment where ism_date=?",
    [param_date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/createism", (req, res) => {
  const i_ref = req.body.ism_ref;
  const i_date = req.body.ism_date;
  const i_res = req.body.ism_res;
  const i_active = req.body.ism_active;
  console.log(i_res);
  conn.db.query(
    "INSERT INTO installment(ism_ref, ism_date, ism_result, ism_active) values(?,?,?,?)",
    [i_ref, i_date, i_res, i_active],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("ຂໍ້ມູນບັນທຶກສຳເລັດ");
      }
    }
  );
});

app.put("/updateism", (req, res) => {
  const ref = req.body.ism_ref;
  const id = req.body.ism_id;
  const date = req.body.ism_date;
  const result = req.body.ism_result;
  const active = req.body.ism_active;
  console.log(id);
  console.log(result);
  conn.db.query(
    "UPDATE installment SET ism_ref= ?,ism_date=?,ism_result=?,ism_active=? WHERE id= ? ",
    [ref, date, result, active, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("ຂໍ້ມູນຖືກບັນທຶກຮຽບຮ້ອຍ");
      }
    }
  );
});
app.get("/ismref", (req, res) => {
  conn.db.query(
    "SELECT MAX(`ism_ref`) as cur_ref FROM `installment` HAVING MAX(`ism_ref`) IS NOT null",
    (er, result) => {
      var numRows = result.length;
      console.log(numRows);
      if (er) {
        res.send(er);
      } else if (result) {
        if (numRows < 1) {
          res.send("10000");
        } else {
          const next_ref = result[0].cur_ref + 1;
          res.send("" + next_ref);
        }

        console.log("You are here");
        console.log(result);
      }
    }
  );
});
// ############ ເພີ່ມສະມາຊິກ #######################
app.get("/fetchuser", (req, res) => {
  conn.db.query(
    "SELECT member.*, SUM(s.sale_price) AS total FROM member LEFT  JOIN sale s ON member.mem_id=s.mem_id AND s.ism_id=(SELECT MAX(i.ism_ref) FROM installment i) GROUP BY member.mem_id",
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("ເກີດຂໍ້ຜິດພາດທາງດ້ານເຊີເວີ: " + err);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/gen_uid", (req, res) => {
  conn.db.query(
    "SELECT MAX(mem_id) AS mem_id FROM `member` HAVING MAX(mem_id) IS NOT null ",
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        if (result.length < 1) {
          res.send((result = [{ mem_id: 1000 }]));
        } else {
          res.send(result);
        }
      }
    }
  );
});
app.get("/fetchuserid", (req, res) => {
  const param_id = req.query.id;
  console.log("USER ID: " + param_id);
  const sql_query = " SELECT * FROM `member` WHERE id = " + param_id;
  conn.db.query(sql_query, (err, result) => {
    if (err) {
      console.log(err);
      res.send("ເກີດຂໍ້ຜິດພາດທາງດ້ານເຊີເວີ: " + err);
    } else {
      res.send(result);
    }
  });
});

app.post("/createuser", (req, res) => {
  const name = req.body.name;
  const lname = req.body.lname;
  const logid = req.body.logid;
  const logpass = bcrypt.hash(req.body.logpass);
  const vill = req.body.vill;
  const dist = req.body.dist;
  const pro = req.body.pro;
  const active = req.body.active;
  const admin = req.body.admin;
  const rec = req.body.mem_rec;
  const tel = req.body.mem_tel;
  console.log(rec);
  console.log(tel);
  conn.db.query(
    "INSERT INTO `member`( `mem_id`, `mem_pass`, `mem_name`, `mem_lname`, `mem_village`, `mem_dist`, `mem_pro`, `active`, `admin`,`mem_rec`,`mem_tel`) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    [logid, logpass, name, lname, vill, dist, pro, active, admin, rec, tel],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("ເກີດຂໍ້ຜິດພາດທາງເຊີເວີ້!!!!");
      } else {
        res.send("ເພີ່ມຂໍ້ມູນສຳເລັດ");
      }
    }
  );
});
app.put("/updateuser", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const lname = req.body.lname;
  const logid = req.body.logid;
  const logpass = bcrypt.hash(req.body.logpass); //req.body.logpass;
  const vill = req.body.vill;
  const dist = req.body.dist;
  const pro = req.body.pro;
  const active = req.body.active;
  const admin = req.body.admin;
  const rec = req.body.mem_rec;
  const tel = req.body.mem_tel;
  console.log("up id" + id);
  console.log("up id" + name);
  conn.db.query(
    "UPDATE `member` SET `mem_id`=?,`mem_pass`=?,`mem_name`=?,`mem_lname`=?,`mem_village`=?,`mem_dist`=?,`mem_pro`=?,`active`=?,`admin`=?,`mem_rec`=?,`mem_tel`=? WHERE `id`=?",
    [logid, logpass, name, lname, vill, dist, pro, active, admin, rec, tel, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("ເກີດຂໍ້ຜິດພາດທາງດ້ານເຊີເວີ");
      } else {
        res.send("ອັບເດດຂໍ້ມູນຮຽບຮ້ອຍ");
      }
    }
  );
});

// ############ ກຳນົດຫວຍເຕັມຮູ #######################

app.get("/getsalelimit", (req, res) => {
  conn.db.query("SELECT * FROM salelimit", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/updatesalelim", (req, res) => {
  const id = req.query.id;
  const two = req.body.two;
  const three = req.body.three;
  const four = req.body.four;
  const five = req.body.five;
  const six = req.body.six;
  console.log(id);
  conn.db.query(
    "UPDATE `salelimit` SET `two_digits`=?,`three_digits`=?,`four_digits`=?,`five_digits`=?,`six_digits`=? WHERE `id`=?",
    [two, three, four, five, six, id],
    (er, result) => {
      if (er) {
        res.send("ມີຂໍ້ຜິດພາດທາງດ້ານເຊີເວີ!");
      } else {
        res.send("ອັບເດດຂໍ້ມູນຮຽບຮ້ອຍ");
      }
    }
  );
});
// ############ ກຳນົດອັດຕາຈ່າຍລາງວັນ #######################
app.get("/getpayrate", (req, res) => {
  conn.db.query("SELECT * FROM payrate", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/updatepayrate", (req, res) => {
  const id = req.query.id;
  const two = req.body.two;
  const three = req.body.three;
  const four = req.body.four;
  const five = req.body.five;
  const six = req.body.six;
  console.log(id);
  conn.db.query(
    "UPDATE `payrate` SET `pay_two`=?,`pay_three`=?,`pay_four`=?,`pay_five`=?,`pay_six`=? WHERE `id`=?",
    [two, three, four, five, six, id],
    (er, result) => {
      if (er) {
        res.send("ມີຂໍ້ຜິດພາດທາງດ້ານເຊີເວີ!");
      } else {
        res.send("ອັບເດດຂໍ້ມູນຮຽບຮ້ອຍ");
      }
    }
  );
});

app.post("/auth", (req, res) => {
  const uid = req.body.id;
  const upas = req.body.pass;

  console.log(uid);
  console.log(upas);
  conn.db.query(
    "SELECT m.mem_id as mem_id,m.mem_pass as mem_pass,m.mem_name as mem_name,m.active as active,m.admin as admin, MAX(i.ism_ref) as ism_ref, i.ism_date as ism_date FROM member m \
    LEFT JOIN installment i ON i.ism_active = 1  WHERE mem_id =? and active=1",
    [uid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result[0].mem_id === null) {
          res.send((result = [{ isAuth: false }]));
          return;
        }
        const isAuth = bcrypt.compare(upas, result[0].mem_pass);
        if (isAuth) {
          res.send(result);
        } else {
          res.send((result = [{ isAuth: false }]));
        }
      }
    }
  );
});
app.get("/getism_ref", (req, res) => {
  conn.db.query(
    "SELECT  MAX(ism_ref) as ism_ref, ism_date FROM installment  WHERE ism_active = 1 LIMIT 1",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("res");
        res.send(result);
      }
    }
  );
});
// ############ ຂາຍ #######################
app.post("/sale", async (req, res) => {
  console.log("Sale");
  const sale = req.body.item;
  const user = req.body.user;
  const ism = req.body.ism;
  // const c_date = req.body.date;
  const qr_code = req.body.qr_code;
  var full_lucknum = [];
  console.log("ID: " + user);
  console.log(sale);
  for (var i = 0; i < sale.length; i++) {
    console.log("For: " + sale[i].lek + " Laka:" + sale[i].sale);
    const luck_num = sale[i].lek;
    const price_buy = sale[i].sale;

    const isfull = await full_lot_survey(luck_num, price_buy, ism);
    console.log("isfull: " + isfull);
    if (isfull !== "passed") {
      full_lucknum.push({ item: isfull });
    }
  }
  console.log("Full count: " + full_lucknum.length);
  console.log("Full detail: " + full_lucknum);
  if (full_lucknum.length < 1) {
    let sql = "";
    console.log("Length:" + sale.length);
    const bill_num = await get_billnum();
    for (let i = 0; i < sale.length; i++) {
      const colon = i < sale.length - 1 ? "," : ";";
      sql +=
        "(" +
        bill_num +
        "," +
        ism +
        ",'" +
        sale[i].lek +
        "'," +
        sale[i].sale +
        "," +
        user +
        ",'" +
        sale[i].date +
        "'," +
        qr_code +
        ")" +
        colon +
        "";
    }

    console.log("SQL: " + sql);
    conn.db.query(
      "INSERT INTO `sale`(`sale_bill_id`, `ism_id`, `sale_num`, `sale_price`, `mem_id`, `client_date`,`qr_code`) VALUES " +
        sql +
        "",
      (er, result) => {
        if (er) {
          res.send("ເກີດຂໍ້ຜິດພາດທາງເຊີເວີ SQL query");
          console.log("Failed");
          console.log(er);
        } else {
          full_lucknum.push({
            item: "ສຳເລັດການຂາຍ",
            bill_num: String(bill_num),
          });
          res.send(full_lucknum);
          console.log("Success");
          console.log(full_lucknum);
          // res.send((item = ["ສຳເລັດການຂາຍ"]));
          // res.send((bill_num = [bill_num]));
        }
      }
    );
  } else {
    res.send(full_lucknum);
  }
});

async function get_billnum() {
  const res = await con.db.query(
    `SELECT MAX(sale_bill_id) as pre_bill FROM sale HAVING MAX(sale_bill_id) IS NOT null`
  );

  // console.log(res[0][0]);
  const numRows = res[0].length;
  console.log("numrow: " + numRows);
  if (numRows < 1) {
    console.log("LESS THEN 1: " + numRows);
    return 214303061761012;
  } else {
    console.log("OVER THEN 1: " + numRows);
    console.log("NEXT_REF: " + res[0][0].pre_bill);
    const next_ref = BigInt(res[0][0].pre_bill) + 1n;
    // const next_ref = BigInt(res[0][0].pre_bill) +1n;
    console.log("NEXT_REF + 1: " + next_ref);
    return next_ref;
  }
}
async function full_lot_survey(luck_num, price, ism_ref) {
  let luck_num_type = "";
  let isover = [];
  const luckNLen = luck_num.length;
  console.log("Length: " + luckNLen);
  if (luckNLen === 2) {
    luck_num_type = "two_digits";
  } else if (luckNLen === 3) {
    luck_num_type = "three_digits";
  } else if (luckNLen === 4) {
    luck_num_type = "four_digits";
  } else if (luckNLen === 5) {
    luck_num_type = "five_digits";
  } else if (luck_num === 6) {
    luck_num_type = "six_digits";
  }

  console.log("number:" + luck_num + " price: " + price + "ism: " + ism_ref);
  try {
    const res = await con.db.query(
      `SELECT SUM(s.sale_price) as total,l.${luck_num_type} as maxsale \
      FROM  salelimit l LEFT JOIN  sale s ON s.sale_num = ? and s.ism_id = ?  WHERE l.id=1  `,
      [luck_num, ism_ref]
    );
    console.log("LEK: " + luck_num_type + " to");
    console.log("Limited: " + res[0][0].maxsale + " Kip");
    console.log(res[0][0]);
    console.log(res[0][0].maxsale);
    const available = res[0][0].maxsale - parseInt(res[0][0].total);
    if (res[0].length < 1) {
      throw new Error("Post with this id was not found");
    } else if (res[0][0].total === null && res[0][0].maxsale < price) {
      // } else if (res[0][0].total == null && res[0][0].maxsale < price) {
      console.log("AlreadySold: " + res[0][0].total);
      console.log("Max: " + res[0][0].maxsale);
      console.log("Buy: " + price);
      console.log("Luck: " + luck_num);
      console.log("Hel: " + res[0][0].maxsale < price);
      isover.push(
        "ເລກ: " +
          luck_num +
          " ເຕັມ ວ່າງ: " +
          Intl.NumberFormat().format(res[0][0].maxsale) +
          " ຍອດຕ້ອງການຊື້: " +
          Intl.NumberFormat().format(price)
      );
      return isover;
    } else if (
      res[0][0].maxsale >= parseInt(res[0][0].total) + price ||
      res[0][0].total == null
    ) {
      return "passed";
    } else {
      isover.push(
        "ເລກ: " +
          luck_num +
          " ເຕັມ ວ່າງ: " +
          Intl.NumberFormat().format(available) +
          " ຍອດຕ້ອງການຊື້: " +
          Intl.NumberFormat().format(price)
      );
      return isover;
    }
  } catch {
    throw new Error("Post with this id was not found");
  }
}

// ############ Sale Report #######################
app.get("/salereport", (req, res) => {
  const r_date = req.query.p_date;
  const r_admin = req.query.p_admin;
  const r_mem_id = req.query.p_mem_id;
  console.log("ADMIN: " + req.query.admin1);
  //SUBSTRING(s.sale_bill_id, -6, 6)
  let sql = `SELECT s.is_cancel As is_cancel, s.sale_bill_id AS sale_bill_id,s.ism_id AS ism_id,s.mem_id AS mem_id,s.date AS date,s.sale_num AS sale_num,s.sale_price AS sale_price,i.ism_result FROM installment i 
  RIGHT JOIN sale s ON s.ism_id=i.ism_ref
  WHERE i.ism_date ="${r_date}" and s.mem_id="${r_mem_id}" ORDER BY s.id DESC `;

  if (r_admin === "true") {
    sql = `SELECT s.is_cancel As is_cancel, s.sale_bill_id AS sale_bill_id,s.ism_id AS ism_id,s.mem_id AS mem_id,s.date AS date,s.sale_num AS sale_num,s.sale_price AS sale_price,i.ism_result FROM installment i 
    RIGHT JOIN sale s ON s.ism_id=i.ism_ref
    WHERE i.ism_date ="${r_date}" ORDER BY s.id DESC `;
    console.log("Admin: " + r_admin);
  }

  console.log(r_date);
  conn.db.query(sql, (er, result) => {
    if (er) {
      res.send(er);
    } else {
      res.send(result);
    }
  });
});
// ############ Win Report #######################
app.get("/winreport", (req, res) => {
  const r_date = req.query.r_date;
  const r_admin = req.query.p_admin;
  const r_mem_id = req.query.p_mem_id;
  let sql = `SELECT s.*,i.ism_result FROM installment i 
  RIGHT JOIN sale s ON s.ism_id=i.ism_ref AND s.is_cancel=0
  WHERE i.ism_date ="${r_date}" and s.mem_id="${r_mem_id}" AND (s.sale_num = SUBSTRING(i.ism_result, -6, 6) OR s.sale_num = SUBSTRING(i.ism_result, -5, 5) OR s.sale_num = SUBSTRING(i.ism_result, -4, 4) OR s.sale_num = SUBSTRING(i.ism_result, -3, 3) OR = SUBSTRING(i.ism_result, -2, 2)) ORDER BY s.id DESC `;
  // WHERE i.ism_date ="${r_date}" and s.mem_id="${r_mem_id}" AND (s.sale_num LIKE CONCAT('%',SUBSTRING(i.ism_result, -6, 6)) OR s.sale_num LIKE CONCAT('%',SUBSTRING(i.ism_result, -5, 5)) OR s.sale_num LIKE CONCAT('%',SUBSTRING(i.ism_result, -4, 4)) OR s.sale_num LIKE CONCAT('%',SUBSTRING(i.ism_result, -3, 3)) OR s.sale_num LIKE CONCAT('%',SUBSTRING(i.ism_result, -2, 2))) ORDER BY s.id DESC `;
  //ABCD
  console.log('UPDATE:==================WINREPORT');
  if (r_admin === "true") {
    sql = `SELECT s.*,i.ism_result FROM installment i 
    RIGHT JOIN sale s ON s.ism_id=i.ism_ref AND s.is_cancel=0
    WHERE i.ism_date ="${r_date}" AND (s.sale_num = SUBSTRING(i.ism_result, -6, 6) OR s.sale_num = SUBSTRING(i.ism_result, -5, 5) OR s.sale_num = SUBSTRING(i.ism_result, -4, 4) OR s.sale_num = SUBSTRING(i.ism_result, -3, 3) OR s.sale_num = SUBSTRING(i.ism_result, -2, 2)) ORDER BY s.id DESC `;
    // WHERE i.ism_date ="${r_date}" AND (s.sale_num LIKE CONCAT('%',SUBSTRING(i.ism_result, -6, 6)) OR s.sale_num LIKE CONCAT('%',SUBSTRING(i.ism_result, -5, 5)) OR s.sale_num LIKE CONCAT('%',SUBSTRING(i.ism_result, -4, 4)) OR s.sale_num LIKE CONCAT('%',SUBSTRING(i.ism_result, -3, 3)) OR s.sale_num LIKE CONCAT('%',SUBSTRING(i.ism_result, -2, 2))) ORDER BY s.id DESC `;
    console.log("Admin: " + r_admin);
  }

  console.log("ID" + r_mem_id);
  console.log("Admin" + r_admin);
  console.log("Date" + r_date);
  conn.db.query(sql, (er, result) => {
    if (er) {
      res.send(er);
    } else {
      res.send(result);
    }
  });
});
app.post("/cancel", (req, res) => {
  const billId = req.body.billId;
  const sql=`UPDATE sale SET is_cancel=1 WHERE sale_bill_id="${billId}"`;
  conn.db.query(sql, (er, result) => {
    if (er) {
      res.send("Error");
    } else {
      res.send("Completed");
    }
  });
});
app.listen(port, () => {
  console.log("Yey, your server is running on port: " + port);
});
