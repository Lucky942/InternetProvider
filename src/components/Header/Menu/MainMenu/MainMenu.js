import React from "react";
import "../Menu.css";
import {connect} from "react-redux";
import ClientMenu from "./ClientMenu/ClientMenu";
import AdminMenu from "./AdminMenu/AdminMenu";
import MounterMenu from "./MounterMenu/MounterMenu";

const MainMenu = ({userRole}) => {
  return (
      ((userRole === "admin" && <AdminMenu/>) || (userRole === "mounter" && <MounterMenu/>) || <ClientMenu />)
  );
};

const mapStateToProps = (state) => {
  return {
    userRole: state.auth.userRole
  }
};



export default connect(mapStateToProps, {}) (MainMenu);
