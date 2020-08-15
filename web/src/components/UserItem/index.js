import React, { useState } from 'react';

import './styles.css';

const UserItem = ({ user }) => {
  const [admin, setAdmin] = useState(user.isAdmin);

  async function changeAdmin() {
    if (admin === 1) {
      setAdmin(0);
    } else {
      setAdmin(1);
    }
  }

  const response = await api.get('workstations/list', {
    headers: {
      authorization: authorization_user,
    },
  });

  return (
    <article className="workstation-item">
      <header>
        <div>
          <strong>Nome: {user.name}</strong>
        </div>
      </header>
      <h2>Data de Nascimento: {user.data_nascimento}</h2>
      <h2>Endereço: {user.endereco_pessoal}</h2>
      <h2>Admin: {admin}</h2>
      <h1>Biografia: {user.biografia}</h1>

      <button onClick={changeAdmin}>Tornar Admin</button>
    </article>
  );
};

export default UserItem;
