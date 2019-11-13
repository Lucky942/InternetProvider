import {
  maxLengthCreator,
  required
} from "../../../../utils/validators/validators";
import { Field, reduxForm } from "redux-form";
import {LoginInput} from "../../FormControls/FormsControls";
import React from "react";
import styles from "./../LoginForm/LoginForm.module.css";

const maxLength10 = maxLengthCreator(10);

const SignUpForm = props => {
  return (
    <div className={styles.form}>
      <form onSubmit={props.handleSubmit}>
        <h1 className={styles.formTitle}>Регистрация</h1>
        <div className={styles.formGroup}>
          <Field
            label="Логин"
            name={"login"}
            component={LoginInput}
            validate={[required, maxLength10]}
          />
        </div>
        <div className={styles.formGroup}>
          <Field
            label="Пароль"
            name={"password"}
            component={LoginInput}
            validate={[required, maxLength10]}
            type={"password"}
          />
        </div>
        <button className={styles.formButton}>Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default reduxForm({
  // a unique name for the form
  form: "signup"
})(SignUpForm);
