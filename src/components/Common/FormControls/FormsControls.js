import React from "react";
import classnames from "classnames";
import styles from "./FormsControls.module.css";

const Input = ({ input, label, type, meta, ...props }) => {
    const hasError = meta.touched && meta.error;

  return (
    <div className={classnames(styles.formControl, (hasError) ? styles.error : " ")}>
      <div>
        <input {...input} type={type} placeholder={label} />
      </div>
        {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export default Input;
