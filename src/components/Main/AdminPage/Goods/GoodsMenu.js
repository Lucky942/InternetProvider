import React from "react";
import styles from "./GoodsMenu.module.css";
import { NavLink } from "react-router-dom";
import withAuthRedirect from "../../../../hoc/withAuthRedirect";
import { compose } from "redux";
import {adminRouteProtecter} from "../../../../hoc/routeProtecter";

const GoodsMenu = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.tariffsMenu}>
        <li>
          <NavLink to={"/alltariffs"}>Тарифы</NavLink>
        </li>
        <li>
          <NavLink to={"/allservices"}>Услуги</NavLink>
        </li>
        <li>
          <NavLink to={"/equipment"}>Оборудование</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default compose(
  adminRouteProtecter,
  withAuthRedirect
)(GoodsMenu);
