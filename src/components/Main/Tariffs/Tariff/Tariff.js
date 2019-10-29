import React, {useState} from "react";
import styles from "./Tariff.module.css";
import * as classnames from "classnames";

const Tariff = ({ tariffName, tariffSpeed, tariffPrice, connected, changeTariffStatus, tariffId, i }) => {

    let [clicked, setCLick] = useState(false);


    let handleClick = () => {
        if(tariffId !== i + 1 && tariffId)
            setCLick(true);
        changeTariffStatus(i + 1);
    };

  return (
    <div className={styles.tariff}>
      <h3>Тариф - {tariffName}</h3>
      <p>Максимальная скорость {tariffSpeed}</p>
      <div>Стоимость тарифа - {tariffPrice}</div>
      <button className={classnames(styles.btn, clicked ? styles.clicked : null) } onClick={handleClick}>{connected ?  "Отключить" : "Подключить"}</button>
    </div>
  );
};

export default Tariff;
