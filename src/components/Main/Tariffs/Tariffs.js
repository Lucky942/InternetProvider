import React from "react";
import styles from "./Tariffs.module.css";
import Tariff from "./Tariff/Tariff";

const Tariffs = React.memo(({tariffs, tariffId, changeTariffStatus}) => {

  return (
    <div className={styles.tariffs}>
      {tariffs.map((elem, i) =>
        tariffId - 1 === i ? (
          <Tariff
            key={i}
            i={i}
            tariffId={tariffId}
            tariffName={elem.Tariff_Name}
            tariffSpeed={elem.Tariff_MaxSpeed}
            tariffPrice={elem.Tariff_Price}
            changeTariffStatus={changeTariffStatus}
          />
        ) : (
          <Tariff
            key={i}
            i={i}
            tariffName={elem.Tariff_Name}
            tariffSpeed={elem.Tariff_MaxSpeed}
            tariffPrice={elem.Tariff_Price}
            changeTariffStatus={changeTariffStatus}
          />
        )
      )}
    </div>
  );
});

export default Tariffs;
