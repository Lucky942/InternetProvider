import React from "react";
import styles from "./Service.module.css"

const Service = ({serviceName, servicePrice}) => {
  return (
    <div className={styles.service}>
        <h3>Тариф - {serviceName}</h3>
        <div>Стоимость тарифа - {servicePrice}</div>
    </div>
  );
};

export default Service;
