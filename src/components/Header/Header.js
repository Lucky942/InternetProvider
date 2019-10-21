import React, {Component} from "react";
import styles from "./Header.module.css";
import classnames from "classnames";
import Segment from "./Segment/Segment";
import Menu from "./Menu/Menu";
import {connect} from "react-redux";

class HeaderContainer extends Component {



    render() {
        return (
            <div className={classnames("header", styles.header)}>
                <Segment/>
                <Menu/>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {})(HeaderContainer);
