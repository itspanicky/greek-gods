import React from "react";
import { Route } from "react-router-dom";
import GodsList from "./gods/GodsList";
import GodCreate from "./create/GodCreate";
import EmblemCreate from "./create/EmblemCreate";


const App = () => {
  return (
    <div>
      <Route exact path="/create-emblem" component={EmblemCreate} />
      <Route exact path="/create-god" component={GodCreate} />
      <Route exact path="/" component={GodsList} />
    </div>
  );
};

export default App;
