import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link, useStory } from 'react-router-dom';
import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import styles from './styles.css';
import PageHeader from '../../components/PageHeader';

function CRUDWorkStation(workstation_id) {
  const [workStation, setWorkStation] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [rooms, setRooms] = useState([]);

  const authorization_user = localStorage.getItem('authorization');

  useEffect(() => {
    api
      .get(`workstation/${workstation_id}`, {
        headers: {
          authorization: authorization_user,
        },
      })
      .then((response) => {
        setWorkStation(response.data.workstation);
        setSchedules(response.data.schedules);
        setRooms(response.data.rooms);
      });
  }, [workstation_id]);

  return (
    <div id="page-wsDetail" className="container">
      <PageHeader title="WorkStation">
        <Link to="/workstations">WorkStations</Link>
        <Link>Listar Usuários</Link>
        <Link>Editar informações de usuário</Link>
      </PageHeader>
      <main>
        <h1>WorkStation: {workStation.name}</h1>

        <h1>Horários</h1>
        <ul>
          {schedules.map((scheduleItem) => {
            return (
              <li key={scheduleItem.id}>
                <h2>Dia: {scheduleItem.week_day}</h2>
                <h2>
                  De: {scheduleItem.from} - Até: {scheduleItem.to}
                </h2>
                <button>Agendar</button>
              </li>
            );
          })}
        </ul>

        <h1>Salas</h1>
        <ul>
          {rooms.map((room) => {
            return (
              <li key={room.name}>
                {room.name}
                <button>Agendar</button>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default CRUDWorkStation;
