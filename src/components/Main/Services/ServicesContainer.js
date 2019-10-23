import React, { Component } from "react";
import { connect } from "react-redux";
import Services from "./Services";
import withAuthRedirect from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getServices} from "../../../redux/servicesReducer";

class ServicesApiComponent extends Component {
  componentDidMount() {
    this.props.getServices();
/*    getServices()
      .then(response => {
        this.props.setServices(response.data);
      })
      .catch(err => console.error(err));*/
  }

  render() {
    return <Services services={this.props.services} />;
  }
}

let mapStateToProps = state => {
  return {
    services: state.servicesReducer.services
  };
};

export default compose(connect(
    mapStateToProps,
    { getServices }
),withAuthRedirect)(ServicesApiComponent);
