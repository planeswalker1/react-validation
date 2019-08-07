import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Login from './containers/Login/Login';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Login} />
          <Redirect to='/' />
        </Switch>
      </div>
    );
  }
}

export default App;
