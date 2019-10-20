import React from "react";
import styles from "./Authorized.module.css";

const Authorized = props => {
  return (
    <div className={styles.authorized}>
      {props.userName}
      <button>Logout</button>
    </div>
  );
};

export default Authorized;
