import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import Create from './componentsApp2/Create'
import List from './componentsApp2/List'


export default function BasicExample() {
    return (
      <Router>
        <div>
          <ul>
            
            <li>
              <Link to="/">Create</Link>
            </li>
            <li>
              <Link to="/List">List</Link>
            </li>
          </ul>
  
          <hr />
  
          <Switch>
            <Route exact path="/">
              <Create />
            </Route>
            <Route path="/List">
              <List />
              </Route>
          </Switch>
        </div>
      </Router>
    );
  }