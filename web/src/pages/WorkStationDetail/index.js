import React from 'react';

import { Link, useStory } from 'react-router-dom';
import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import styles from './styles.css';
import PageHeader from '../../components/PageHeader';

function InfoUser() {
  return (
    <div id="page-info-user" className="container">
      <PageHeader title="Cadastro" description="Edite suas informações!">
        <Link to="/workstations">WorkStations</Link>
        <Link>Listar Usuários</Link>
        <Link>Editar informações de usuário</Link>
      </PageHeader>

      <main>
        <form onSubmit={() => {}}>
          <fieldset>
            <legend>Seus Dados</legend>

            <Input name="name" label="Nome Completo" />
            <Input name="data" label="Data de Nascimento" />
            <Input name="cpf" label="CPF" />
            <Input name="endereço-pessoal" label="Endereço Pessoal" />
            <Textarea name="biografia" label="Biografia" />
            <Input name="email" label="Email" />
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
