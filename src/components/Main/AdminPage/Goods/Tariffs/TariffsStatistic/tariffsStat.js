import React, {  useEffect } from "react";
import { requestTariffsStat } from "../../../../../../redux/tariffsReducer";
import { connect } from "react-redux";
import {getTariffsStat} from "../../../../../../redux/Selectors/tariffsSelectors";
import styles from "./tariffsStat.module.css";
import withAuthRedirect from "../../../../../../hoc/withAuthRedirect";
import { compose } from "redux";
import TariffsMenu from "../../GoodsMenu";

const TariffsStat = ({ tariffs, getTariffsStat }) => {
  useEffect(() => {
    getTariffsStat();
  }, [getTariffsStat]);

  return (
    <div className={styles.container}>
      <TariffsMenu/>

      <div className={styles.tariffs}>
        <table>
          <tbody>
            <tr>
              <th>Название тарифа</th>
              <th>Количество пользователей</th>
              <th>Максимальная скорость</th>
              <th>Цена</th>
            </tr>
            {tariffs.map((elem, index) => (
                <tr key={index}>
                  <td>{elem.Tariff_Name}</td>
                  <td>{elem.Amount}</td>
                  <td>{elem.Tariff_MaxSpeed}</td>
                  <td>{elem.Tariff_Price}</td>
                </tr>
            ))}
          </tbody>
        </table>
        
      </div>

    </div>
  );
};

let mapStateToProps = state => {
  return {
    tariffs: getTariffsStat(state)
  };
};

export default compose(
  connect(
    mapStateToProps,
    { getTariffsStat: requestTariffsStat }
  ),
  withAuthRedirect
)(TariffsStat);
