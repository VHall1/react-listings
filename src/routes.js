import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Pages
// import Landing from './pages/Landing';
import Login from './pages/Login';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default Routes;