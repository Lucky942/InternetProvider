import React, { Component } from "react";
import { connect } from "react-redux";
import Tariffs from "./Tariffs";
import { changeTariffStatus, getTariffs } from "../../../redux/tariffsReducer";
import withAuthRedirect from "../../../hoc/withAuthRedirect";
import { compose } from "redux";

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
    tariffs: state.tariffsReducer.tariffs,
    tariffId: state.tariffsReducer.tariffId
  };
};



export default compose(
    connect(
        mapStateToProps,
        { getTariffs, changeTariffStatus }
    ),
    withAuthRedirect
)(TariffsApiComponent);
