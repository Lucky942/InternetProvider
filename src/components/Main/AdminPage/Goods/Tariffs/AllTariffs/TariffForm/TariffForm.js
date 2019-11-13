import React from "react";
import { Field, reduxForm } from "redux-form";
import { required } from "../../../../../../../utils/validators/validators.js";
import {onlyNumbers} from "../../../../../../../utils/validators/validators";
import styles from './TariffForm.module.css';
import * as classnames from "classnames";
import {LoginInput} from "../../../../../../Common/FormControls/FormsControls";

let TariffForm = props => {

  const cancelSubmit = (event) => {
    event.preventDefault();
    props.cancelCreate();
  };
  const { handleSubmit } = props;

  return (
        <form className={styles.tariffForm} onSubmit={handleSubmit(props.onSubmit)}>
          <div className={styles.block}>
            <Field
                name={"tariffName"}
                component={LoginInput}
                label={"tariffName"}
                validate={[required]}
            />
          </div>
          <div className={styles.block}>
            <Field
                label="tariffSpeed"
                name={"tariffSpeed"}
                component={LoginInput}
                validate={[required, onlyNumbers]}
            />
          </div>
          <div className={styles.block}>
            <Field
                label="tariffPrice"
                name={"tariffPrice"}
                component={LoginInput}
                validate={[required, onlyNumbers]}
            />
          </div>
          <div className={classnames(styles.block, styles.btns)}>
            <button className={classnames(styles.btn, styles.btn1)} type="submit">Добавить</button>
            <button className={classnames(styles.btn, styles.btn2)} type="button" onClick={cancelSubmit} >Отменить</button>
          </div>
        </form>
  );
};

TariffForm = reduxForm({
  // a unique name for the form
  form: "tariff"
})(TariffForm);


export default TariffForm;
