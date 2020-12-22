import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { getSingleBookById } from "./api/googleBook";

const BookDetails = ({ match }) => {
  const BookId = match.params.id;
  const [book, setBook] = useState({});
  const getBookDetails = async () => {
    await getSingleBookById(BookId, setBook);
  };

  useEffect(() => {
    getBookDetails();
  });
  return (
    <div className="book-result">
      <Header title="BookDetails" />
    </div>
  );
};

export default BookDetails;
