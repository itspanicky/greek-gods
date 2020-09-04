import React from "react";
import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from "react-router-dom";
import Navigation from "./navigation/index";
import GodsList from "./gods/GodsList";
import Create from "./create/Create";

const App = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/new" component={Create} />
        <Route exact path="/" component={GodsList} />
      </Switch>
    </div>
  );
};

export default App;
