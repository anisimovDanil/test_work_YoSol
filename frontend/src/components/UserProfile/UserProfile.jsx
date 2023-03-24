import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes, useParams } from "react-router-dom";
import UserListItem from "../UserListItem/UserListItem";
import Form from "../Form/Form";
import "./UserProfile.scss";

function UserProfile({ sender_name, sender_email, sender_phoneNumber }) {
  const { username } = useParams();
  const [user, setUser] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [modelActive, setModelActive] = useState(false);

  const fetchUserRequests = async () => {
    await axios
      .get("http://localhost:8000/api/request-list")
      .then((res) =>
        setUserRequests(res.data.filter((el) => el.sender_name === username)),
      );
  };

  const fetchUser = async () => {
    await axios
      .get("http://localhost:8000/api/users")
      .then((res) => setUser(res.data.filter((el) => el.name === username)[0]));
  };

  useEffect(() => {
    fetchUser();
    fetchUserRequests();
  }, [username]);

  return (
    <div className='user-profile'>
      <div className='user-profile-info'>
        <div className='user-profile-name'>Name: {username}</div>
        <div className='user-profile-email'>Email: {user.email}</div>
        <div className='user-profile-phone_number'>
          Phone number: {user.phone_number}
        </div>
      </div>
      <div className='user-profile-request-form'>
        <button onClick={() => setModelActive(true)}>Create request</button>
      </div>
      <div className='user-profile-requests'>
        <div className='thead-td'>№</div>
        <div className='thead-td'>sender</div>
        <div className='thead-td'>recipient</div>
        <div className='thead-td'>text request</div>
        {userRequests.map((request, index) => (
          <UserListItem
            id={index + 1}
            sender_name={request.sender_name}
            recipient_name={request.recipient_name}
            req_text={request.req_text}
          />
        ))}
      </div>
      <div
        className={modelActive ? "model-form active" : "model-form"}
        onClick={() => setModelActive(false)}
      >
        <div
          className='model-form-wrapper'
          onClick={(e) => e.stopPropagation()}
        >
          <Form
            sender_name={user.name}
            sender_email={user.email}
            sender_phoneNumber={user.phone_number}
          />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
