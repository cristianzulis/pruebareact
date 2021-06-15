import React from 'react';

import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Ecommerce from './paginas/Ecommerce';


function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact render = {props=>(<Ecommerce {...props} />)}>
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;