import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

let mapStateToPropsForRedirect = state => {
  return {
    role: state.auth.userRole
  };
};

export const clientRouteProtecter = Component => {
    class RedirectComponent extends React.Component {
        render() {
            return (
                ((this.props.role !== "guest" && this.props.role !== "client")  && <Redirect to="/" />) || (
                    <Component {...this.props} />
                )
            );
        }
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
};

export const adminRouteProtecter = Component => {
  class RedirectComponent extends React.Component {
    render() {
      return (
        (this.props.role !== "admin" && <Redirect to="/" />) || (
          <Component {...this.props} />
        )
      );
    }
  }
  return connect(mapStateToPropsForRedirect)(RedirectComponent);
};

export const mounterRouteProtecter = Component => {
  class RedirectComponent extends React.Component {
    render() {
      return (
        (this.props.role !== "mounter" && <Redirect to="/" />) || (
          <Component {...this.props} />
        )
      );
    }
  }

  return connect(mapStateToPropsForRedirect)(RedirectComponent);
};
