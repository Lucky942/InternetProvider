const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

let app = express();

app.use(cors());

const SELECT_ALL_TARIFFS_QUERY = "SELECT * FROM Tariff";
const SELECT_ALL_SERVICES_QUERY = "SELECT * FROM Service";

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "R12350000r",
  database: "InternetProvider"
});

/*connection.connect(err => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});*/

app.get("/tariffs", (req, res) => {
  connection.query(SELECT_ALL_TARIFFS_QUERY, (err, results) => {
    if (err) return res.send(err);
    else {
      return res.json({
        data: results
      });
    }
  });
});

app.get("/services", (req, res) => {
  connection.query(SELECT_ALL_SERVICES_QUERY, (err, results) => {
    if (err) return res.send(err);
    else {
      return res.json({
        data: results
      });
    }
  });
});

app.listen(1337, () => {
  console.log("Example app on port 1337!");
});
