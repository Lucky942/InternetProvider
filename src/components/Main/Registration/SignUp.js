import React from "react";
import styles from "./SignUp.module.css";
import { connect } from "react-redux";
import { signUp } from "../../../redux/authReducer";
import { Redirect } from "react-router-dom";
import SignUpForm from "../../Common/Forms/SignUpForm/SignUpForm";

const SignUp = props => {
  const onSubmit = formData => {
    props.signUp(formData.login, formData.password, formData.rememberMe);
  };

  return (
    (props.isAuth && <Redirect to={"/tariffs"} />) || (
      <div className={styles.login}>
        <SignUpForm onSubmit={onSubmit} />
      </div>
    )
  );
};

let mapDispatchToProps = state => {
  return {
    isAuth: state.auth.isAuth
  };
};

export default connect(
  mapDispatchToProps,
  { signUp }
)(SignUp);
