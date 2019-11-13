import React, { useState } from "react";
import styles from "./Tariff.module.css";
import * as classnames from "classnames";
import withModalWindow from "../../../../../hoc/withModalWindow";

const Tariff = ({
  tariffName,
  tariffSpeed,
  tariffPrice,
  connected,
  changeTariffStatus,
  tariffId,
  classStatusTariffId,
  showHint,
  openModal,
  i
}) => {
  const handleChanger = () => {
    // if (tariffId && !connected) toggleClass(true);
    showHint(tariffId);
    changeTariffStatus(tariffId);
  };

  const handleOpenModal = () => {
    openModal();
  };

  return (
    <div className={styles.tariff}>
      <h3 className={classnames(styles.tariffName, styles.paragraph)}>
        {tariffName}
      </h3>
      <div className={classnames(styles.maxSpeed, styles.paragraph)}>
          <div>Интернет</div>
         {tariffSpeed} <span className={styles.speedUnit}>Мбит/с</span>
      </div>
      {/*<div className={classnames(styles.tariffPrice, styles.paragraph)}>{tariffPrice} руб/мес </div>*/}
      <button
        className={classnames(
          styles.btn,
          classStatusTariffId === tariffId ? styles.clicked : "null"
        )}
        onClick={openModal ? handleOpenModal : handleChanger}
      >
        {connected ? "Отключить" : "Подключить"}
      </button>
      <div className={styles.price}>
        <div className={styles.tariffPrice}>{tariffPrice}</div>
        <div className={styles.priceUnits}>
          <div className={styles.priceUnit1}>руб</div>
          <div className={styles.priceUnit2}>мес</div>
        </div>
      </div>
    </div>
  );
};

export default withModalWindow(Tariff);
