import React from "react";
import styles from "./Tariff.module.css";

const Tariff = ({ tariffName, tariffSpeed, tariffPrice, tariffId, changeTariffStatus, i }) => {
    console.log(tariffName + " " + i);
    let handleClick = () => {
        changeTariffStatus(i + 1);
    };

  return (
    <div className={styles.tariff}>
      <h3>Тариф - {tariffName}</h3>
      <p>Максимальная скорость {tariffSpeed}</p>
      <div>Стоимость тарифа - {tariffPrice}</div>
      <button className={styles.btn} onClick={handleClick}>{tariffId ?  "Отключить" : "Подключить"}</button>
    </div>
  );
};

export default Tariff;
