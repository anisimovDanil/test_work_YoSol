import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Form from "./components/Form/Form";
import Requests from "./components/Requests/Requests";
import UserProfile from "./components/UserProfile/UserProfile";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className='main'>
        <div className='container'>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/request' element={<Form />} />
            <Route path='/request-list' element={<Requests />} />
            <Route path='/user/:username' element={<UserProfile />} />
          </Routes>
        </div>
      </main>
    </>
  );
}
// select req_id, req_text, recipient, sender from requests as R join users as U where R.recipient_id = U.id and R.sender_id = U.id
export default App;
