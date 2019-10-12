import React from "react";
import Services from "./Services/Services";
import Tariffs from "./Tariffs/Tariffs";
import { Route } from "react-router-dom";

function Main() {
  return (
    <div className="main">
      {/*<Route path="" render={() => <p>Main</p>}/>*/}
        <Route exact path="/tariffs" component={Tariffs} />
        <Route exact path="/services" component={Services} />
    </div>
  );
}

export default Main;
