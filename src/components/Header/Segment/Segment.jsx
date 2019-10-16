import styles from "./Segment.module.css";
import React from "react";
import {NavLink} from "react-router-dom";

const Segment = () => {
  return (
    <ul className={styles.segment}>
      <li className={styles.menuItem}>
        <NavLink to="#">Для бизнеса</NavLink>
      </li>
      <li className={styles.menuItem}>
        <NavLink to="#">Для найма</NavLink>
      </li>
      <li className={styles.menuItem}>
        <NavLink to="#">О нас</NavLink>
      </li>
      <li className={styles.menuItem}>
        <NavLink to="#">Интернет-магазин</NavLink>
      </li>
    </ul>
  );
};

export default Segment;
