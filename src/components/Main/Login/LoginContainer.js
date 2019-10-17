import Login from "./Login";
import React, {Component} from "react";
import * as axios from "axios";
import {connect} from "react-redux";
import {login} from "../../../redux/authReducer";




export default connect(null, {login})(Login);