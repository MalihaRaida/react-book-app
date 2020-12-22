import React from "react";
import Header from "./components/Header";

const BookDetails=({match})=>{
    console.log(match.params.id)
    return (
      <div>
        <Header title="BookDetails" />
      </div>
    );
}

export default BookDetails;