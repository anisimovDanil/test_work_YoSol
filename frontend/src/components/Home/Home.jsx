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
