let express = require("express");
let app = express();

const SELECT_ALL_TARIFFS_QUERY = "SELECT * FROM Tariff";

let mysql = require("mysql");
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "R12350000r",
  database: "InternetProvider"
});

connection.connect();
connection.query("SELECT 1 + 1 AS solution", function(err, rows, fields) {
  if (err) throw err;
  console.log("The solution is: ", rows[0].solution);
});

app.get("/tariffs", (req, res) => {
  connection.query(SELECT_ALL_TARIFFS_QUERY, (err, results) => {
    if (err) return res.send("zal" + err);
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
