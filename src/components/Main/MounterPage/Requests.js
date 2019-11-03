import React, { useState } from "react";
import withAuthRedirect from "../../../hoc/withAuthRedirect";
import { compose } from "redux";
import { mounterRouteProtecter } from "../../../hoc/routeProtecter";
import styles from "./Requests.module.css";
import DataInput from "./Inputs/DataInput";
import { connect } from "react-redux";
import {
  getMountersWorkReport,
  getOrdersOfEq,
  getYearOfMountersWork,
  getYearOfOrders
} from "../../../redux/Selectors/infoSelectors";
import {
  requestMountersYearReport,
  requestOrdersOfEquipmentStat
} from "../../../redux/infoReducer";
import EqTable from "./InfoPages/EqTable";
import MountersYearWorkTable from "./InfoPages/MountersYearWork";

const Requests = ({
  yearOfOrders,
  ordersOfEquipment,
  requestOrdersOfEquipmentStat,
  yearOfMountersWork,
  mountersWorkReport,
  requestMountersYearReport
}) => {
  /*    const eqInput = React.createRef();

    const getOrdersOfEq = () => {
        eqInput.handleClick();
    };*/
  debugger;

  const [inputName, setInputName] = useState(null);

  // go thru props a name if Input(if handleButton then call the setState from Requests and set the name of Input) depending on name render the table
  return (
    <div className={styles.container}>
      <ol className={styles.requests}>
        <li className={styles.listItem}>
          Сведения о заказах оборудования за год
        </li>
        <DataInput
          setInputName={setInputName}
          inputName="eqInput"
          getInfo={requestOrdersOfEquipmentStat}
        />
        <li className={styles.listItem}>
          Сведения о работе монтажников за год
        </li>
        <DataInput
          setInputName={setInputName}
          inputName="mountersYearWork"
          getInfo={requestMountersYearReport}
        />
        <li className={styles.listItem}>
          Сведения о монтажнике, который работает в компании дольше всех
          остальных
        </li>
        <li className={styles.listItem}>
          Сведения о монтажнике, оформившем самую дорогую накладную за год
        </li>
        <li className={styles.listItem}>
          Сведения о монтажниках, не составивших еще ни одной накладной
        </li>
        <li className={styles.listItem}>
          Сведения о монтажниках, не составлявших накладных в марте 2017 года
        </li>
      </ol>

      {(inputName === "eqInput" && (
        <EqTable ordersOfEquipment={ordersOfEquipment} year={yearOfOrders} />
      )) ||
        (inputName === "mountersYearWork" && (
          <MountersYearWorkTable
            year={yearOfMountersWork}
            mountersWorkReport={mountersWorkReport}
          />
        ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    yearOfOrders: getYearOfOrders(state),
    ordersOfEquipment: getOrdersOfEq(state),
    yearOfMountersWork: getYearOfMountersWork(state),
    mountersWorkReport: getMountersWorkReport(state)
  };
};

export default compose(
  connect(
    mapStateToProps,
    { requestOrdersOfEquipmentStat, requestMountersYearReport }
  ),
  mounterRouteProtecter,
  withAuthRedirect
)(Requests);
