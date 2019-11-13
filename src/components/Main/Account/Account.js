import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAccountInfo } from "../../../redux/userAccountReducer";

const Account = ({ tariff, conclusionDate, getAccountInfo, ...props }) => {
  useEffect(() => {
    getAccountInfo(props.match.params.login);
  }, []);

  return (
    <>
      <div>Пользователь - </div>
      <div>Подключенный тарифф - {tariff.tariffName}</div>
      <div>Дата заключения контракта - {conclusionDate}</div>
    </>
  );
};

const mapStateToProps = (state) => {
    debugger
  return {
      tariff: state.userAccountReducer.tariff,
      conclusionDate: state.userAccountReducer.contract.conclusionDate

  };
};

export default connect(
  mapStateToProps,
  { getAccountInfo }
)(Account);
