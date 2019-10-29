import React from 'react';
import styles from './TariffsMenu.module.css';
import {NavLink} from "react-router-dom";
import withAuthRedirect from "../../../../hoc/withAuthRedirect";
import {compose} from "redux";

const TariffsMenu = () => {
    return(
        <div className={styles.container}>
            <ul className={styles.tariffsMenu}>
                <li><NavLink to={"/alltariffs"}>Все тарифы</NavLink></li>
                <li><NavLink to={"/tariffsstat"}>Стастика по использованию тарифов</NavLink></li>
                <li><NavLink to={"/edittariffs"}>Редактировать список тарифов</NavLink></li>
            </ul>
        </div>
    );
};

export default compose(withAuthRedirect) (TariffsMenu);