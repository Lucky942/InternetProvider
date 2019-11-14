import React, { useEffect } from "react";
import { connect } from "react-redux";
import styles from "./Staff.module.css";
import { getStaff } from "../../../../redux/staffReducer";
import withAuthRedirect from "../../../../hoc/withAuthRedirect";
import { compose } from "redux";
import { adminRouteProtecter } from "../../../../hoc/routeProtecter";

const Staff = ({ staff, getStaff }) => {
  useEffect(() => {
    getStaff();
  }, [getStaff]);

  return (
    <table className={styles.staff}>
      <tbody>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Паспортные данные</th>
          <th>Дата рождения</th>
          <th>Дата приема на работу</th>
        </tr>
        {staff.map((elem, index) => (
          <tr key={index}>
            <td>{elem.Mounter_Id}</td>
            <td>{elem.Mounter_FirstName}</td>
            <td>{elem.Mounter_LastName}</td>
            <td>{elem.Mounter_Passport}</td>
            <td>{elem.Mounter_Birthday}</td>
            <td>{elem.Mounter_EmploymentDate}</td>
          </tr>
        ))}
      </tbody>
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
    { getStaff }
  ),
  adminRouteProtecter,
  withAuthRedirect
)(Staff);
/*export default connect(
  mapStateToProps,
  { getStaff }
)(Staff);*/
