import React, { useState, useEffect } from "react";
import {
  changeTariffInfo,
  createTariff,
  deleteTariff,
  requestAllTariffs
} from "../../../../../../redux/tariffsReducer";
import { connect } from "react-redux";
import { getAllTariffs } from "../../../../../../redux/Selectors/tariffsSelectors";
import withAuthRedirect from "../../../../../../hoc/withAuthRedirect";
import { compose } from "redux";
import TariffsMenu from "../../GoodsMenu";
import styles from "./AllTariffs.module.css";
import TariffInfo from "./TariffInfo/TariffInfo";
import TariffForm from "./TariffForm/TariffForm";
import { NavLink } from "react-router-dom";
import routeProtecter from "../../../../../../hoc/routeProtecter";

const AllTariffs = ({
  tariffs,
  requestAllTariffs,
  changeTariffInfo,
  deleteTariff,
  createTariff
}) => {
  useEffect(() => {
    requestAllTariffs();
  }, []);

  const [tariffCreate, setTariffCreate] = useState(false);

  const onCreate = () => {
    setTariffCreate(!tariffCreate);
  };

  const submit = formData => {
    createTariff(
      formData.tariffName,
      formData.tariffSpeed,
      formData.tariffPrice
    );
    setTariffCreate(!tariffCreate);
  };

  return (
    <div className={styles.container}>
      <TariffsMenu />

      <div className={styles.tariffs}>
        <table>
          <tbody>
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
          </tbody>
        </table>
        {!tariffCreate && (
          <button className={styles.addTariff} onClick={onCreate}>
            Добавить новый тариф
          </button>
        )}
        {tariffCreate && (
          <TariffForm onSubmit={submit} cancelCreate={onCreate} />
        )}
        <div className={styles.links}>
          <NavLink className={styles.tariffsStat} to={"tariffsstat"}>
            Статистика использования
          </NavLink>
        </div>
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
    { requestAllTariffs, changeTariffInfo, deleteTariff, createTariff }
  ),
  routeProtecter,
  withAuthRedirect
)(AllTariffs);
