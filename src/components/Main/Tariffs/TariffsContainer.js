import React, { Component } from "react";
import { connect } from "react-redux";
import Tariffs from "./Tariffs";
import { changeTariffStatus, requestTariffs } from "../../../redux/tariffsReducer";
import withAuthRedirect from "../../../hoc/withAuthRedirect";
import { compose } from "redux";
import {getTariffId, getTariffs} from "../../../redux/Selectors/tariffsSelectors";

class TariffsApiComponent extends Component {
  componentDidMount() {
    this.props.getTariffs();
  }

  render() {
    return (
      <Tariffs
        tariffId={this.props.tariffId}
        tariffs={this.props.tariffs}
        changeTariffStatus={this.props.changeTariffStatus}
      />
    );
  }
}


let mapStateToProps = state => {
  return {
    tariffs: getTariffs(state),
    tariffId: getTariffId(state)
  };
};

export default compose(
    connect(
        mapStateToProps,
        { getTariffs: requestTariffs, changeTariffStatus }
    ),
    withAuthRedirect
)(TariffsApiComponent);
