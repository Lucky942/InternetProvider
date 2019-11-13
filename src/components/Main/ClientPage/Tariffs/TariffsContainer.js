import React, { Component } from "react";
import { connect } from "react-redux";
import Tariffs from "./Tariffs";
import { changeTariffStatus, requestTariffs } from "../../../../redux/tariffsReducer";
import withAuthRedirect from "../../../../hoc/withAuthRedirect";
import { compose } from "redux";
import {getTariffId, getTariffs} from "../../../../redux/Selectors/tariffsSelectors";
import {clientRouteProtecter} from "../../../../hoc/routeProtecter";

class TariffsApiComponent extends Component {
  componentDidMount() {
    this.props.getTariffs();
  }

  render() {
    return (
      <Tariffs
        connectedTariffId={this.props.connectedTariffId}
        tariffs={this.props.tariffs}
        changeTariffStatus={this.props.changeTariffStatus}
      />
    );
  }
}


let mapStateToProps = state => {
  return {
    tariffs: getTariffs(state),
    connectedTariffId: getTariffId(state)
  };
};

export default compose(
    connect(
        mapStateToProps,
        { getTariffs: requestTariffs, changeTariffStatus }
    ),
    clientRouteProtecter,
    withAuthRedirect
)(TariffsApiComponent);
