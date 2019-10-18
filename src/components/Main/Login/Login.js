import React from "react";
import styles from "./Login.module.css";
import {Field, reduxForm} from "redux-form";
import {required} from "../../../utils/validators/validators.jsx";
import {NavLink, Route} from "react-router-dom";

const LoginForm = (props) => {
  return (
      <div>
          Login
          <form onSubmit={props.handleSubmit}>
              <div>
                  <Field placeholder="login" name={"login"} component={"input"} validate={[required]}/>
              </div>
              <div>
                  <Field placeholder="password" name={"password"} component={"input"} type={"password"}/>
              </div>
              <div>
                  <Field component={"input"} name={"rememberMe"} type={"checkbox"}/> Remember me
              </div>
              <div>
                  <button>Login</button>
              </div>
          </form>
          <NavLink to="/signup">Зарегистрироваться</NavLink>
      </div>
  );
};

const LoginReduxForm =  reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.login, formData.password, formData.rememberMe)
    };

  return (
    <div className={styles.login}>
      <LoginReduxForm onSubmit={onSubmit}/>
    </div>
  );
};

export default Login;
