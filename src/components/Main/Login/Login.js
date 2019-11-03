import React from "react";
import styles from "./Login.module.css";
import formStyle from "../../../components/Common/FormControls/FormsControls.module.css";
import { Field, reduxForm } from "redux-form";
import {
  required,
  maxLengthCreator
} from "../../../utils/validators/validators.js";
import { NavLink, Redirect } from "react-router-dom";
import Input from "../../Common/FormControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const LoginForm = props => {
  debugger;
  return (
    <div className={styles.login}>
      Login
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field
            name={"login"}
            component={Input}
            label={"login"}
            validate={[required, maxLength10]}
          />
        </div>
        <div>
          <Field
            label="password"
            name={"password"}
            component={Input}
            type={"password"}
            validate={[required, maxLength10]}
          />
        </div>
        <div>
          <Field component={Input} name={"rememberMe"} type={"checkbox"} />{" "}
          Remember me
        </div>
        {props.error && (
          <div className={formStyle.formSummaryError}>{props.error}</div>
        )}
        <div>
          <button>Login</button>
        </div>
      </form>
      <NavLink to="/signup">Зарегистрироваться</NavLink>
    </div>
  );
};

const LoginReduxForm = reduxForm({
  // a unique name for the form
  form: "login"
})(LoginForm);

const Login = props => {
  const onSubmit = formData => {
    props.login(formData.login, formData.password, formData.rememberMe);
  };

  return (
    (props.isAuth && props.userRole === "client" && (
      <Redirect to={"/tariffs"} />
    )) ||
    (props.isAuth && props.userRole === "admin" && (
      <Redirect to={"/alltariffs"} />
    )) ||
    (props.isAuth && props.userRole === "mounter" && (
      <Redirect to={"/requests"} />
    )) || (
      <div>
        <LoginReduxForm onSubmit={onSubmit} />
      </div>
    )
  );
};

export default Login;
