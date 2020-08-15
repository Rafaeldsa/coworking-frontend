import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import InfoUser from './pages/InfoUser';
import WorkStationsList from './pages/WorkStationList';

import DetailWorkStation from './pages/DetailWorkStation';
import UserList from './pages/UserList';
import CRUDWorkStation from './pages/CRUDWorkStation';
import CRUDMeeting from './pages/CRUDMeeting';
import MeetingList from './pages/MeetingList';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={Login} exact />
      <Route path="/editing-user" component={InfoUser} />
      <Route path="/workstation/:id" component={DetailWorkStation} exact />
      <Route path="/crud-workstation/:id" component={CRUDWorkStation} exact />
      <Route path="/list-workstations" component={WorkStationsList} />
      <Route path="/create-meeting" component={CRUDMeeting} />
      <Route path="/list-users" component={UserList} />
      <Route path="/list-meetings" component={MeetingList} />
    </BrowserRouter>
  );
}

export default Routes;
