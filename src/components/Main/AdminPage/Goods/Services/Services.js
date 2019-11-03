import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getAdminServices,
  getServices
} from "../../../../../redux/servicesReducer";
import { compose } from "redux";
import withAuthRedirect from "../../../../../hoc/withAuthRedirect";
import styles from "./Services.module.css";
import TariffsMenu from "../GoodsMenu";
import ServiceInfo from "./ServiceInfo/ServiceInfo";
import {adminRouteProtecter} from "../../../../../hoc/routeProtecter";

const Services = ({ services, getServices }) => {
  debugger;
  useEffect(() => {
    getServices();
  }, []);
  return (
    <div className={styles.container}>
      <TariffsMenu />
      <div className={styles.services}>
        <table>
          <tbody>
            <tr>
              <th>Номер</th>
              <th>Название услуги</th>
              <th>Цена</th>
            </tr>
            {services.map((elem, i) => (
                <tr>
                    <ServiceInfo
                        i={i + 1}
                        key={elem.Service_Id}
                        id={elem.Service_Id}
                        name={elem.Service_Name}
                        price={elem.Service_Price}
/*                        changeTariffInfo={changeTariffInfo}
                        deleteTariff={deleteTariff}*/
                    />
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    services: state.servicesReducer.services
  };
};

export default compose(
  connect(
    mapStateToProps,
    { getServices }
  ),
  adminRouteProtecter,
  withAuthRedirect
)(Services);
