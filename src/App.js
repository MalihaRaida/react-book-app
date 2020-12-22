import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import BookDetails from "./BookDetails";
import BookFinder from "./BookFinder";

const App=()=>{
  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={BookFinder} />
      <Route path="/:id" component={BookDetails}/>
    </BrowserRouter>
  );
}

export default App;
