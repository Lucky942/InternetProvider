import React from "react";

const ExpensiveMounterOrder = ({ year, expensiveOrderMounterInfo }) => {
  return (
    (!expensiveOrderMounterInfo.length &&
      `Нет сведений о заказах за ${year} год`) || (
      <div>
        {year}
        <table>
          <tr>
            <th>Id</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Пасспорт</th>
            <th>Дата рождения</th>
            <th>Дата приема на работу</th>
            <th>Стоимость заказа</th>
          </tr>

          {expensiveOrderMounterInfo.map(elem => (
            <tr>
              <td>{elem.Id}</td>
              <td>{elem.FirstName}</td>
              <td>{elem.LastName}</td>
              <td>{elem.Passport}</td>
              <td>{elem.Birthday}</td>
              <td>{elem.EmploymentDate}</td>
              <td>{elem.Price}</td>
            </tr>
          ))}
        </table>
      </div>
    )
  );
};

export default ExpensiveMounterOrder;
