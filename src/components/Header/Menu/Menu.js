import React from "react";
import "./Menu.css";
import Authorization from "./Authorization/Authorization";
import MainMenu from "./MainMenu/MainMenu";
import AuthorizationContainer from "./Authorization/AuthorizationContainer";

const Menu = () => {
  return (
    <div className="menu">
      <MainMenu />
      <AuthorizationContainer />

    </div>
  );
};

export default Menu;
