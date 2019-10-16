import React from "react";
import styles from "./Login.module.css";
import {Field, reduxForm} from "redux-form";
import {required} from "../../../utils/validators/validators.jsx";

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder="login" name={"login"} component={"input"} validate={[required]}/>
      </div>
      <div>
        <Field placeholder="password" name={"password"} component={"input"} />
      </div>
      <div>
        <Field component={"input"} name={"rememberMe"} type={"checkbox"} /> Remember me
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm =  reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm);

const Login = () => {
    const onSubmit = (formData) => {
        console.log(formData);
    };

  return (
    <div className={styles.login}>
      <LoginReduxForm onSubmit={onSubmit}/>
    </div>
  );
};

export default Login;
