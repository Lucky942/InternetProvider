import React from "react";
import {Route, Switch} from "react-router-dom";
import TariffsContainer from "./Tariffs/TariffsContainer";
import ServicesContainer from "./Services/ServicesContainer";
import LoginContainer from "./Login/LoginContainer";
import SignUpContainer from "./Registration/SignUpContainer";
import TariffsStat from "./AdminPage/TariffsStatistic/tariffsStat";
import Staff from "./AdminPage/Staff/Staff";

function Main() {
  return (
    <div className="main">
      {/*<Route path="" render={() => <p>Main</p>}/>*/}

        <Switch>
            <Route exact path="/tariffs" render={() => <TariffsContainer/>}/>
            <Route exact path="/services" render={() => <ServicesContainer/>}/>
            <Route exact path="/login" render={() => <LoginContainer/>}/>
            <Route exact path="/signup" render={() => <SignUpContainer/>}/>
            <Route exact path="/tariffsstat" render={() => <TariffsStat/>}/>
            <Route exact path="/staff" render={() => <Staff/>}/>
        </Switch>

    </div>
  );
}

export default Main;
