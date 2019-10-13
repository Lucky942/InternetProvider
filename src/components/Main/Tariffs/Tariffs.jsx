import React from "react";
import styles from "./Tariffs.module.css";

const Tariffs = props => {
  let renderTariff = ({
    Tariff_Id,
    Tariff_Name,
    Tariff_MaxSpeed,
    Tariff_Price
  }) => (
    <div key={Tariff_Id}>
      Tariff - {Tariff_Name}
      TariffSpeed - {Tariff_MaxSpeed}
      TariffPrice - {Tariff_Price}
    </div>
  );

  return (
    <div className={styles.tariffs}>{props.tariffs.map(renderTariff)}</div>
  );
};

export default Tariffs;
