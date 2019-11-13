const express = require("express");
const cors = require("cors");
let jwt = require("jsonwebtoken");
const {
  checkAdminRole,
  checkMounterRole
} = require("./authorization/checkRole");
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
// REQUESTS
const ORDERS_OF_EQUIPMENT =
  "SELECT Equipment_Id as Id,Equipment_Name as Name,sum(Equipment_Amount) as Quantity, sum(Equipment_Amount) * Equipment_Price as Price FROM EquipmentInOrders\n" +
  "Join Equipment using(Equipment_Id)  \n" +
  "Join ServiceOrder using(Order_Id) where year(Order_Date)=?\n" +
  "Group by Equipment_Id";
const MOUNTERS_YEAR_REPORT =
  "SELECT Mounter_Id as Id, Mounter_FirstName as FirstName, Mounter_LastName as LastName, Count(*) as Quantity,sum(Order_Price) as TotalCost\n" +
  "FROM ServiceOrder\n" +
  "JOIN Mounter ON Mounter.Mounter_Id = ServiceOrder.Order_MounterId\n" +
  "where year(Order_Date)= ?\n" +
  "Group By Mounter_Id";
const LONGEST_TIME_MOUNTER =
  "SELECT Mounter_Id as Id, Mounter_FirstName as FirstName, Mounter_LastName as LastName, Mounter_Passport as Passport, Mounter_Birthday\n" +
  "as Birthday, Mounter_EmploymentDate as EmploymentDate FROM Mounter Where Mounter_EmploymentDate = (SELECT MIN(Mounter_EmploymentDate) FROM Mounter)";
const EXPENSIVE_ORDER_MOUNTER_INFO =
  "SELECT Mounter_Id as Id,Mounter_FirstName as FirstName,Mounter_LastName as LastName,Mounter_Passport as Passport,Mounter_Birthday as Birthday, Mounter_EmploymentDate as EmploymentDate, Order_Price as Price\n" +
  " FROM ServiceOrder join Mounter on ServiceOrder.Order_MounterId = Mounter.Mounter_Id\n" +
  "Where Order_Price = (Select max(Order_Price) from  ServiceOrder where year(Order_Date) = ?)";

const NO_ORDERS_MOUNTER =
  "SELECT Mounter_Id as Id,Mounter_FirstName as FirstName,Mounter_LastName as LastName,Mounter_Birthday as Birthday,\n" +
  "Mounter_EmploymentDate as EmploymentDate FROM ServiceOrder \n" +
  "right join Mounter on ServiceOrder.Order_MounterId = Mounter.Mounter_Id\n" +
  "Where Order_Id is Null";

const NO_ORDERS_MONTH_MOUNTER =
  "SELECT Mounter_Id as Id, Mounter_FirstName as FirstName, Mounter_LastName as LastName, Mounter_Passport as Passport ,Mounter_Birthday as Birthday,\n" +
  "Mounter_EmploymentDate as EmploymentDate\n" +
  " FROM Mounter left join (Select * From ServiceOrder Where year(Order_Date)=? and month(Order_Date) = ?) ex2017_03\n" +
  "on ex2017_03.Order_MounterId = Mounter.Mounter_Id\n" +
  "Where Order_Id Is NULL";

// createNewUser signUP
const CREATE_NEW_USER =
  "INSERT INTO Users (User_Login, User_Password, User_ClientId, User_Role) Values(?,?, null, ?)";

//createNewClient
const CREATE_NEW_CLIENT =
  "INSERT Into Client (Client_FirstName, Client_LastName, Client_Passport, Client_Birthday) VALUES(?,?,?,?);";
const FIND_NEW_CLIENT =
  "SELECT Client_Id from Client Where Client_Passport = ?";
const CREATE_NEW_CONTRACT =
  "insert into Contract(Contract_ClientId, Contract_ConclusionDate, Contract_TerminationDate, Contract_TariffId)\n" +
  "values\n" +
  "( ?, ?, null, null)";
const UPDATE_USER_INFO =
  "UPDATE Users SET User_ClientId = ?, User_Role = ? Where User_Login = ?";

// getAccountInfo
const GET_TARIFF_BY_ID = "SELECT Tariff_Name as tariffName, Tariff_MaxSpeed as tariffSpeed, Tariff_Price as tariffPrice FROM Tariff WHERE Tariff_Id = ?";

class HandlerGenerator {
  constructor(props) {
    this.connection = require("./db/dbconnect");
  }

  //USER
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

  signUp = async (req, res) => {
    let { login, password } = req.body;
    let results = await this.query(SELECT_ALL_USERS);
    let userWithLogin = results.find(user => user.User_Login === login);

    if (userWithLogin) {
      await res.json({
        resultCode: 1
      });
    } else {
      let userRole = "guest";
      await this.connection.query(CREATE_NEW_USER, [login, password, userRole]);

      let token = jwt.sign({ login, userRole }, secret, { expiresIn: "24h" });

      await res.json({
        resultCode: 0,
        token,
        login,
        userRole
      });
    }
  };

  createNewClient = async (req, res) => {
    // clientData
    let { firstName, lastName, passport, birthday } = req.body;

    // create New Client

    await this.query(CREATE_NEW_CLIENT, [
      firstName,
      lastName,
      passport,
      birthday
    ]);

    let results = await this.query(FIND_NEW_CLIENT, [passport]);
    let clientId = results[0].Client_Id;

    // update User

    let userRole = "client",
      login = req.decoded.login;
    await this.connection.query(UPDATE_USER_INFO, [clientId, userRole, login]);

    // createNewContract

    let todayDate = new Date()
      .toISOString()
      .slice(0, 10)
      .replace("T", " ");
    await this.connection.query(CREATE_NEW_CONTRACT, [clientId, todayDate]);

    // return the JWT token for the future API calls
    let token = jwt.sign({ clientId, login, userRole }, secret, {
      expiresIn: "24h"
    });

    await res.json({
      resultCode: 0,
      clientId,
      login,
      token,
      userRole
    });

    //return tariffs
    /*    let tariffs = await this.query(SELECT_ALL_TARIFFS_QUERY);

    let resultUserContract =  await this.query(SELECT_USER_CONTRACT, newClientId);

    let tariffId = resultUserContract[0].Contract_TariffId;*/
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

  //CLIENT

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

    let resultUserContract = req.decoded.clientId
      ? await this.query(SELECT_USER_CONTRACT, req.decoded.clientId)
      : null;

    let tariffId = resultUserContract
      ? resultUserContract[0].Contract_TariffId
      : null;
    await res.json({
      data: {
        resultCode: 0,
        tariffId,
        tariffs
      }
    });
    //.catch(err => console.log(err));
  };

  // ADMIN

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

  //MOUNTER

  getEquipmentStat = async (req, res) => {
    let equipmentStat = await this.query(ORDERS_OF_EQUIPMENT, [req.query.year]);
    await res.json({
      data: {
        resultCode: 0,
        equipmentStat
      }
    });
  };

  getMountersReport = async (req, res) => {
    let mountersWorkReport = await this.query(MOUNTERS_YEAR_REPORT, [
      req.query.year
    ]);
    await res.json({
      data: {
        resultCode: 0,
        mountersWorkReport
      }
    });
  };

  getLongestTimeMounter = async (req, res) => {
    let longestTimeMounterInfo = await this.query(LONGEST_TIME_MOUNTER);
    await res.json({
      data: {
        resultCode: 0,
        longestTimeMounterInfo
      }
    });
  };

  getNoOrdersMounterInfo = async (req, res) => {
    let noOrdersMounterInfo = await this.query(NO_ORDERS_MOUNTER);
    await res.json({
      data: {
        resultCode: 0,
        noOrdersMounterInfo
      }
    });
  };

  getExpensiveOrderMounterInfo = async (req, res) => {
    let expensiveOrderMounterInfo = await this.query(
      EXPENSIVE_ORDER_MOUNTER_INFO,
      [req.query.year]
    );
    await res.json({
      data: {
        resultCode: 0,
        expensiveOrderMounterInfo
      }
    });
  };

  getNoOrdersMonthMounterInfo = async (req, res) => {
    let noOrdersMonthMounterInfo = await this.query(NO_ORDERS_MONTH_MOUNTER, [
      req.query.year,
      req.query.month
    ]);
    await res.json({
      data: {
        resultCode: 0,
        noOrdersMonthMounterInfo
      }
    });
  };

  getAccountInfo = async (req, res) => {
    let { clientId, login, token, userRole } = req.decoded;

    if (clientId) {
      let contract = await this.query(SELECT_USER_CONTRACT, [clientId]);
      let tariff = (await this.query(GET_TARIFF_BY_ID, [contract[0].Contract_TariffId]))[0];
      await res.json({
        data: {
          resultCode: 0,
          conclusionDate: contract[0].Contract_ConclusionDate,
          tariff
        }
      });
    }
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
  app.post("/signup", handlers.signUp);
  app.post("/createnewclient", checkToken, handlers.createNewClient);

  app.get("/services", checkToken, handlers.getServices);
  app.get("/auth/me", checkToken, handlers.authMe);
  /*  app.get("/tariffs", checkToken, handlers.getTariffs);
  app.put("/tariffs", checkToken, handlers.changeTariff);*/
  app.all("/tariffs", checkToken);
  app
    .route("/tariffs")
    .get(handlers.getTariffs)
    .put(handlers.changeTariffStatus);
  //Admin routes
  app.get("/tariffsstat", checkToken, checkAdminRole, handlers.getTariffsStat);
  app.get("/staff", checkToken, checkAdminRole, handlers.getStaff);
  app.get("/alltariffs", checkToken, checkAdminRole, handlers.getAllTariffs);
  app.put(
    "/changetariffinfo",
    checkToken,
    checkAdminRole,
    handlers.changeTariffInfo
  );
  app.post("/createtariff", checkToken, checkAdminRole, handlers.createTariff);
  app.delete(
    "/deletetariff",
    checkToken,
    checkAdminRole,
    handlers.deleteTariff
  );

  //Mounter routes
  app.get(
    "/equipmentstat",
    checkToken,
    checkMounterRole,
    handlers.getEquipmentStat
  );

  app.get(
    "/mountersworkreport",
    checkToken,
    checkMounterRole,
    handlers.getMountersReport
  );

  app.get(
    "/longesttimemounter",
    checkToken,
    checkMounterRole,
    handlers.getLongestTimeMounter
  );

  app.get(
    "/noordersmounter",
    checkToken,
    checkMounterRole,
    handlers.getNoOrdersMounterInfo
  );

  app.get(
    "/expensiveordermounterinfo",
    checkToken,
    checkMounterRole,
    handlers.getExpensiveOrderMounterInfo
  );

  app.get(
    "/nomonthordersmounterinfo",
    checkToken,
    checkMounterRole,
    handlers.getNoOrdersMonthMounterInfo
  );

  // account Info

  app.get("/account", checkToken, handlers.getAccountInfo);

  app.listen(port, () => {
    console.log("Example app on port 1337!");
  });
}

main();
