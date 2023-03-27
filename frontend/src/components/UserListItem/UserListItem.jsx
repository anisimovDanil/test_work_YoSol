import { Route, Routes, Link } from "react-router-dom";
import "./UserListItem.scss";

function UserListItem(...props) {
  console.log(Object.keys(props[0]));
  return (
    <>
      <div className='item'>
        {Object.keys(props[0]).map((el, index) => (
          <div className={`item-prop profile-${Object.keys(props[0])[index]}`}>
            {["name", "recipient_name", "sender_name"].includes(
              Object.keys(props[0])[index],
            ) ? (
              <Link
                to={`/user/${props[0][Object.keys(props[0])[index]]}`}
                className='user-link'
              >
                {props[0][el]}
              </Link>
            ) : (
              props[0][el]
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default UserListItem;
/*
      <div className='thead-td'>id</div>
      <div className='thead-td'>name</div>
      <div className='thead-td'>email</div>
      <div className='thead-td'>phone number</div>
*/
