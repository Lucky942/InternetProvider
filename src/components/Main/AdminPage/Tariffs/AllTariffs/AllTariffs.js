import React, { useState, useEffect } from "react";
import {
  changeTariffInfo,
  deleteTariff,
  requestAllTariffs
} from "../../../../../redux/tariffsReducer";
import { connect } from "react-redux";
import { getAllTariffs } from "../../../../../redux/Selectors/tariffsSelectors";
import withAuthRedirect from "../../../../../hoc/withAuthRedirect";
import { compose } from "redux";
import TariffsMenu from "../TariffsMenu";
import styles from "./AllTariffs.module.css";
import TariffInfo from "./TariffInfo/TariffInfo";

const AllTariffs = ({
  tariffs,
  requestAllTariffs,
  changeTariffInfo,
  deleteTariff
}) => {
  useEffect(() => {
    requestAllTariffs();
  }, [tariffs]);


  const handleCreate = () => {

  }

  return (
    <div className={styles.container}>
      <TariffsMenu />

      <div className={styles.tariffs}>
        <table>
          <tr>
            <th>Номер</th>
            <th>Название тарифа</th>
            <th>Максимальная скорость</th>
            <th>Цена</th>
          </tr>
          {tariffs.map((elem, i) => (
            <tr>
              <TariffInfo
                i={i + 1}
                key={elem.Tariff_Id}
                id={elem.Tariff_Id}
                name={elem.Tariff_Name}
                maxSpeed={elem.Tariff_MaxSpeed}
                price={elem.Tariff_Price}
                changeTariffInfo={changeTariffInfo}
                deleteTariff={deleteTariff}
              />
            </tr>
          ))}
        </table>
        <button onClick={handleCreate}>Создать новый тариф</button>
      </div>
    </div>
  );
};

let mapStateToProps = state => {
  return {
    tariffs: getAllTariffs(state)
  };
};

export default compose(
  connect(
    mapStateToProps,
    { requestAllTariffs, changeTariffInfo, deleteTariff }
  ),
  withAuthRedirect
)(AllTariffs);
