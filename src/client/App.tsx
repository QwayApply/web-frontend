import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Root, SecondInput, Loading, Result } from '../pages';

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Root} />
      <Route exact path="/second" component={SecondInput} />
      <Route exact path="/loading" component={Loading} />
      <Route exact path="/result" component={Result} />
    </Switch>
  </BrowserRouter>
);

export default App;
