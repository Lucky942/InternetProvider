import React from "react";
import classnames from "classnames";
import styles from "./FormsControls.module.css";

export const LoginInput = ({ input, label, type, meta, ...props }) => {
  const hasError = meta.touched && meta.error;

  return (
    <div
      className={classnames(styles.formControl, hasError ? styles.error : " ")}
    >
      <div>
        <input className={styles.formInput} {...input} type={type} placeholder=""/>
        <label className={styles.formLabel} htmlFor="">{label}</label>
      </div>
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const UserFormInput = ({ input, label, type, meta, ...props }) => {
  const hasError = meta.touched && meta.error;

  return (
      <div
      >
        <div>
          <input  {...input} type={type} placeholder=""/>
          <label  htmlFor="">{label}</label>
        </div>
        {hasError && <span>{meta.error}</span>}
      </div>
  );
};

