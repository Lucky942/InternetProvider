import React from "react";
import styles from "./Tariff.module.css";

const Tariff = ({tariffName, tariffSpeed, tariffPrice}) => {
  return (
    <div className={styles.tariff}>
        <h3>Тариф - {tariffName}</h3>
        <p>Максимальная скорость {tariffSpeed}</p>
        <div>Стоимость тарифа - {tariffPrice}</div>
    </div>
  );
};

export default Tariff;
