const express = require("express");
const cors = require("cors");
let jwt = require("jsonwebtoken");
const { checkRole } = require("./authorization/checkRole");
let secret = require("./authorization/middleware").config.secret;
let checkToken = require("./authorization/middleware").checkToken;

const SELECT_ALL_TARIFFS_QUERY = "SELECT * FROM Tariff";
const SELECT_ALL_SERVICES_QUERY = "SELECT * FROM Service";
const SELECT_ALL_USERS = "SELECT * FROM Users";
const SELECT_USER_CONTRACT =
  "SELECT * FROM Contract WHERE Contract_ClientId = ?";
const UPDATE_USER_CONTRACT =
  "UPDATE Contract SET Contract_TariffId = ? WHERE Contract_ClientId = ?";
const SELECT_TARIFFS_STAT =
  "SELECT Tariff_Name, Tariff_MaxSpeed, Tariff_Price, COUNT(*) as Amount FROM Contract, Tariff " +
  "WHERE  Contract.Contract_TariffId = Tariff.Tariff_Id GROUP BY Contract_TariffId";
// mounters
const SELECT_STAFF =
  "SELECT Mounter_Id, Mounter_FirstName, Mounter_LastName, Mounter_Passport, Mounter_Birthday, Mounter_EmploymentDate from Mounter";
const UPDATE_TARIFF_INFO =
  "UPDATE Tariff SET Tariff_Name = ?, Tariff_MaxSpeed = ?, Tariff_Price = ? WHERE Tariff_Id = ?";
const DELETE_TARIFF = "DELETE FROM Tariff WHERE Tariff_Id = ?";
const CREATE_TARIFF =
  "INSERT INTO Tariff(Tariff_Name, Tariff_MaxSpeed, Tariff_Price) values (?, ?, ?)";

class HandlerGenerator {
  constructor(props) {
    this.connection = require("./db/dbconnect");
  }

  authMe = (req, res) => {
    let { clientId, login, userRole } = req.decoded;
    res.json({
      resultCode: 0,
      clientId,
      login,
      userRole,
      message: "Authentication successful!"
    });
  };

  login = async (req, res) => {
    let { login, password } = req.body;

    if (login && password) {
      let results = await this.query(SELECT_ALL_USERS);
      let User = results.find(
        user => user.User_Login === login && user.User_Password === password
      );
      if (User) {
        let userRole = User.User_Role;
        let clientId;

        if (User.User_ClientId) {
          let contract = await this.query(SELECT_USER_CONTRACT, [
            User.User_ClientId
          ]);

          clientId = contract ? contract[0].Contract_ClientId : null;
        }

        let token = jwt.sign({ clientId, login, userRole }, secret, {
          expiresIn: "24h"
        });
        // return the JWT token for the future API calls
        await res.json({
          resultCode: 0,
          clientId,
          login,
          token,
          userRole
        });
      } else {
        /*res.status(403).send({
                success: false,
                message: "Incorrect username or password"
              });*/
        res.send({
          success: false,
          message: "Incorrect username or password"
        });
        throw new Error("Incorrect username or password");
      }
    } else {
      res.status(400).send({
        success: false,
        message: "Authentication failed! Please check the request"
      });
    }
  };

  getServices = async (req, res) => {
    let services = await this.query(SELECT_ALL_SERVICES_QUERY);
    await res.json({
      data: {
        resultCode: 0,
        services
      }
    });
  };

  getTariffs = async (req, res) => {
    let tariffs = await this.query(SELECT_ALL_TARIFFS_QUERY);
    let resultUserContract = await this.query(
      SELECT_USER_CONTRACT,
      req.decoded.clientId
    );
    await res.json({
      data: {
        resultCode: 0,
        tariffId: resultUserContract[0].Contract_TariffId,
        tariffs
      }
    });
    //.catch(err => console.log(err));
  };

  changeTariffStatus = async (req, res) => {
    let tariffId = req.body.tariffId;

    let results = await this.query(SELECT_USER_CONTRACT, req.decoded.clientId);
    if (results[0].Contract_TariffId === tariffId)
      this.query(UPDATE_USER_CONTRACT, [null, req.decoded.clientId]).then(() =>
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
  };

  getTariffsStat = async (req, res) => {
    let tariffs = await this.query(SELECT_TARIFFS_STAT);
    await res.json({
      data: {
        resultCode: 0,
        tariffs
      }
    });
  };

  getStaff = async (req, res) => {
    let staff = await this.query(SELECT_STAFF);
    await res.json({
      data: {
        resultCode: 0,
        staff
      }
    });
  };

  getAllTariffs = async (req, res) => {
    let tariffs = await this.query(SELECT_ALL_TARIFFS_QUERY);
    await res.json({
      data: {
        resultCode: 0,
        tariffs
      }
    });
  };

  changeTariffInfo = async (req, res) => {
    let { tariffId, tariffName, tariffSpeed, tariffPrice } = req.body;

    await this.query(UPDATE_TARIFF_INFO, [
      tariffName,
      tariffSpeed,
      tariffPrice,
      tariffId
    ]);
    await res.json({
      data: {
        resultCode: 0
      }
    });
  };

  createTariff = async (req, res) => {
    await this.query(CREATE_TARIFF, [
      req.body.tariffName,
      req.body.tariffSpeed,
      req.body.tariffPrice
    ]);
    let result = await this.query(
      "SELECT * FROM Tariff ORDER BY Tariff_Id DESC LIMIT 1"
    );
    await res.json({
      data: {
        resultCode: 0,
        tariffId: result[0].Tariff_Id
      }
    });
  };

  deleteTariff = async (req, res) => {
    await this.query(DELETE_TARIFF, [req.query.tariffId]);
    await res.json({
      data: {
        resultCode: 0
      }
    });
  };

  query = (sql, args) => {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(JSON.parse(JSON.stringify(rows)));
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
    .put(handlers.changeTariffStatus);

  app.get("/tariffsstat", checkToken, checkRole, handlers.getTariffsStat);
  app.get("/staff", checkToken, checkRole, handlers.getStaff);
  app.get("/alltariffs", checkToken, checkRole, handlers.getAllTariffs);
  app.put(
    "/changetariffinfo",
    checkToken,
    checkRole,
    handlers.changeTariffInfo
  );
  app.post("/createtariff", checkToken, checkRole, handlers.createTariff);
  app.delete("/deletetariff", checkToken, checkRole, handlers.deleteTariff);
  app.listen(port, () => {
    console.log("Example app on port 1337!");
  });
}

main();
