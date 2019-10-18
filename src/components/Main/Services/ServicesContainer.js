import React, { Component } from "react";
import { connect } from "react-redux";
import { getServices } from "../../../api/api";
import { setServices } from "../../../redux/servicesReducer";
import Services from "./Services";
import { Redirect } from "react-router-dom";

class ServicesApiComponent extends Component {
  componentDidMount() {
    getServices()
      .then(response => {
        this.props.setServices(response.data);
      })
      .catch(err => console.error(err));
  }

  render() {
    let isAuth = this.props.isAuth;
    return (
      (isAuth && <Services services={this.props.services} />) || (
        <Redirect to={"/login"} />
      )
    );
  }
}

let mapStateToProps = state => {
  return {
    services: state.servicesReducer.services,
    isAuth: state.auth.isAuth
  };
};

export default connect(
  mapStateToProps,
  { setServices }
)(ServicesApiComponent);
