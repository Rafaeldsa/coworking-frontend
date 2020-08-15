import React, { useState, useEffect } from 'react';
import { Link, useStory, useHistory } from 'react-router-dom';

import api from '../../services/api';

import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import styles from './styles.css';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';

function CRUDWorkStation({ match }) {
  const [workStation, setWorkStation] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [data, setData] = useState('');

  const history = useHistory();

  const authorization_user = localStorage.getItem('authorization');

  const id = match.params.id;

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

  function addNewScheduleItem() {
    setSchedules([...schedules, { week_day: '0', from: '', to: '' }]);
  }

  function setScheduleItemValue(position, field, value) {
    const updatedScheduleItems = schedules.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setSchedules(updatedScheduleItems);
  }

  function handleSave(e) {
    e.preventDefault();

    api
      .post(`/workstation:${id}`, {
        name,
        schedule: schedules,
      })
      .then(() => {
        alert('Alterações realizadas com sucesso!');

        history.goBack();
      })
      .catch(() => {
        alert('Erro no Cadastro!');
      });

    console.log({
      name,
      description,
      schedules,
    });
  }

  return (
    <div id="page-wsDetail" className="container">
      <PageHeader title="CRUD-WorkStation">
        <Link to="/workstations">WorkStations</Link>
        <Link to="/list-users">Listar Usuários</Link>
        <Link>Editar informações de usuário</Link>
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
              label="Nome"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {schedules.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    onChange={(e) =>
                      setScheduleItemValue(index, 'week_day', e.target.value)
                    }
                    value={scheduleItem.week_day}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-feira' },
                      { value: '2', label: 'Terça-feira' },
                      { value: '3', label: 'Quarta-feira' },
                      { value: '4', label: 'Quinta-feira' },
                      { value: '5', label: 'Sexta-feira' },
                      { value: '6', label: 'Sábado' },
                    ]}
                  />
                  <Input
                    name="from"
                    label="Das"
                    type="time"
                    onChange={(e) =>
                      setScheduleItemValue(index, 'from', e.target.value)
                    }
                    value={scheduleItem.from}
                  />
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    onChange={(e) =>
                      setScheduleItemValue(index, 'to', e.target.value)
                    }
                    value={scheduleItem.to}
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <button type="submit">Salvar alterações</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default CRUDWorkStation;
