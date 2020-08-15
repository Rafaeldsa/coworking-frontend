import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import InfoUser from './pages/InfoUser';
import WorkStationsList from './pages/WorkStationList';
import WorkStationDetail from './pages/CRUDWorkStation';
import CRUDWorkStation from './pages/CRUDWorkStation';
import UserList from './pages/UserList';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={Login} exact />
      <Route path="/editing-user" component={InfoUser} />
      <Route path="/workstation" component={CRUDWorkStation} exact />
      <Route path="/list-workstations" component={WorkStationsList} />
      <Route path="/list-users" component={UserList} />
    </BrowserRouter>
  );
}

export default Routes;
