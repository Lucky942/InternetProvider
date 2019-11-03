import React from "react";

const MountersYearWorkTable = ({ year, mountersWorkReport }) => {
  return (
    (!mountersWorkReport.length &&
      `Нет сведений о работе монтажников за ${year} год`) || (
      <div>
        {year}
        <table>
          <tr>
            <th>Id</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Количество оформленных накладных</th>
            <th>Общая стоимость</th>
          </tr>

          {mountersWorkReport.map(elem => (
            <tr>
              <td>{elem.Id}</td>
              <td>{elem.FirstName}</td>
              <td>{elem.LastName}</td>
              <td>{elem.Quantity}</td>
              <td>{elem.TotalCost}</td>
            </tr>
          ))}
        </table>
      </div>
    )
  );
};

export default MountersYearWorkTable;
