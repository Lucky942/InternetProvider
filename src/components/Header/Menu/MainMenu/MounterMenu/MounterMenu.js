import React from "react";
import styles from "../MainMenu.module.css";
import "../../Menu.css";
import classnames from "classnames";
import { NavLink } from "react-router-dom";

const MounterMenu = (props) => {
  return (
      <div className={classnames(styles.mainMenu, "mainMenu")}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <NavLink to="/requests" activeClassName={styles.active}>
              Запросы
            </NavLink>
          </li>
        </ul>
      </div>
  );
};

export default MounterMenu;
