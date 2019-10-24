import React from "react";
import styles from "./Authorization.module.css";
import "../Menu.css";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import Authorized from "./Authorized/Authorized";

const Authorization = ({logout, userName, isAuth}) => {
  return (
    <div className={classnames(styles.authorization, "authorization")}>
      {isAuth ? (
        <Authorized logout={logout} userName={userName} />
      ) : (
        <ul className={styles.login}>
          <li className={styles.menuItem}>
            <NavLink to="/login">Войти</NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink to="/signup">Зарегистрироваться</NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Authorization;
