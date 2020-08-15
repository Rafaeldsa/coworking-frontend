import React from 'react';
import axios from 'axios';

import moment from 'moment';

import './styles.css';

const MeetingItem = ({ meeting }) => {
  const authorization = localStorage.getItem('authorization');

  const id = localStorage.getItem('userId');

  const body = {
    user_id: id,
    meeting_id: meeting.id,
  };

  const headers = {
    authorization,
  };

  function participar() {
    axios
      .post('http://localhost:3001/meeting-participant', body, { headers })
      .then(() => {
        alert('Você entrou na reunião');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getTimeFromMins(mins) {
    if (mins >= 24 * 60 || mins < 0) {
      throw new RangeError(
        'Valid input should be greater than or equal to 0 and less than 1440.'
      );
    }
    var h = (mins / 60) | 0,
      m = mins % 60 | 0;
    return moment.utc().hours(h).minutes(m).format('hh:mm A');
  }

  return (
    <article className="meeting-item">
      <header>
        <div>
          <h1>Nome: {meeting.name}</h1>
        </div>
      </header>
      <h2>Descrição: {meeting.description}</h2>
      <h2>Criador: {meeting.creator}</h2>
      <h2>Id da sala: {meeting.id} </h2>
      <h1>De: {getTimeFromMins(meeting.from)}</h1>
      <h1>De: {getTimeFromMins(meeting.to)}</h1>

      <footer>
        <button onClick={participar}>Participar da reunião</button>
      </footer>
    </article>
  );
};

export default MeetingItem;
