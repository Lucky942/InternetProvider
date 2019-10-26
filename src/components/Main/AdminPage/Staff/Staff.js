import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import styles from "./Staff.module.css"
import {getStaff} from "../../../../redux/staffReducer";
import withAuthRedirect from "../../../../hoc/withAuthRedirect";
import {compose} from "redux";

const  Staff = ({staff, getStaff}) => {

  useEffect(() => {
    getStaff();
    console.log(staff)
  },[]);

  return (
      <table className={styles.staff}>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Пасспортные данные</th>
          <th>Дата рождения</th>
          <th>Дата приема на работу</th>
        </tr>
        {staff.map(elem => <tr>
          <td>{elem.Mounter_Id}</td>
          <td>{elem.Mounter_FirstName}</td>
          <td>{elem.Mounter_LastName}</td>
          <td>{elem.Mounter_Passport}</td>
          <td>{elem.Mounter_Birthday}</td>
          <td>{elem.Mounter_EmploymentDate}</td>
        </tr>)}
      </table>
  );
};

let mapStateToProps = state => {
  return {
    staff: state.staff.staff
  };
};

export default compose(
    connect(
        mapStateToProps,
        { getStaff }),
    withAuthRedirect
)(Staff);
/*export default connect(
  mapStateToProps,
  { getStaff }
)(Staff);*/
