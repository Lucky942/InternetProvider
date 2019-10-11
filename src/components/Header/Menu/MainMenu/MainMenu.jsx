import React from 'react';
import styles from './MainMenu.module.css';
import "../Menu.css"
import classnames from 'classnames';

const MainMenu = () => {
    return (
        <div className={classnames(styles.mainMenu, "mainMenu")}>
            <ul>
                <li className={styles.menuItem}>
                    <a href="./tarriff">Тарифы</a>
                </li>
                <li className={styles.menuItem}>
                    <a href="./services">Услуги</a>
                </li>
                <li className={styles.menuItem}>
                    <a href="./help">Помощь</a>
                </li>
            </ul>
        </div>
    );
};

export default MainMenu;