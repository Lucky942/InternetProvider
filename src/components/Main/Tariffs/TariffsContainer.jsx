import React, { Component } from "react";
import { connect } from "react-redux";
import { setTariffs } from "../../../redux/tariffsReducer";
import Tariffs from "./Tariffs";
import { getTariffs } from "../../../api/api";

class TariffsApiComponent extends Component {
  componentDidMount() {
    getTariffs()
      .then(response => {
        this.props.setTariffs(response.data);
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Tariffs
        tariffs={this.props.tariffs}
      />
    );
  }
}

let mapStateToProps = state => {
  return {
    tariffs: state.tariffsReducer.tariffs
  };
};

export default connect(
  mapStateToProps,
  { setTariffs }
)(TariffsApiComponent);
