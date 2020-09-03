import React from "react";
import { Route } from "react-router-dom";
import GodsList from "./gods/GodsList";
import Create from "./create/Create";

const App = () => {
  return (
    <div>
      <Route exact path="/new" component={Create} />
      <Route exact path="/" component={GodsList} />
    </div>
  );
};

export default App;
