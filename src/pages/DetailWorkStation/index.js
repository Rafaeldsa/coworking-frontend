import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import moment from 'moment';
import Input from '../../components/Input';

import './styles.css';
import PageHeader from '../../components/PageHeader';

function DetailWorkStation({ match }) {
  const [workStation, setWorkStation] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const history = useHistory();

  const body = {
    name,
    description,
  };
  const authorization_user = localStorage.getItem('authorization');

  const headers = {
    authorization: authorization_user,
  };

  const id = match.params.id;

  const path = `/crud-workstation/${id}`;

  useEffect(() => {
    api
      .get(`workstation/${id}`, {
        headers: {
          authorization: authorization_user,
        },
      })
      .then((response) => {
        setWorkStation(response.data.workstation);
        setSchedules(response.data.schedules);
        setRooms(response.data.rooms);
      });
  }, []);
  console.log(schedules);
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

  function handleSave(e) {
    e.preventDefault();

    api
      .put(`https://coworkingbackend.herokuapp.com/workstation/${id}`, body, {
        headers,
      })
      .then(() => {
        alert('Alterações realizadas com sucesso!');

        history.goBack();
      })
      .catch(() => {
        alert('Erro no Cadastro!');
      });
  }

  return (
    <div id="page-wsDetail" className="container">
      <PageHeader title="WorkStation Details">
        <Link className="button" to="/list-workstations">
          WorkStations
        </Link>
        <Link className="button" to="/list-users">
          Listar Usuários
        </Link>
        <Link className="button" to="/editing-user">
          Editar informações de usuário
        </Link>
        <Link className="button" to={path}>
          CRUD-WorkStaion
        </Link>
        <Link className="button" to="/create-meeting">
          Criar Reunião
        </Link>
      </PageHeader>
      <div>
        <h1>WorkStation: {workStation.name}</h1>

        <h1>Horários</h1>
        <ul>
          {schedules.map((scheduleItem) => {
            return (
              <li key={scheduleItem.id}>
                <h2>Dia: {scheduleItem.week_day}</h2>
                <h2>
                  De: {getTimeFromMins(scheduleItem.from)} - Até:
                  {getTimeFromMins(scheduleItem.to)}
                </h2>
              </li>
            );
          })}
        </ul>

        <h1>Salas</h1>
        <ul>
          {rooms.map((room) => {
            return (
              <li key={room.name}>
                <h2>{room.name}</h2>
              </li>
            );
          })}
        </ul>
      </div>

      <main>
        <form onSubmit={handleSave}>
          <fieldset>
            <legend>Editar informações do WorkStation</legend>
            <Input
              name="name"
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name="name"
              label="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </fieldset>

          <footer>
            <button type="submit">Alterar Informações</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default DetailWorkStation;
