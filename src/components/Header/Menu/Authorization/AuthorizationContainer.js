import {connect} from "react-redux";
import Authorization from "./Authorization";
import {logout} from "../../../../redux/authReducer";

let mapStateToProps = (state) => {
  return {
    userName: state.auth.login,
    isAuth: state.auth.isAuth
  }
};

export default connect(mapStateToProps, {logout})(Authorization);
