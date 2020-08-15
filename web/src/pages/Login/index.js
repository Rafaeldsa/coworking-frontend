import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import styles from './styles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const history = useHistory();

  async function handleCadastro(e) {
    e.preventDefault();

    try {
      const response = api.post('create-user', {
        email,
        senha,
      });

      alert('Email enviado para confirmação!');
    } catch (err) {
      alert('Erro no cadastro');
    }
  }

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('session/login', {
        email,
        senha,
      });

      localStorage.setItem('email', email);
      localStorage.setItem('authorization', response.data.token);

      history.push('/list-workstations');
    } catch (err) {
      alert('Falha no login, tente novamente.');
    }
  }

  return (
    <div id="page-login" className="container">
      <PageHeader title="Bem-vindo ao gerenciamento de coworking!" />
      <main>
        <form onSubmit={handleLogin}>
          <fieldset>
            <legend>Login</legend>
            <Input
              type="email"
              name="Email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              name="Senha"
              label="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </fieldset>

          <button type="submit">Realizar LogIn</button>
        </form>
        <button onClick={handleCadastro}>Realizar Cadastro</button>
        <button onClick={handleCadastro}>Reenviar email</button>
      </main>
    </div>
  );
}

export default Login;
