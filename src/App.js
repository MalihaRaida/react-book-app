import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import BookDetails from "./BookDetails";
import BookFinder from "./BookFinder";

const App=()=>{
  return (
    <BrowserRouter>
      <Route path="/:query?" exact={true} component={BookFinder} />
      <Route path="/book/:id" component={BookDetails}/>
    </BrowserRouter>
  );
}

export default App;
