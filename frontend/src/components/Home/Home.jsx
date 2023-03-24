import { useEffect, useState } from "react";
import axios from "axios";
import UserListItem from "../UserListItem/UserListItem";
import "./Home.scss";

function Home() {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    await axios.get("http://localhost:8000/api/users").then((res) => {
      setUsers(res.data);
    });
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className='user-list'>
      <h1 className='user-title'>List users:</h1>
      <div className='user-items'>
        <div className='thead-td'>id</div>
        <div className='thead-td'>name</div>
        <div className='thead-td'>email</div>
        <div className='thead-td'>phone number</div>

        {users.map((user, index) => (
          <UserListItem
            key={user.id}
            id={index + 1}
            name={user.name}
            email={user.email}
            phone_number={user.phone_number}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
