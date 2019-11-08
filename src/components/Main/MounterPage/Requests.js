import React, { useState } from "react";
import withAuthRedirect from "../../../hoc/withAuthRedirect";
import { compose } from "redux";
import { mounterRouteProtecter } from "../../../hoc/routeProtecter";
import styles from "./Requests.module.css";
import DataInput from "./Inputs/DataInput";
import { connect } from "react-redux";
import {
  getExpensiveOrderMounterInfo,
  getLongestTimeMounterInfo,
  getMonthOfNoOrders,
  getMountersWorkReport,
  getNoOrdersMonthMounterInfo,
  getNoOrdersMounterInfo,
  getOrdersOfEq,
  getYearOfExpensiveOrder,
  getYearOfMountersWork,
  getYearOfNoOrders,
  getYearOfOrders
} from "../../../redux/Selectors/infoSelectors";
import {
  requestExpensiveOrderMounterInfo,
  requestLongestTimeMounter,
  requestMountersYearReport,
  requestNoOrdersMonthMounterInfo,
  requestNoOrdersMounterInfo,
  requestOrdersOfEquipmentStat
} from "../../../redux/infoReducer";
import EqTable from "./InfoPages/EqTable";
import MountersYearWorkTable from "./InfoPages/MountersYearWork";
import LongestTimeWorker from "./InfoPages/LongestTimeWorker";
import ExpensiveMounterOrder from "./InfoPages/ExpensiveMounterOrder";
import NoOrderMounter from "./InfoPages/NoOrderMounter";
import NoOrderMonthMounter from "./InfoPages/NoOrderMonthMounter";

const Requests = ({
  yearOfOrders,
  ordersOfEquipment,
  requestOrdersOfEquipmentStat,
  yearOfMountersWork,
  mountersWorkReport,
  requestMountersYearReport,
  longestTimeMounterInfo,
  requestLongestTimeMounter,
  yearOfExpensiveOrder,
  expensiveOrderMounterInfo,
  requestExpensiveOrderMounterInfo,
  noOrdersMounterInfo,
  requestNoOrdersMounterInfo,
  noOrdersMonthMounterInfo,
  yearOfNoOrders,
  monthOfNoOrders,
  requestNoOrdersMonthMounterInfo
}) => {
  /*    const eqInput = React.createRef();

    const getOrdersOfEq = () => {
        eqInput.handleClick();
    };*/

  const [inputName, setInputName] = useState(null);

  const handleClick = async (dataName, event) => {
    switch (dataName) {
      case "longestTimeMounter":
        await requestLongestTimeMounter();
        break;
      case "noOrdersMounter":
        await requestNoOrdersMounterInfo();
        break;
      default:
        break;
    }
    setInputName(dataName);
  };
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
        <button
          onClick={event => handleClick("longestTimeMounter", event)}
          data-name="longestTimeMounter"
        >
          Показать информацию
        </button>
        <li className={styles.listItem}>
          Сведения о монтажнике, оформившем самую дорогую накладную за год
        </li>
        <DataInput
          setInputName={setInputName}
          inputName="expensiveMounterOrder"
          getInfo={requestExpensiveOrderMounterInfo}
        />
        <li className={styles.listItem}>
          Сведения о монтажниках, не составивших еще ни одной накладной
        </li>
        <button onClick={event => handleClick("noOrdersMounter", event)}>
          Показать информацию
        </button>
        <li className={styles.listItem}>
          Сведения о монтажниках, не составлявших накладных в
        </li>
        <DataInput
          setInputName={setInputName}
          inputName="noMonthOrdersMounter"
          inputType="monthAndYear"
          getInfo={requestNoOrdersMonthMounterInfo}
        />
      </ol>

      {(inputName === "eqInput" && (
        <EqTable ordersOfEquipment={ordersOfEquipment} year={yearOfOrders} />
      )) ||
        (inputName === "mountersYearWork" && (
          <MountersYearWorkTable
            year={yearOfMountersWork}
            mountersWorkReport={mountersWorkReport}
          />
        )) ||
        (inputName === "longestTimeMounter" && (
          <LongestTimeWorker longestTimeMounterInfo={longestTimeMounterInfo} />
        )) ||
        (inputName === "expensiveMounterOrder" && (
          <ExpensiveMounterOrder
            year={yearOfExpensiveOrder}
            expensiveOrderMounterInfo={expensiveOrderMounterInfo}
          />
        )) ||
        (inputName === "noOrdersMounter" && (
          <NoOrderMounter noOrdersMounterInfo={noOrdersMounterInfo} />
        )) ||
        (inputName === "noMonthOrdersMounter" && (
          <NoOrderMonthMounter
            noOrdersMonthMounterInfo={noOrdersMonthMounterInfo}
            year={yearOfNoOrders}
            month={monthOfNoOrders}
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
    mountersWorkReport: getMountersWorkReport(state),
    longestTimeMounterInfo: getLongestTimeMounterInfo(state),
    yearOfExpensiveOrder: getYearOfExpensiveOrder(state),
    expensiveOrderMounterInfo: getExpensiveOrderMounterInfo(state),
    noOrdersMounterInfo: getNoOrdersMounterInfo(state),
    noOrdersMonthMounterInfo: getNoOrdersMonthMounterInfo(state),
    yearOfNoOrders: getYearOfNoOrders(state),
    monthOfNoOrders: getMonthOfNoOrders(state)
  };
};

export default compose(
  connect(
    mapStateToProps,
    {
      requestOrdersOfEquipmentStat,
      requestMountersYearReport,
      requestLongestTimeMounter,
      requestExpensiveOrderMounterInfo,
      requestNoOrdersMounterInfo,
      requestNoOrdersMonthMounterInfo
    }
  ),
  mounterRouteProtecter,
  withAuthRedirect
)(Requests);
