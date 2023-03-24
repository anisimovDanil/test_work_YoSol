import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import UserListItem from "../UserListItem/UserListItem";
import "./Requests.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function Requests() {
  const [requests, setRequests] = useState([]);

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [error, setError] = useState("");
  const itemsPerPage = 3;

  const fetchAllRequests = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/request-list");
      if (response.status === 200) {
        const data = await response.json();
        setRequests(data);

        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchAllRequests();
  }, [itemOffset, itemsPerPage]); // currentItems

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % requests.length;
    setItemOffset(newOffset);
  };

  return (
    <div className='requests-list'>
      <h1 className='requests-title'>List requests:</h1>
      <div className='requests-items'>
        <div className='thead-td'>№</div>
        <div className='thead-td'>sender</div>
        <div className='thead-td'>recipient</div>
        <div className='thead-td'>text request</div>
        {currentItems.map((request, index) => (
          <UserListItem
            id={index + 1 + itemOffset}
            //id={request.req_id}
            sender_name={request.sender_name}
            recipient_name={request.recipient_name}
            req_text={request.req_text}
          />
        ))}
      </div>
      <ReactPaginate
        breakLabel='...'
        nextLabel='next'
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel='prev'
        renderOnZeroPageCount={null}
        containerClassName='pagination'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        activeLinkClassName='active'
      />
    </div>
  );
}

export default Requests;
