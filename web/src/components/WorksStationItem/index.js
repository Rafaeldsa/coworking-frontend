import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

const WorkStationItem = ({ workstation }) => {
  const path = `/workstation/${workstation.id}`;

  const authorization = localStorage.getItem('authorization');

  const headers = {
    authorization,
  };

  function deleteWorStation() {
    api
      .delete(`/workstation/${workstation.id}`, { headers })
      .then(() => {
        alert('WorkStation deletada');
      })
      .catch(() => {
        alert('Erro ao deletar!');
      });
  }

  return (
    <article className="workstation-item">
      <header>
        <div>
          <strong>{workstation.name}</strong>
        </div>
      </header>
      <p>{workstation.description}</p>

      <footer>
        <Link to={path}>Agendar WorKstation</Link>
        <button onClick={deleteWorStation}>Deletar WorKstation</button>
      </footer>
    </article>
  );
};

export default WorkStationItem;
