import React from "react";
import "./Menu.css";
import Authorization from "./Authorization/Authorization";
import MainMenu from "./MainMenu/MainMenu";

const Menu = () => {
  return (
    <div className="menu">
      <MainMenu />
      <Authorization />

    </div>
  );
};

export default Menu;
