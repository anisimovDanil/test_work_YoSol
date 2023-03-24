import { useEffect, useState } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import "./Form.scss";

function Form({ sender_name, sender_email, sender_phoneNumber }) {
  const [options, setOptions] = useState([]);
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPhoneNumber, setSenderPhoneNumber] = useState("");
  const [senderBid, setSenderBid] = useState("");

  const createBid = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // users
    formData.append("name", senderName || sender_name);
    formData.append("email", senderEmail || sender_email);
    formData.append("phone_number", senderPhoneNumber || sender_phoneNumber);
    // requests
    formData.append("req_text", senderBid);
    formData.append("recipient_id", recipientName);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users",
        formData,
      );
      console.log("data: " + response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllUsers = async () => {
    await axios.get("http://localhost:8000/api/users").then((res) => {
      setOptions(res.data);
    });
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <>
      <div className='form-wrapper'>
        <form className='form' method='post' onSubmit={createBid}>
          <label className='user-select' for='user-select'>
            Recipient name:
          </label>
          <select
            name='recipient-name'
            className='recipient-name-select'
            value={recipientName}
            onChange={(e) => {
              setRecipientName(e.target.value);
            }}
          >
            <option className='recipient-name-option' value=''>
              Choose name
            </option>
            {options.map((option) => (
              <option className='recipient-name-option' value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <label className='sender-name'>
            Sender name
            <input
              name='sender-name'
              autocomplete='sender-name'
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />
          </label>
          <label className='sender-email'>
            Email:
            <input
              name='sender-email'
              autocomplete='sender-email'
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
            />
          </label>
          <label className='sender-phone-number'>
            Phone number:
            <input
              name='sender-phone-number'
              autocomplete='sender-phone-number'
              value={senderPhoneNumber}
              onChange={(e) => setSenderPhoneNumber(e.target.value)}
            />
          </label>
          <label className='sender-bid'>
            Text request:
            <textarea
              value={senderBid}
              onChange={(e) => setSenderBid(e.target.value)}
            ></textarea>
          </label>
          <button>Send</button>
        </form>
      </div>
    </>
  );
}

export default Form;
