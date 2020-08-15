import React, { useState, useEffect } from 'react';

import './styles.css';
import api from '../../services/api';

const UserItem = ({ user }) => {
  const [admin, setAdmin] = useState(user.isAdmin);
  const data = {
    isAdmin: admin,
  };
  const authorization_user = localStorage.getItem('authorization');

  useEffect(() => {
    try {
      api
        .post('user/', admin, {
          params: {
            id: user.id,
          },
          headers: {
            authorization: authorization_user,
          },
        })
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  }, [admin]);

  async function changeAdmin() {
    if (admin == 1) {
      setAdmin(0);
    } else {
      setAdmin(1);
    }
  }
  console.log();
  return (
    <article className="user-item">
      <header>
        <div>
          <h1>Nome: {user.nome}</h1>
        </div>
      </header>
      <h2>Data de Nascimento: {user.data_nascimento}</h2>
      <h2>Endereço: {user.endereco_pessoal}</h2>
      <h2>Admin: {admin} </h2>
      <h1>Biografia: {user.biografia}</h1>

      <footer>
        <button onClick={changeAdmin}>Tornar Admin</button>
      </footer>
    </article>
  );
};

export default UserItem;
