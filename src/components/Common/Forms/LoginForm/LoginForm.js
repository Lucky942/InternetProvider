import {
  maxLengthCreator,
  required
} from "../../../../utils/validators/validators";
import styles from "./LoginForm.module.css";
import { Field, reduxForm } from "redux-form";
import formStyle from "../../FormControls/FormsControls.module.css";
import { NavLink } from "react-router-dom";
import React from "react";
import {LoginInput} from "../../FormControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const LoginForm = props => {
  return (
    <form className={styles.form} onSubmit={props.handleSubmit}>
      <h1 className={styles.formTitle}>Вход</h1>
      <div className={styles.formGroup}>
        <Field
          name={"login"}
          component={LoginInput}
          label={"Логин"}
          validate={[required, maxLength10]}
          type={"text"}
        />
      </div>
      <div className={styles.formGroup}>
        <Field
          label="Пароль"
          name={"password"}
          component={LoginInput}
          type={"password"}
          validate={[required, maxLength10]}
        />
      </div>
      {props.error && (
        <div className={formStyle.formSummaryError}>{props.error}</div>
      )}
      <button className={styles.formButton}>Login</button>
    </form>
  );
};

export default reduxForm({
  // a unique name for the form
  form: "login"
})(LoginForm);
