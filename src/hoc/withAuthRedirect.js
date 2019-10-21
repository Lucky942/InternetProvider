import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";


let withAuthRedirect = Component => {

  class RedirectComponent extends React.Component {
    render() {
      return (
        (!this.props.isAuth && <Redirect to="/login" />) || <Component {...this.props} />
      );
    }
  }

    let mapStateToPropsForRedirect = state => {
        return {
            isAuth: state.auth.isAuth
        };
    };

    return connect(mapStateToPropsForRedirect)(
        RedirectComponent
    );
};

export default withAuthRedirect;
