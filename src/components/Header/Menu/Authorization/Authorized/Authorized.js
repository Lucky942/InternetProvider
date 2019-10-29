import React from "react";
import "../../Menu.css";
import classnames from "classnames";
import styles from "./Authorized.module.css";
import {NavLink} from "react-router-dom";

const Authorized = ({logout, userName}) => {
  let handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.authorized}>
      {userName}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Authorized;
