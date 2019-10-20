import React from "react";
import "./Menu.css";
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
