import React from "react";
import { Route } from "react-router-dom";
import TariffsContainer from "./Tariffs/TariffsContainer";
import ServicesContainer from "./Services/ServicesContainer";
import Login from "./Login/Login";

function Main() {
  return (
    <div className="main">
      {/*<Route path="" render={() => <p>Main</p>}/>*/}
        <Route exact path="/tariffs" render={() => <TariffsContainer />} />
        <Route exact path="/services" render={() => <ServicesContainer /> } />
        <Route exact path="/login" render={() => <Login /> } />
    </div>
  );
}

export default Main;
