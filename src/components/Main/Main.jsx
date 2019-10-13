import React from "react";
import Services from "./Services/Services";
import { Route } from "react-router-dom";
import TariffsContainer from "./Tariffs/TariffsContainer";

function Main() {
  return (
    <div className="main">
      {/*<Route path="" render={() => <p>Main</p>}/>*/}
        <Route exact path="/tariffs" component={TariffsContainer} />
        <Route exact path="/services" component={Services} />
    </div>
  );
}

export default Main;
