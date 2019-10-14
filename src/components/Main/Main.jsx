import React from "react";
import Services from "./Services/Services";
import { Route } from "react-router-dom";
import TariffsContainer from "./Tariffs/TariffsContainer";
import ServicesContainer from "./Services/ServicesContainer";

function Main() {
  return (
    <div className="main">
      {/*<Route path="" render={() => <p>Main</p>}/>*/}
        <Route exact path="/tariffs" render={() => <TariffsContainer />} />
        <Route exact path="/services" render={() => <ServicesContainer /> } />
    </div>
  );
}

export default Main;
