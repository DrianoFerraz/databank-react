import React from 'react';
import { Cliente } from '../types';

interface ClienteCardProps {
  cliente: Cliente;
}

const ClienteCard: React.FC<ClienteCardProps> = ({ cliente }) => {
  return (
    <div className="cliente-card">
      <h3>{cliente.nome}</h3>
      <p>CPF/CNPJ: {cliente.cpfCnpj}</p>
    </div>
  );
};

export default ClienteCard;
