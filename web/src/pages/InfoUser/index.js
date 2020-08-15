import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import './styles.css';
import PageHeader from '../../components/PageHeader';
import api from '../../services/api';
import axios from 'axios';

function InfoUser() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [data, setData] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [biografia, setBiografia] = useState('');

  const history = useHistory();

  const id = localStorage.getItem('userId');

  const authorization_user = localStorage.getItem('authorization');

  const body = {
    nome: name,
    data_nascimento: data,
    cpf,
    endereco_pessoal: endereco,
    biografia,
    email,
  };

  const headers = {
    authorization: authorization_user,
  };

  function handleSave(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/user/${id}`, body, { headers })
      .then(() => {
        alert('Alterações realizadas!');

        history.push('/list-workstations');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div id="page-info-user" className="container">
      <PageHeader title="Cadastro" description="Edite suas informações!">
        <Link to="/list-workstations">WorkStations</Link>
        <Link to="/list-users">Listar Usuários</Link>
      </PageHeader>

      <main>
        <form onSubmit={handleSave}>
          <fieldset>
            <legend>Seus Dados</legend>

            <Input
              name="name"
              label="Nome Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name="data"
              label="Data de Nascimento"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <Input
              name="cpf"
              label="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <Input
              name="endereço-pessoal"
              label="Endereço Pessoal"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
            <Textarea
              name="biografia"
              label="Biografia"
              value={biografia}
              onChange={(e) => setBiografia(e.target.value)}
            />
            <Input
              name="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          <footer>
            <button type="submit">Salvar informações</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default InfoUser;
