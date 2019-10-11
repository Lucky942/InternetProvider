import React from "react";
import styles from "./Header.module.css";
import classnames from "classnames";

function Header() {
  return (
    <div className={classnames("header", styles.header)}>
      <ul className={styles.segment}>
        <li className={styles.menuItem}><a href="#">Для бизнеса</a></li>
        <li className={styles.menuItem}><a href="#">Для найма</a></li>
        <li className={styles.menuItem}><a href="#">О нас</a></li>
      </ul>

      <ul className={styles.login}>
        <li className={styles.menuItem}><a href="#">Войти</a></li>
        <li className={styles.menuItem}><a href="#">Зарегистрироваться</a></li>
      </ul>
    </div>
  );
}

export default Header;
