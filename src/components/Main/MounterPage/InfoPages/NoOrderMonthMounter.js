import React from "react";

const NoOrderMonthMounter = ({ noOrdersMonthMounterInfo, year, month }) => {
  return (
    (!noOrdersMonthMounterInfo.length &&
      `Нет монтажников не выолнявших заказы в ${month} месяце в ${year} году`) || (
      <div>
        <table>
          <tr>
            <th>Id</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Пасспорт</th>
            <th>Дата рождения</th>
            <th>Дата приему на работу</th>
          </tr>

          {noOrdersMonthMounterInfo.map(elem => (
            <tr>
              <td>{elem.Id}</td>
              <td>{elem.FirstName}</td>
              <td>{elem.LastName}</td>
              <td>{elem.Passport}</td>
              <td>{elem.Birthday}</td>
              <td>{elem.EmploymentDate}</td>
            </tr>
          ))}
        </table>
      </div>
    )
  );
};

export default NoOrderMonthMounter;
