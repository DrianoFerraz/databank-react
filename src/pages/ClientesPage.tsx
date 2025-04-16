import React from 'react';
import { useClientes } from '../hooks/useClientes';

const ClientesPage: React.FC = () => {
  const { clientes, loading } = useClientes();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            <h3>{cliente.nome}</h3>
            <p>Email: {cliente.email}</p>
            <p>CPF/CNPJ: {cliente.cpfCnpj}</p>
            <p>Estado Civil: {cliente.estadoCivil}</p>
            <p>Renda Anual: {cliente.rendaAnual}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientesPage;
