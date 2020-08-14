import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import styles from './styles.css';

function Login() {
  return (
    <div id="page-login" className="container">
      <PageHeader title="Bem-vindo ao gerenciamento de coworking!" />
      <main>
        <form onSubmit={() => {}}>
          <fieldset>
            <legend>Login</legend>
            <Input name="Email" label="Email" />
            <Input name="Senha" label="Senha" />
          </fieldset>

          <button tye="submit">Realizar Cadastro</button>

          <Link>Realizar Login</Link>
        </form>
      </main>
    </div>
  );
}

export default Login;
