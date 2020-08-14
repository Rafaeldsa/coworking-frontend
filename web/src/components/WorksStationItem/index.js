import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import './styles.css';

const WorkStationItem = ({ workstation }) => {
  const [workStationId, setWorkStationId] = useState(workstation.id);

  const path = ``;

  return (
    <article className="workstation-item">
      <header>
        <div>
          <strong>{workstation.name}</strong>
        </div>
      </header>
      <p>{workstation.description}</p>

      <footer>
        <Link>Agendar workstation</Link>
        <Link>Editar workstation</Link>
      </footer>
    </article>
  );
};

export default WorkStationItem;
