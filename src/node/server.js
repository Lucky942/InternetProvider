const express = require("express");
const cors = require('cors');

let app = express();

app.use(cors());

const SELECT_ALL_TARIFFS_QUERY = "SELECT * FROM Tariff";

let mysql = require("mysql");
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "R12350000r",
  database: "InternetProvider"
});

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});


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




app.listen(1337, () => {
  console.log("Example app on port 1337!");
});
