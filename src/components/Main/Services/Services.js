import React from "react";
import styles from "./Services.module.css";
import Service from "./Service/Service";

const Services = props => {
  return (
    <div className={styles.services}>
      {props.services.map((elem, i) => (
        <Service
          key={i}
          serviceName={elem.Service_Name}
          servicePrice={elem.Service_Price}
        />
      ))}
    </div>
  );
};

export default Services;
