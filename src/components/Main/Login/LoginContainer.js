import Login from "./Login";
import {connect} from "react-redux";
import {login} from "../../../redux/authReducer";


let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
};

export default connect(mapStateToProps, {login})(Login);