import { useEffect, useState } from "react";
import Table from "../Table/Table";
import "./Home.scss";

function Home() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:8000/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='user-list'>
      <h1 className='user-title'>List users:</h1>
      <div className='user-items'>
        <Table />
      </div>
    </div>
  );
}

export default Home;

/*
        {users.map((user, index) => (
          <UserItems
            key={user.id}
            id={index + 1}
            name={user.name}
            email={user.email}
            phone_number={user.phone_number}
          />
        ))}
        <div className='thead-td'>id</div>
        <div className='thead-td'>name</div>
        <div className='thead-td'>email</div>
        <div className='thead-td'>phone number</div>
*/
