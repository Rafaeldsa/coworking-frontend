import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

const WorkStationItem = ({ workstation }) => {
  const [workStationId, setWorkStationId] = useState(workstation.id);

  const path = `/workstation/${workstation.id}`;

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
      </footer>
    </article>
  );
};

export default WorkStationItem;
