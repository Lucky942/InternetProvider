import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = state => {
    return {
        role: state.auth.userRole
    };
};


let routeProtecter = Component => {

    class RedirectComponent extends React.Component {
        render() {
            return (
                (this.props.role !== "admin"  && <Redirect to="/tariffs" />) || <Component {...this.props} />
            );
        }
    }


    return connect(mapStateToPropsForRedirect)(
        RedirectComponent
    );
};

export default routeProtecter;
