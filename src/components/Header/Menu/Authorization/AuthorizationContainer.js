import {connect} from "react-redux";
import Authorization from "./Authorization";

let mapStateToProps = (state) => {
  return {
    userName: state.auth.login,
    isAuth: state.auth.isAuth
  }
};

export default connect(mapStateToProps, {})(Authorization);
