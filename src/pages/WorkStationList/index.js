import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import { Link, useStory } from 'react-router-dom';

import styles from './styles.css';
import PageHeader from '../../components/PageHeader';
import WorkStationItem from '../../components/WorksStationItem';

function WorkStationList() {
  const [workstations, setWorkstations] = useState([]);

  const authorization_user = localStorage.getItem('authorization');

  useEffect(() => {
    async function loadingWorkStations() {
      const response = await api.get('workstations/list', {
        headers: {
          authorization: authorization_user,
        },
      });

      setWorkstations(response.data);
    }

    loadingWorkStations();
  }, []);

  return (
    <div id="page-workstations" className="container">
      <PageHeader
        title="Lista de WorkStations"
        description="Aqqui está a listagem de WorkStations"
      >
        <Link className="button" to="/list-users">
          Listar Usuários
        </Link>
        <Link className="button" to="/list-meetings">
          Listar Reuniões
        </Link>

        <Link className="button" to="/editing-user">
          Editar informações
        </Link>
      </PageHeader>
      <div>
        <ul>
          {workstations.map((workstation) => {
            return (
              <WorkStationItem key={workstation.id} workstation={workstation} />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default WorkStationList;
