import React from 'react';
import ClienteCard from './ClienteCard';
import { Cliente } from '../types';

interface ClienteListProps {
  clientes: Cliente[];
}

const ClienteList: React.FC<ClienteListProps> = ({ clientes }) => {
  return (
    <div className="cliente-list">
      {clientes.map((cliente) => (
        <ClienteCard key={cliente.id} cliente={cliente} />
      ))}
    </div>
  );
};

export default ClienteList;
