import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Input from '../../components/Input';
import api from '../../services/api';

import './styles.css';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';

function CRUDWorkStation({ match }) {
  const [schedules, setSchedules] = useState([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const history = useHistory();

  const body = {
    name,
    description,
    schedule: schedules,
  };
  const authorization_user = localStorage.getItem('authorization');

  const headers = {
    authorization: authorization_user,
  };

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
      .post(
        'https://coworkingbackend.herokuapp.com//create-workstation/',
        body,
        { headers }
      )
      .then(() => {
        alert('Alterações realizadas com sucesso!');

        history.goBack();
      })
      .catch(() => {
        alert('Erro no Cadastro!');
      });
  }

  return (
    <div id="page-crudWs" className="container">
      <PageHeader title="WorkStation CRUD">
        <Link to="/workstations">WorkStations</Link>
        <Link to="/list-users">Listar Usuários</Link>
        <Link to="/editing-user">Editar informações de usuário</Link>
      </PageHeader>

      <main>
        <form onSubmit={handleSave}>
          <fieldset>
            <legend>Criar nova WorkStation</legend>
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
            <button type="submit">Criar nova WorkStation</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default CRUDWorkStation;
