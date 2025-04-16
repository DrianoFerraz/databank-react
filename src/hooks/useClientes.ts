import { useState, useEffect } from 'react';
import { Cliente } from '../types';

export const useClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchClientes = async () => {
      const response = await fetch('https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes');
      const csvData = await response.text();
      const clientesParsed = parseCSVToClientes(csvData);
      setClientes(clientesParsed);
      setLoading(false);
    };

    fetchClientes();
  }, []);

  const parseCSVToClientes = (csvData: string): Cliente[] => {
    const lines = csvData.split('\n');
    const clientes: Cliente[] = [];

    for (let i = 1; i < lines.length; i++) {
      const columns = lines[i].split(',');

      if (columns.length >= 10) {
        const cliente: Cliente = {
          id: columns[0],
          cpfCnpj: columns[1],
          rg: columns[2] || undefined,
          dataNascimento: new Date(columns[3]),
          nome: columns[4],
          nomeSocial: columns[5] || undefined,
          email: columns[6],
          endereco: columns[7],
          rendaAnual: parseFloat(columns[8]),
          patrimonio: parseFloat(columns[9]),
          estadoCivil: columns[10] as 'Solteiro' | 'Casado' | 'Viúvo' | 'Divorciado',
          codigoAgencia: Number(columns[11]),
        };
        clientes.push(cliente);
      }
    }

    return clientes;
  };

  return { clientes, loading };
};
