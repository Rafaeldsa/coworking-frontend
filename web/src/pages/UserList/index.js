import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import { Link, useStory } from 'react-router-dom';

import styles from './styles.css';
import PageHeader from '../../components/PageHeader';
import UserItem from '../../components/UserItem';

function UserList() {
  const [users, setUsers] = useState([]);

  const authorization_user = localStorage.getItem('authorization');

  useEffect(() => {
    async function loadingUsers() {
      const response = await api.get('users/list', {
        headers: {
          authorization: authorization_user,
        },
      });

      setUsers(response.data);
    }

    loadingUsers();
  }, []);

  return (
    <div id="page-users" className="container">
      <PageHeader
        title="Lista de Usuários"
        description="Aqui está a listagem de Usuários"
      >
        <Link className="button" to="/editing-user">
          Editar suas informações de usuário
        </Link>
      </PageHeader>

      <ul>
        {users.map((user) => {
          return <UserItem key={user.id} user={user} />;
        })}
      </ul>
    </div>
  );
}

export default UserList;
