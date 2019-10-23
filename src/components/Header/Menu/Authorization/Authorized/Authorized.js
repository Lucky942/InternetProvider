import React from "react";
import styles from "./Authorized.module.css";

const Authorized = props => {
  let handleLogout = () => {
    props.logout();
  };

  return (
    <div className={styles.authorized}>
      {props.userName}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Authorized;
