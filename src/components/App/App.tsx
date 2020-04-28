import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import "./App.scss";
import Menu from "../Menu/Menu";
import { links } from "../links";

export default class App extends Component {
  contents = links.slice(0).reverse().map((link) => (
    <Route path={link.path} key={link.path}>
      <link.component />
    </Route>
  ));

  render() {
    return (
      <Router>
        <div>
          <Menu />
          <Switch>
            {this.contents}
          </Switch>
        </div>
      </Router>
    );
  }
}
