import React, { useState, useEffect } from "react";
import styles from "./TariffInfo.module.css";

const TariffInfo = ({
  id,
  name,
  maxSpeed,
  price,
  i,
  changeTariffInfo,
  deleteTariff
}) => {
  const [editing, setEditing] = useState(false);

  const [tariffName, setName] = useState(name);
  const [tariffMaxSpeed, setMaxSpeed] = useState(maxSpeed);
  const [tariffPrice, setPrice] = useState(price);

  useEffect(() => {
    setName(name);
    setMaxSpeed(maxSpeed);
    setPrice(price);
  }, [name, maxSpeed, price]);

  const onNameChange = event => {
    setName(event.currentTarget.value);
  };
  const onSpeedChange = event => {
    setMaxSpeed(event.currentTarget.value);
  };
  const onPriceChange = event => {
    setPrice(event.currentTarget.value);
  };

  const activateEditMode = () => {
    setEditing(true);
  };

  const saveEdits = () => {
    changeTariffInfo(id, tariffName, tariffMaxSpeed, tariffPrice);
    setEditing(false);
  };

  const cancel = () => {
    setEditing(false);
  };

  const onDelete = () => {
    deleteTariff(id);
  };

  return (
    <React.Fragment>
      <td className={styles.tariffData}>{i}</td>
      <td className={styles.tariffData}>
        {editing ? (
          <input value={tariffName} onChange={onNameChange} type="text" />
        ) : (
          name
        )}
      </td>
      <td className={styles.tariffData}>
        {editing ? (
          <input value={tariffMaxSpeed} onChange={onSpeedChange} type="text" />
        ) : (
          maxSpeed
        )}
      </td>
      <td className={styles.tariffData}>
        {editing ? (
          <input value={tariffPrice} onChange={onPriceChange} type="text" />
        ) : (
          price
        )}
      </td>
      <td className={styles.tariffData}>
        <button onClick={activateEditMode}>Редактировать</button>
      </td>
      <td className={styles.tariffData}>
        <button onClick={onDelete}>Удалить тариф</button>
      </td>
      {editing && (
        <td className={styles.tariffData}>
          <button onClick={saveEdits}>Сохранить изменения</button>
        </td>
      )}
      {editing && (
        <td className={styles.tariffData}>
          <button onClick={cancel}>Отменить изменения</button>
        </td>
      )}
    </React.Fragment>
  );
};

export default TariffInfo;
