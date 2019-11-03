import React from "react";
import styles from "./Tariffs.module.css";
import Tariff from "./Tariff/Tariff";

const Tariffs = props => {
  return (
    <div className={styles.tariffs}>
      {props.tariffs.map(
        (elem, i) => {
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
            />
          );
        }
        /*props.tariffId - 1 === i ? (
          <Tariff
            key={i}
            i={i}
            tariffId={props.tariffId}
            tariffName={elem.Tariff_Name}
            tariffSpeed={elem.Tariff_MaxSpeed}
            tariffPrice={elem.Tariff_Price}
            changeTariffStatus={props.changeTariffStatus}
          />
        ) : (
          <Tariff
            key={i}
            i={i}
            tariffName={elem.Tariff_Name}
            tariffSpeed={elem.Tariff_MaxSpeed}
            tariffPrice={elem.Tariff_Price}
            changeTariffStatus={props.changeTariffStatus}
          />
        )*/
      )}
    </div>
  );
};

export default Tariffs;
