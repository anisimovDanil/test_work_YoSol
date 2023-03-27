import { useState, useEffect } from "react";
import UserListItem from "../UserListItem/UserListItem";

function Table(...props) {
  const [headerTable, setHeaderTable] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const headerTableData = ["№", "name", "email", "phone number"]; // убрать, т.к. это придет с "друого места"

  // это надо как-то убрать и сделать в одном месте, а для отображения просто инфу передавать
  const fetchData = async () => {
    const res = await fetch("http://localhost:8000/api/users");
    const data = await res.json();
    setDataTable(data);
  };

  useEffect(() => {
    fetchData(); // это ж уберется...
  }, []);
  return (
    <>
      {headerTableData.map((el) => (
        <div className='thead-td'>{el}</div>
      ))}
      {
        // UserListItem - это row (строка)... надо как-то параметры автоматизировать, скорее всего придется удалить и весь код сюда сунуть
        dataTable.map((request, index) => (
          <UserListItem
            id={index + 1}
            sender_name={request.name}
            recipient_name={request.email}
            req_text={request.phone_number}
          />
        ))
      }
    </>
  );
}

export default Table;

/*
console.log(Object.keys(props[0]));

Передавамые параметры: 
  - название полей шапки - headerTableData
  - инфа для таблицы - dataTable
*/
