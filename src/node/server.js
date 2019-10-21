const express = require("express");
const cors = require("cors");
let jwt = require("jsonwebtoken");
let secret = require("./middleware").config.secret;
let checkToken = require("./middleware").checkToken;

const SELECT_ALL_TARIFFS_QUERY = "SELECT * FROM Tariff";
const SELECT_ALL_SERVICES_QUERY = "SELECT * FROM Service";
const SELECT_ALL_USERS = "SELECT * FROM Users";
const SELECT_USER_CONTRACT =
  "SELECT * FROM Contract WHERE Contract_ClientId = ?";
const UPDATE_USER_CONTRACT =
  "UPDATE Contract SET Contract_TariffId = ? WHERE Contract_ClientId = ?";

class HandlerGenerator {
  constructor(props) {
    this.connection = require("./dbconnect");
  }

  authMe = (req, res) => {
    res.json({
      resultCode: 0,
      clientId: req.decoded.clientId,
      login: req.decoded.username,
      message: "Authentication successful!"
    });
  };

  login = (req, res) => {
    let username = req.body.login;
    let password = req.body.password;

    if (username && password) {
      this.query(SELECT_ALL_USERS)
        .then(results => {
          let User = JSON.parse(JSON.stringify(results)).find(
            user =>
              user.User_Login === username && user.User_Password === password
          );
          if (User) {
            return this.query(SELECT_USER_CONTRACT, User.User_ClientId);
          } else {
            res.status(403).send({
              success: false,
              message: "Incorrect username or password"
            });
            throw new Error("Incorrect username or password");
          }
        })
        .then(results => {
          let clientId = results[0].Contract_ClientId;
          let token = jwt.sign({ clientId, username }, secret, {
            expiresIn: "24h"
          });
          // return the JWT token for the future API calls
          res.json({
            resultCode: 0,
            clientId,
            login: username,
            token
          });
        })
        .catch(err => console.log(err));
    } else {
      res.status(400).send({
        success: false,
        message: "Authentication failed! Please check the request"
      });
    }
  };

  getServices = (req, res) => {
    this.query(SELECT_ALL_SERVICES_QUERY).then(results =>
      res.json({
        data: results
      })
    );
  };

  getTariffs = (req, res) => {
    let tariffs;
    this.query(SELECT_ALL_TARIFFS_QUERY)
      .then(resultTariffs => {
        tariffs = JSON.parse(JSON.stringify(resultTariffs));
        return this.query(SELECT_USER_CONTRACT, req.decoded.clientId);
      })
      .then(resultUserContract =>
        res.json({
          data: {
            resultCode: 0,
            tariffId: resultUserContract[0].Contract_TariffId,
            tariffs
          }
        })
      )
      .catch(err => console.log(err));
  };

  changeTariff = (req, res) => {
    let tariffId = req.body.tariffId;

    this.query(SELECT_USER_CONTRACT, req.decoded.clientId).then(results => {
      if (results[0].Contract_TariffId === tariffId)
        this.query(UPDATE_USER_CONTRACT, [null, req.decoded.clientId]).then(
          () =>
            res.json({
              data: {
                resultCode: 0
              }
            })
        );
      else if (results[0].Contract_TariffId === null)
        this.query(UPDATE_USER_CONTRACT, [tariffId, req.decoded.clientId]).then(
          () =>
            res.json({
              data: {
                resultCode: 0
              }
            })
        );
    });
  };

  query = (sql, args) => {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
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
  app.get("/auth/me", checkToken, handlers.authMe);
  /*  app.get("/tariffs", checkToken, handlers.getTariffs);
  app.put("/tariffs", checkToken, handlers.changeTariff);*/
  app.all("/tariffs", checkToken);
  app
    .route("/tariffs")
    .get(handlers.getTariffs)
    .put(handlers.changeTariff);
  app.listen(port, () => {
    console.log("Example app on port 1337!");
  });
}

main();
