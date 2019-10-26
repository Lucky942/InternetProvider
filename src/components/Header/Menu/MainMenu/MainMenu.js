import React from "react";
import "../Menu.css";
import {connect} from "react-redux";
import ClientMenu from "./ClientMenu/ClientMenu";
import AdminMenu from "./AdminMenu/AdminMenu";

const MainMenu = ({userRole}) => {
  return (
      ((userRole === "admin" && <AdminMenu/>) || <ClientMenu />)
  );
};

const mapStateToProps = (state) => {
  return {
    userRole: state.auth.userRole
  }
};



export default connect(mapStateToProps, {}) (MainMenu);
