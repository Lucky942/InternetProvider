import React from 'react';
import styles from './MainMenu.module.css';
import "../Menu.css"
import classnames from 'classnames';
import {NavLink} from "react-router-dom";

const MainMenu = () => {
    return (
        <div className={classnames(styles.mainMenu, "mainMenu")}>
            <ul>
                <li className={styles.menuItem}>
                    <NavLink to="/tariffs">Тарифы</NavLink>
                </li>
                <li className={styles.menuItem}>
                    <NavLink to="/services">Услуги</NavLink>
                </li>
                <li className={styles.menuItem}>
                    <NavLink to="/help">Помощь</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default MainMenu;