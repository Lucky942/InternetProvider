import React from "react";
import styles from "../MainMenu.module.css";
import "../../Menu.css";
import classnames from "classnames";
import { NavLink } from "react-router-dom";

const ClientMenu = (props) => {
  return (
    <div className={classnames(styles.mainMenu, "mainMenu")}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <NavLink to="/tariffs" activeClassName={styles.active}>
            Тарифы
          </NavLink>
        </li>
        <li className={styles.menuItem}>
          <NavLink to="/services" activeClassName={styles.active}>
            Услуги
          </NavLink>
        </li>
        <li className={styles.menuItem}>
          <NavLink to="/help" activeClassName={styles.active}>
            Помощь
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default ClientMenu;
