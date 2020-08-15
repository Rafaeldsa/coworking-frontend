import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Input from '../../components/Input';
import axios from 'axios';

import './styles.css';
import PageHeader from '../../components/PageHeader';

function CRUDMeeting({ match }) {
  const [schedules, setSchedules] = useState([]);
  const [creator, setCreator] = useState('');
  const [room_id, setRoomId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const history = useHistory();

  const body = {
    creator,
    description,
    name,
    room_id,
    schedules,
  };
  const authorization_user = localStorage.getItem('authorization');

  const headers = {
    authorization: authorization_user,
  };

  function addNewScheduleItem() {
    setSchedules([...schedules, { from: '', to: '' }]);
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

    axios
      .post(
        'https://coworkingbackend.herokuapp.com//meeting',
        {
          body,
        },
        { headers }
      )
      .then(() => {
        alert('Reunião criada com sucesso!');

        history.goBack();
      })
      .catch(() => {
        alert('Erro no Cadastro!');
      });
  }

  console.log(body);

  return (
    <div id="page-crudMeeting" className="container">
      <PageHeader title="Criar Reunião">
        <Link className="button" to="/list-workstations">
          WorkStations
        </Link>
        <Link className="button" to="/list-users">
          Listar Usuários
        </Link>
        <Link className="button" to="/editing-user">
          Editar informações de usuário
        </Link>
      </PageHeader>

      <main>
        <form onSubmit={handleSave}>
          <fieldset>
            <legend>Criar nova Reuniao</legend>
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
            <Input
              name="name"
              label="Nome do criador da reunião"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
            />
            <Input
              name="name"
              label="ID da reunião"
              value={room_id}
              onChange={(e) => setRoomId(Number(e.target.value))}
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
                <div key={index} className="schedule-item">
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
            <button type="submit">Criar nova WorkStation</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default CRUDMeeting;
