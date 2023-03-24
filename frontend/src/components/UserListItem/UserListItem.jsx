import { Route, Routes, Link } from "react-router-dom";
import "./UserListItem.scss";

function UserListItem(...props) {
  // console.log(props[0][Object.keys(props[0])[2]]);
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
/*{Array.from(Array(amount).keys()).map(i => (
        <div />
      ))}*/
/*<div className={`item-prop profile-${Object.keys(props[0])[0]}`}>
          {props[0].id}
        </div>
        <div className={`item-prop profile-${Object.keys(props[0])[1]}`}>
          <Link
            to={`/users/${
              Object.keys(props[0])[1] || Object.keys(props[0])[1]
            }`}
            className='user-link'
          >
            {props[0].name || props[0].sender_name}
          </Link>
        </div>
        <div className={`item-prop profile-${Object.keys(props[0])[2]}`}>
          <Link to={`/users/${props[0].recipient_name}`} className='user-link'>
            {props[0].email || props[0].recipient_name}
          </Link>
        </div>
        <div className={`item-prop profile-${Object.keys(props[0])[3]}`}>
          {props[0].phone_number || props[0].req_text}
        </div>*/
