import React from "react";
import {Route, Switch} from "react-router-dom";
import TariffsContainer from "./ClientPage/Tariffs/TariffsContainer";
import ServicesContainer from "./ClientPage/Services/ServicesContainer";
import LoginContainer from "./Login/LoginContainer";
import TariffsStat from "./AdminPage/Goods/Tariffs/TariffsStatistic/tariffsStat";
import Staff from "./AdminPage/Staff/Staff";
import TariffsMenu from "./AdminPage/Goods/GoodsMenu";
import AllTariffs from "./AdminPage/Goods/Tariffs/AllTariffs/AllTariffs";
import Services from "./AdminPage/Goods/Services/Services";
import Requests from "./MounterPage/Requests";
import SignUp from "./Registration/SignUp";
import Account from "./Account/Account";

function Main() {
  return (
    <div className="main">
        <Switch>
            <Route exact path="/tariffs" component={TariffsContainer}/>
            <Route exact path="/services" component={ServicesContainer}/>
            <Route exact path="/login" component={LoginContainer}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/tariffsmenu" component={TariffsMenu}/>
            <Route exact path="/tariffsstat" component={TariffsStat}/>
            <Route exact path="/alltariffs" component={AllTariffs}/>
            <Route exact path="/allservices" component={Services}/>
            <Route exact path="/requests" component={Requests}/>
            <Route exact path="/staff" component={Staff}/>
            <Route path="/account/:login" component={Account}/>
        </Switch>
    </div>
  );
}

export default Main;
