import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = state => {
        return {
            isAuth: state.auth.isAuth
        };
    };

let withAuthRedirect = (Component) => {
    class RedirectComponent extends Component {
        render() {
            let isAuth = this.props.isAuth;
            return (
                ((!isAuth) && <Redirect to="/login"/>) || <Component {...this.props}/>
            );
        }
    }


    return connect(mapStateToPropsForRedirect)(RedirectComponent);
};

export default withAuthRedirect;