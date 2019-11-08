import React from "react";

const EqTable = ({ year, ordersOfEquipment }) => {
  debugger
  return (
    (!ordersOfEquipment.length &&
      `Нет сведений о заказах оборудования за ${year} год`) || (
      <div>
        {year}
        <table>
          <tr>
            <th>Id</th>
            <th>Название</th>
            <th>Количество</th>
            <th>Общая стоимость</th>
          </tr>

          {ordersOfEquipment.map((elem, i) => (
            <tr key={i}>
              <td>{elem.Id}</td>
              <td>{elem.Name}</td>
              <td>{elem.Quantity}</td>
              <td>{elem.Price}</td>
            </tr>
          ))}
        </table>
      </div>
    )
  );
};

export default EqTable;
