import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <>
      <header className='header'>
        <div className='container'>
          <div className='header-wrapper'>
            <nav className='navigation'>
              <Link to={"/"} className='home'>
                Home
              </Link>
              <Link className='create' to={"/request"}>
                Create
              </Link>
              <Link to={"/request-list"} className='request'>
                Requests
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
