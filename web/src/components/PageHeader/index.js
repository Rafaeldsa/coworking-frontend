import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const PageHeader = (props) => {
  return (
    <header className="page-header">
      <div className="container">
        <h1>CoWorking</h1>
      </div>

      <div className="header-content">
        <strong>{props.title}</strong>
        {props.description && <p>{props.description}</p>}
        {props.children}
      </div>
    </header>
  );
};
export default PageHeader;
