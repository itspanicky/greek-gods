import React from "react";
import { 
  Router, 
  Switch, 
  Route 
} from "react-router-dom";
import { createBrowserHistory } from "history";

import Navigation from "./navigation/index";
import GodsList from "./gods/GodsList";
import GodDetail from "./gods/GodDetail";
import Create from "./create/Create";

const history = createBrowserHistory();
const App = () => {
  return (
    <Router history={history}>
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
