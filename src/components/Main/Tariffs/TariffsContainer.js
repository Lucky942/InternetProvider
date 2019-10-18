import React, { Component } from "react";
import { connect } from "react-redux";
import { setTariffs } from "../../../redux/tariffsReducer";
import Tariffs from "./Tariffs";
import { getTariffs } from "../../../api/api";
import Services from "../Services/Services";
import { Redirect } from "react-router-dom";

class TariffsApiComponent extends Component {
  componentDidMount() {
    getTariffs(this.props.clientId)
      .then(response => {
        this.props.setTariffs(response.data);
      })
      .catch(err => console.error(err));
  }

  render() {
    let isAuth = this.props.isAuth;

    return (
      (isAuth && <Tariffs tariffs={this.props.tariffs} />) || (
        <Redirect to={"/login"} />
      )
    );
  }
}

let mapStateToProps = state => {
  return {
    tariffs: state.tariffsReducer.tariffs,
    clientId: state.auth.userId,
    isAuth: state.auth.isAuth
  };
};

export default connect(
  mapStateToProps,
  { setTariffs }
)(TariffsApiComponent);
