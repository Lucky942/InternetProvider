const express = require("express");
const cors = require("cors");
let jwt = require("jsonwebtoken");
let secret = require("./middleware").config.secret;
let checkToken = require("./middleware").checkToken;

const SELECT_ALL_TARIFFS_QUERY = "SELECT * FROM Tariff";
const SELECT_ALL_SERVICES_QUERY = "SELECT * FROM Service";
const SELECT_ALL_USERS = "SELECT * FROM Users";
const SELECT_USER_CONTRACT = "SELECT * FROM Contract Where Contract_ClientId = 1";

let connection = require("./dbconnect");

class HandlerGenerator {
  login = (req, res) => {
    let username = req.body.login;
    let password = req.body.password;

    if (username && password)
      connection.query(SELECT_ALL_USERS, (err, results) => {
        let User = JSON.parse(JSON.stringify(results)).find(
          user =>
            user.User_Login === username && user.User_Password === password
        );
        if (User) {
          let token = jwt.sign({ username }, secret, { expiresIn: "24h" });
          // return the JWT token for the future API calls
          res.json({
            resultCode: 0,
            clientId: User.User_ClientId,
            login: username,
            message: "Authentication successful!",
            token
          });
        } else {
          res.status(403).send({
            success: false,
            message: "Incorrect username or password"
          });
        }
      });
    else {
      res.status(400).send({
        success: false,
        message: "Authentication failed! Please check the request"
      });
    }
  };

  getServices = (req, res) => {
    connection.query(SELECT_ALL_SERVICES_QUERY, (err, results) => {
      if (err) return res.send(err);
      else {
        return res.json({
          data: results
        });
      }
    });
  };

  getTariffs = (req, res) => {
    console.log(req.query.clientId);
    connection.query(SELECT_ALL_TARIFFS_QUERY, (err, results) => {
      if (err) return res.send(err);
      else {
        return res.json({
          data: results
        });
      }
    });
  };
}

function main() {
  let app = express();
  let handlers = new HandlerGenerator();
  const port = process.env.port || 1337;
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  // Routes and handlers
  app.post("/login", handlers.login);
  app.get("/services", checkToken, handlers.getServices);
  app.get("/tariffs", checkToken, handlers.getTariffs);
  app.listen(port, () => {
    console.log("Example app on port 1337!");
  });
}

main();
