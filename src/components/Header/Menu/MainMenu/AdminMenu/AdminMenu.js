import React from "react";
import styles from "../MainMenu.module.css";
import "../../Menu.css";
import classnames from "classnames";
import { NavLink } from "react-router-dom";

const AdminMenu = (props) => {
  return (
    <div className={classnames(styles.mainMenu, "mainMenu")}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <NavLink to="/tariffsmenu" activeClassName={styles.active}>
            Тарифы
          </NavLink>
        </li>
        <li className={styles.menuItem}>
          <NavLink to="/staff" activeClassName={styles.active}>
            Персонал
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

export default AdminMenu;
