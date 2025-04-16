import { useState, useEffect } from 'react';
import { Agencia } from '../types';

export const useAgencias = () => {
  const [agencias, setAgencias] = useState<Agencia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAgencias = async () => {
      const response = await fetch('https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias');
      const csvData = await response.text();
      const agenciasParsed = parseCSVToAgencias(csvData);
      setAgencias(agenciasParsed);
      setLoading(false);
    };

    fetchAgencias();
  }, []);

  const parseCSVToAgencias = (csvData: string): Agencia[] => {
    const lines = csvData.split('\n');
    const agencias: Agencia[] = [];

    for (let i = 1; i < lines.length; i++) {
      const columns = lines[i].split(',');

      if (columns.length >= 4) {
        const agencia: Agencia = {
          id: columns[0],
          codigo: Number(columns[1]),
          nome: columns[2],
          endereco: columns[3],
        };
        agencias.push(agencia);
      }
    }

    return agencias;
  };

  return { agencias, loading };
};
