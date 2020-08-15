import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import { Link } from 'react-router-dom';

import './styles.css';
import PageHeader from '../../components/PageHeader';
import MeetingItem from '../../components/MeetingItem';

function MeetingList() {
  const [meetings, setMeetings] = useState([]);

  const authorization_user = localStorage.getItem('authorization');

  useEffect(() => {
    async function loadingMeetings() {
      const response = await api.get('meeting', {
        headers: {
          authorization: authorization_user,
        },
      });

      setMeetings(response.data);
    }

    loadingMeetings();
  }, []);

  return (
    <div id="page-meetings" className="container">
      <PageHeader
        title="Lista de Reuniões"
        description="Aqui está a listagem de Reuniões"
      >
        <Link className="button" to="/list-workstaions">
          WorkStations
        </Link>
        <Link className="button" to="/editing-user">
          Editar suas informações de usuário
        </Link>
      </PageHeader>

      <ul id="list">
        {meetings.map((meeting) => {
          return <MeetingItem key={meeting.meeting_id} meeting={meeting} />;
        })}
      </ul>
    </div>
  );
}

export default MeetingList;
