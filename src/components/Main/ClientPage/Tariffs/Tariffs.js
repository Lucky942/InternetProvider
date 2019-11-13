import React, { useState } from "react";
import styles from "./Tariffs.module.css";
import Tariff from "./Tariff/Tariff";

const Tariffs = props => {
  let [classStatusTariffId, toggleClass] = useState(null);

  let showHint = tariffId => {
    debugger;
    if (props.connectedTariffId && tariffId !== props.connectedTariffId) {
      toggleClass(tariffId);
    } else {
      toggleClass(null);
    }
  };

  // props.connectedTariffId
  return (
      <>
        <h1 className={styles.title}>Список доступных тарифов</h1>
        <div className={styles.tariffs}>
          {props.tariffs.map((elem, i) => {
            return (
                <Tariff
                    tariffId={elem.Tariff_Id}
                    connected={elem.connected}
                    key={i}
                    i={i}
                    tariffName={elem.Tariff_Name}
                    tariffSpeed={elem.Tariff_MaxSpeed}
                    tariffPrice={elem.Tariff_Price}
                    changeTariffStatus={props.changeTariffStatus}
                    classStatusTariffId={classStatusTariffId}
                    showHint={showHint}
                />
            );
          })}
        </div>
      </>

  );
};

export default Tariffs;
