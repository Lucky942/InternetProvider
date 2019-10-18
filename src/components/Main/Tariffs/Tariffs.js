import React from "react";
import styles from "./Tariffs.module.css";
import Tariff from "./Tariff/Tariff";

const Tariffs = props => {
  return (
    <div className={styles.tariffs}>
      {props.tariffs.map((elem, i) => (
        <Tariff
          key={i}
          tariffName={elem.Tariff_Name}
          tariffSpeed={elem.Tariff_MaxSpeed}
          tariffPrice={elem.Tariff_Price}
        />
      ))}
    </div>
  );
};

export default Tariffs;
