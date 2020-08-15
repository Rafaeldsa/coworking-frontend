import React from 'react';
import axios from 'axios';

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
      <h1>De: {meeting.from}</h1>
      <h1>De: {meeting.to}</h1>

      <footer>
        <button onClick={participar}>Participar da reunião</button>
      </footer>
    </article>
  );
};

export default MeetingItem;
