import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import InfoUser from './pages/InfoUser';
import WorkStationsList from './pages/WorkStationList';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={Login} exact />
      <Route path="/create-user" component={InfoUser} />
      <Route path="/workstations" component={WorkStationsList} />
    </BrowserRouter>
  );
}

export default Routes;
