import React, { Component } from "react";
import { connect } from "react-redux";
import Tariffs from "./Tariffs";
import { Redirect } from "react-router-dom";
import {changeTariffStatus, getTariffs} from "../../../redux/tariffsReducer";

class TariffsApiComponent extends Component {
  componentDidMount() {
    this.props.getTariffs();
  }

  render() {
    let isAuth = this.props.isAuth;

    return (
      (isAuth && (
        <Tariffs
          tariffId={this.props.tariffId}
          tariffs={this.props.tariffs}
          changeTariffStatus={this.props.changeTariffStatus}
        />
      )) || <Redirect to={"/login"} />
    );
  }
}

let mapStateToProps = state => {
  return {
    tariffs: state.tariffsReducer.tariffs,
    tariffId: state.tariffsReducer.tariffId,
    isAuth: state.auth.isAuth
  };
};

export default connect(
  mapStateToProps,
  { getTariffs, changeTariffStatus }
)(TariffsApiComponent);
