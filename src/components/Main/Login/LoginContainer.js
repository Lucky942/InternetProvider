import Login from "./Login";
import {connect} from "react-redux";
import {login} from "../../../redux/authReducer";




export default connect(null, {login})(Login);