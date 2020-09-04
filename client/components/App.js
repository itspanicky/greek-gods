import React from "react";
import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from "react-router-dom";
import {
  browserHistory
} from "react-router";
import Navigation from "./navigation/index";
import GodsList from "./gods/GodsList";
import GodDetail from "./gods/GodDetail";
import Create from "./create/Create";

const App = () => {
  return (
    <Router history={browserHistory}>
      <Navigation />
      <Switch>
        <Route exact path="/gods/:id" component={GodDetail} />
        <Route exact path="/new" component={Create} />
        <Route exact path="/" component={GodsList} />
      </Switch>
    </Router>
  );
};

export default App;
