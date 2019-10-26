import React from "react";
import styles from "./Header.module.css";
import classnames from "classnames";
import Segment from "./Segment/Segment";
import Menu from "./Menu/Menu";

const HeaderContainer = () => {
  return (
    <div className={classnames("header", styles.header)}>
      <Segment />
      <Menu />
    </div>
  );
};

export default HeaderContainer;
