import React, { useEffect, useState } from "react";
import BookCard from "./components/BookCard";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { getBooksByTitle } from "./api/googleBook";
import Pagination from "./components/Pagination";

const BookFinder = ({ match, history }) => {
  const [SearchTitle, setSearchTitle] = useState(
    match.params.query == undefined ? "" : match.params.query
  );
  const [Books, setBooks] = useState([]);
  const [totalpage, setTotalPage] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);

  const setQuery = async () => {
    if (history.location.state != undefined) {
       await newpageBook(history.location.state);
    }
  };

  useEffect(() => {
    setQuery();
  }, []);


  const handleChange = (event) => {
    setSearchTitle(event.target.value);
  };

  const newpageBook = async (page) => {
    let startIndex = 20 * (page - 1);
    setcurrentPage(page);
    history.push("/" + SearchTitle, page);
    await getBooksByTitle(SearchTitle, setBooks, startIndex, setTotalPage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await newpageBook(currentPage);
  };

  return (
    <div className="search-result">
      <Header title="BookFinder" />
      <SearchBar
        default={SearchTitle}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <div className="ui four column grid" style={{ padding: "50px" }}>
        {Array.isArray(Books)
          ? Books.map((book, i) => {
              return <BookCard data={book} key={i} />;
            })
          : " "}
      </div>
      {totalpage > 1 ? (
        <Pagination
          newpageBook={newpageBook}
          currentPage={currentPage}
          totalpage={totalpage}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default BookFinder;
