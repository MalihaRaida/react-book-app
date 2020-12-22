import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { getSingleBookById } from "./api/googleBook";
import { useHistory } from "react-router-dom";

const BookDetails = ({ match }) => {
  const BookId = match.params.id;
  const [book, setBook] = useState({});
  const history=useHistory();
  const getBookDetails = async () => {
    await getSingleBookById(BookId, setBook);  
  };

  useEffect(() => {
    getBookDetails();
  }, []);

  return (
    <div className="book-result">
      <Header title="BookDetails" />
      <p>{book.title}</p>
      <button onClick={()=>history.goBack()}>Back</button>
    </div>
  );
};

export default BookDetails;
