import { Cliente } from '../types';

// Função para buscar os dados dos clientes a partir do Google Sheets
export const fetchClientes = async (): Promise<Cliente[]> => {
  const url =
    'https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes';
  
  try {
    // Realiza a requisição para a URL e obtém os dados no formato CSV
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados dos clientes');
    }
    const csvData = await response.text();

    // Converte o CSV para um formato manipulável (JSON)
    const clientes = parseCSVToClientes(csvData);
    
    return clientes;
  } catch (error) {
    console.error('Erro ao obter clientes:', error);
    return [];
  }
};

// Função para fazer o parsing do CSV para um array de objetos do tipo Cliente
const parseCSVToClientes = (csvData: string): Cliente[] => {
  const linhas = csvData.split('\n');
  const clientes: Cliente[] = [];

  // Itera sobre as linhas do CSV e cria objetos Cliente
  for (let i = 1; i < linhas.length; i++) {
    const dados = linhas[i].split(',');

    // Verifica se a linha contém os dados necessários
    if (dados.length < 10) continue;

    const cliente: Cliente = {
      id: dados[0],
      nome: dados[1],
      cpfCnpj: dados[2],
      rg: dados[3] || '',
      dataNascimento: new Date(dados[4]),
      email: dados[5],
      endereco: dados[6],
      rendaAnual: parseFloat(dados[7]),
      patrimonio: parseFloat(dados[8]),
      estadoCivil: dados[9] as 'Solteiro' | 'Casado' | 'Viúvo' | 'Divorciado',
      codigoAgencia: parseInt(dados[10], 10),
    };

    clientes.push(cliente);
  }

  return clientes;
};
