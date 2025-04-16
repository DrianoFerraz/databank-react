import { useState, useEffect } from 'react';
import { Conta } from '../types';

export const useContas = () => {
  const [contas, setContas] = useState<Conta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchContas = async () => {
      const response = await fetch('https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas');
      const csvData = await response.text();
      const contasParsed = parseCSVToContas(csvData);
      setContas(contasParsed);
      setLoading(false);
    };

    fetchContas();
  }, []);

  const parseCSVToContas = (csvData: string): Conta[] => {
    const lines = csvData.split('\n');
    const contas: Conta[] = [];

    for (let i = 1; i < lines.length; i++) {
      const columns = lines[i].split(',');

      if (columns.length >= 5) {
        const conta: Conta = {
          id: columns[0],
          cpfCnpjCliente: columns[1],
          tipo: columns[2] as 'corrente' | 'poupanca',
          saldo: parseFloat(columns[3]),
          limiteCredito: parseFloat(columns[4]),
          creditoDisponivel: parseFloat(columns[5]),
        };
        contas.push(conta);
      }
    }

    return contas;
  };

  return { contas, loading };
};
