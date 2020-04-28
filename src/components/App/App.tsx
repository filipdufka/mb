import React,{ Component } from "react";
import MBLogo from "../MBLogo/MBLogo";
import MBHeadDistance from "../MBHeadDistance/MBHeadDistance";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class App extends Component {
    render() {
      return (
        <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Logo</Link>
              </li>
              <li>
                <Link to="/head_distance">Head Distance</Link>
              </li>
            </ul>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/head_distance">
              <MBHeadDistance />
            </Route>
            <Route path="/">
              <MBLogo />
            </Route>
          </Switch>
        </div>
      </Router>
      )
    }
  }