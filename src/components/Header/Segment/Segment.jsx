import styles from "./Segment.module.css";
import React from "react";

const Segment = () => {
  return (
    <ul className={styles.segment}>
      <li className={styles.menuItem}>
        <a href="#">Для бизнеса</a>
      </li>
      <li className={styles.menuItem}>
        <a href="#">Для найма</a>
      </li>
      <li className={styles.menuItem}>
        <a href="#">О нас</a>
      </li>
      <li className={styles.menuItem}>
        <a href="#">Интернет-магазин</a>
      </li>
    </ul>
  );
};

export default Segment;
