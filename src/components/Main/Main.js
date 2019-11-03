import React from "react";
import {Route, Switch} from "react-router-dom";
import TariffsContainer from "./ClientPage/Tariffs/TariffsContainer";
import ServicesContainer from "./ClientPage/Services/ServicesContainer";
import LoginContainer from "./Login/LoginContainer";
import SignUpContainer from "./Registration/SignUpContainer";
import TariffsStat from "./AdminPage/Goods/Tariffs/TariffsStatistic/tariffsStat";
import Staff from "./AdminPage/Staff/Staff";
import TariffsMenu from "./AdminPage/Goods/GoodsMenu";
import AllTariffs from "./AdminPage/Goods/Tariffs/AllTariffs/AllTariffs";
import Services from "./AdminPage/Goods/Services/Services";
import Requests from "./MounterPage/Requests";

function Main() {
  return (
    <div className="main">
        <Switch>
            <Route exact path="/tariffs" render={() => <TariffsContainer/>}/>
            <Route exact path="/services" render={() => <ServicesContainer/>}/>
            <Route exact path="/login" render={() => <LoginContainer/>}/>
            <Route exact path="/signup" render={() => <SignUpContainer/>}/>
            <Route exact path="/tariffsmenu" render={() => <TariffsMenu/>}/>
            <Route exact path="/tariffsstat" render={() => <TariffsStat/>}/>
            <Route exact path="/alltariffs" render={() => <AllTariffs/>}/>
            <Route exact path="/allservices" render={() => <Services/>}/>
            <Route exact path="/requests" render={() => <Requests/>}/>
            <Route exact path="/staff" render={() => <Staff/>}/>
        </Switch>
    </div>
  );
}

export default Main;
