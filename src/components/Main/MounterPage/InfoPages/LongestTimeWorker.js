import React from "react";

const LongestTimeWorker = ({ longestTimeMounterInfo }) => {
    return (

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

                    {longestTimeMounterInfo.map(elem => (
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

    );
};

export default LongestTimeWorker;
