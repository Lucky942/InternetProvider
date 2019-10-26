import React, {useState, useEffect} from "react";
import { getTariffsStat } from "../../../../redux/tariffsReducer";
import { connect } from "react-redux";
import {getTariffs} from "../../../../redux/Selectors/tariffsSelectors";
import styles from "./tariffsStat.module.css"

const TariffsStat = ({tariffs, getTariffsStat}) => {

  useEffect(() => {
    getTariffsStat();
    console.log(tariffs)
  },[]);

  return (

    <table className={styles.tariffs}>
      <tr>
        <th>Название тарифа</th>
        <th>Количество пользователей</th>
        <th>Максимальная скорость</th>
        <th>Цена</th>
      </tr>
      {tariffs.map(elem => <tr>
        <td>{elem.Tariff_Name}</td>
        <td>{elem.Amount}</td>
        <td>{elem.Tariff_MaxSpeed}</td>
        <td>{elem.Tariff_Price}</td>
      </tr>)}
    </table>
  );
};

let mapStateToProps = state => {
  return {
    tariffs: getTariffs(state)
  };
};

export default connect(
  mapStateToProps,
  { getTariffsStat }
)(TariffsStat);
