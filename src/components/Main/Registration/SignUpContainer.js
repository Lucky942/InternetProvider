import {connect} from "react-redux";
import {login} from "../../../redux/authReducer";
import SignUp from "./SignUp";




export default connect(null, {login})(SignUp);