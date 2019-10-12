import React from 'react';
import styles from "./Tariffs.module.css";
import * as axios from 'axios';

let tariffs ;
axios.get("")

const Tariffs = () => {
    return (
        <div className={styles.tariffs}>
            <div className={styles.tariff}></div>
            <div className={styles.tariff}></div>
            <div className={styles.tariff}></div>
            <div className={styles.tariff}></div>
            <div className={styles.tariff}></div>
        </div>
    );
};

export default Tariffs;