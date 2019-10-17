import React, { Component } from "react";
import { connect } from "react-redux";
import {getServices} from "../../../api/api";
import {setServices} from "../../../redux/servicesReducer";
import Services from "./Services";

class ServicesApiComponent extends Component {
  componentDidMount() {
    getServices()
      .then(response => {
        this.props.setServices(response.data);
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Services
        services={this.props.services}
      />
    );
  }
}

let mapStateToProps = state => {
  return {
    services: state.servicesReducer.services
  };
};

export default connect(
  mapStateToProps,
  { setServices }
)(ServicesApiComponent);
