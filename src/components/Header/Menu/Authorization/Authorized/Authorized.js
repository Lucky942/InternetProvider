import React from "react";
import styles from "./Authorized.module.css";

const Authorized = ({logout, userName}) => {
  let handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.authorized}>
      {userName}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Authorized;
