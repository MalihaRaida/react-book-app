import React, { useEffect, useState } from "react";
import BookCard from "./components/BookCard";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { getBooksByTitle, getFavoriteBooks } from "./api/googleBook";
import Pagination from "./components/Pagination";

const BookFinder = ({ match, history }) => {
  const [SearchTitle, setSearchTitle] = useState(
    match.params.query == undefined ? "" : match.params.query
  );
  const [Books, setBooks] = useState([]);
  const [totalpage, setTotalPage] = useState(0);
  const [currentPage, setcurrentPage] = useState(
    history.location.state == undefined ? 1 : history.location.state.page
  );
  const [favBooks,setFavBooks]=useState([])
  const [orderBy, setorderBy] = useState(
    history.location.state == undefined
      ? "relevance"
      : history.location.state.orderBy
  );

  useEffect(async () => {
    if (SearchTitle) {
      await newpageBook(currentPage);
    }
  }, []);

  const handleChangeInput = (event) => {
    setSearchTitle(event.target.value);
  };

  const saveFav=(favBook=null)=>{
    if(favBook) {
      const {id} = favBook;
      const alreadyExists = favBooks.find(favBook => favBook.id === id);

      if(alreadyExists) {
        const updatedBookData = favBooks.filter(favBook => favBook.id !== id);
        setFavBooks(updatedBookData)
      } else {
        setFavBooks((prevData) => [favBook, ...favBooks])
      }
    }
  }
  
  const handleChangeDropdown = (event) => {
    if (event.target.value !== "favorite") setorderBy(event.target.value);
    else
    {
     setorderBy(event.target.value);
     setBooks(favBooks)
    }
  };

  const newpageBook = async (page) => {
    let startIndex = 20 * (page - 1);
    setcurrentPage(page);
    history.push("/" + SearchTitle, { page: page, orderBy: orderBy });
    if (orderBy !== "favorite")
      await getBooksByTitle(
        SearchTitle,
        setBooks,
        startIndex,
        setTotalPage,
        orderBy
      );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await newpageBook(currentPage);
  };

  return (
    <div className="search-result">
      <Header title="BookFinder" />
      <SearchBar
        defaultTitle={SearchTitle}
        defaultorder={orderBy}
        handleSubmit={handleSubmit}
        handleChangeInput={handleChangeInput}
        handleChangeDropdown={handleChangeDropdown}
      />
      <div>
        <div className="ui four column grid" style={{ padding: "50px" }}>
          {Array.isArray(Books)
            ? Books.map((book, i) => {
                return <BookCard data={book} saveFav={saveFav} key={i} />;
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
      {/* <div>
        <div className="ui four column grid" style={{ padding: "50px" }}>
          {Array.isArray(FavBooks)
            ? FavBooks.map((book, i) => {
                return <BookCard data={book} saveFav={saveFav} key={i} />;
              })
            : " "}
        </div>
      </div> */}
    </div>
  );
};

export default BookFinder;
