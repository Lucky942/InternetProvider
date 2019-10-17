const express = require("express");
const cors = require("cors");
let jwt = require("jsonwebtoken");
let secret = require("./middleware").config.secret;
let checkToken = require("./middleware").checkToken;

const SELECT_ALL_TARIFFS_QUERY = "SELECT * FROM Tariff";
const SELECT_ALL_SERVICES_QUERY = "SELECT * FROM Service";

let connection = require("./dbconnect");

/*const Users = [
  {
    id: 1,
    login: "petya",
    password: "123"
  },
  {
    id: 2,
    login: "vasya",
    password: "123"
  },
  {
    id: 3,
    login: "anton",
    password: "123"
  }
];*/

/*app.post("/auth/me", (req,res,next) => {

  let user = Users.find( user => user['login'] === req.body.login  && user['password'] === req.body.password);
  console.log(user);


  res.json({
    data: {
      resultCode: 0,
      data: {
        id: 1,
        login: 2
      }
    }
  })
});*/

class HandlerGenerator {
  login = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    // for example admin
    // For the given username fetch user from DB
    let mockedUsername = "admin";
    let mockedPassword = "password";

    if (username && password)
      if (username === mockedUsername && password === mockedPassword) {
        let token = jwt.sign({ username }, secret, { expiresIn: "24h" });
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: "Authentication successful!",
          token
        });
      } else {
        res.send(403).json({
          success: false,
          message: "Incorrect username or password"
        });
      }
    else {
      res.send(400).json({
        success: false,
        message: 'Authentication failed! Please check the request'
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

/*app.get("/tariffs", (req, res) => {
  connection.query(SELECT_ALL_TARIFFS_QUERY, (err, results) => {
    if (err) return res.send(err);
    else {
      return res.json({
        data: results
      });
    }
  });
});*/

/*app.get("/services", (req, res) => {
  connection.query(SELECT_ALL_SERVICES_QUERY, (err, results) => {
    if (err) return res.send(err);
    else {
      return res.json({
        data: results
      });
    }
  });
});*/

function main() {
  let app = express();
  let handlers = new HandlerGenerator();
  const port = process.env.port || 1337;
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  // Routes and handlers
  app.post("/login", handlers.login);
  app.get("/services", handlers.getServices);
  app.get("/tariffs", handlers.getTariffs);
  app.listen(port, () => {
    console.log("Example app on port 1337!");
  });
}

main();
