import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import { Link, useStory } from 'react-router-dom';

import styles from './styles.css';
import PageHeader from '../../components/PageHeader';
import WorkStationItem from '../../components/WorksStationItem';

function WorkStationList() {
  const [workstations, setWorkstations] = useState([]);

  useEffect(() => {
    async function loadingWorkStations() {
      const response = await api.get('workstations', {
        headers: {
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhZmFlbGRhbnRhczQ2MUBnbWFpbC5jb20iLCJpYXQiOjE1OTc0MzA2NDQsImV4cCI6MTU5ODAzNTQ0NH0.aPXrSxLf9uQ8x_dQeyyEY0mrmMpyGzU4PYI_bczeJsc',
        },
      });

      setWorkstations(response.data);
    }

    loadingWorkStations();
  }, []);

  return (
    <div id="page-workstations" className="container">
      <PageHeader title="Cadastro" description="Edite suas informações!">
        <Link>WorkStations</Link>
        <Link>Listar Usuários</Link>
        <Link>Editar informações de usuário</Link>
      </PageHeader>

      <ul>
        {workstations.map((workstation) => {
          return (
            <WorkStationItem key={workstation.id} workstation={workstation} />
          );
        })}
      </ul>
    </div>
  );
}

export default WorkStationList;
