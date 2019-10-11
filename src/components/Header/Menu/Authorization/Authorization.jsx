import React from "react";
import styles from "./Authorization.module.css";
import "../Menu.css"
import classnames from "classnames";

const Authorization = () => {
  return (
    <div className={classnames(styles.authorization, "authorization")}>
      <ul className={styles.login}>
        <li className={styles.menuItem}>
          <a href="#">Войти</a>
        </li>
        <li className={styles.menuItem}>
          <a href="#">Зарегистрироваться</a>
        </li>
      </ul>
    </div>
  );
};

export default Authorization;
