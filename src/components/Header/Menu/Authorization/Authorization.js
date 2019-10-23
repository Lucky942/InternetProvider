import React from "react";
import styles from "./Authorization.module.css";
import "../Menu.css";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import Authorized from "./Authorized/Authorized";

const Authorization = props => {
  return (
    <div className={classnames(styles.authorization, "authorization")}>
      {props.isAuth ? (
        <Authorized logout={props.logout} userName={props.userName} />
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
