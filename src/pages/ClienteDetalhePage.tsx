import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Cliente, Conta, Agencia } from "../types";
import { useClientes } from "../hooks/useClientes";
import { useContas } from "../hooks/useContas";
import { useAgencias } from "../hooks/useAgencias";

export default function ClienteDetalhePage() {
  const { id } = useParams<{ id: string }>();
  const { clientes, loading: loadingClientes } = useClientes();
  const { contas, loading: loadingContas } = useContas();
  const { agencias, loading: loadingAgencias } = useAgencias();

  const [cliente, setCliente] = useState<Cliente | undefined>(undefined);
  const [contasDoCliente, setContasDoCliente] = useState<Conta[]>([]);
  const [agenciaDoCliente, setAgenciaDoCliente] = useState<Agencia | null>(null);

  useEffect(() => {
    if (!clientes.length || !contas.length || !agencias.length) return;

    const clienteSelecionado = clientes.find((c) => c.id === id);
    setCliente(clienteSelecionado);

    if (clienteSelecionado) {
      const contasFiltradas = contas.filter(
        (conta) => conta.cpfCnpjCliente === clienteSelecionado.cpfCnpj
      );
      setContasDoCliente(contasFiltradas);

      const agencia = agencias.find(
        (a) => a.codigo === clienteSelecionado.codigoAgencia
      );
      setAgenciaDoCliente(agencia || null);
    }
  }, [clientes, contas, agencias, id]);

  if (loadingClientes || loadingContas || loadingAgencias || !cliente) {
    return <p className="p-4">Carregando...</p>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Voltar para lista
      </Link>

      <h1 className="text-2xl font-bold mb-4">Detalhes do Cliente</h1>

      <div className="bg-white rounded shadow p-4 space-y-2 mb-6">
        <p><strong>Nome:</strong> {cliente.nome}</p>
        {cliente.nomeSocial && <p><strong>Nome Social:</strong> {cliente.nomeSocial}</p>}
        <p><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</p>
        <p><strong>RG:</strong> {cliente.rg || "Não informado"}</p>
        <p><strong>Data de nascimento:</strong> {cliente.dataNascimento.toLocaleDateString()}</p>
        <p><strong>Email:</strong> {cliente.email}</p>
        <p><strong>Endereço:</strong> {cliente.endereco}</p>
        <p><strong>Renda Anual:</strong> R$ {cliente.rendaAnual.toLocaleString()}</p>
        <p><strong>Patrimônio:</strong> R$ {cliente.patrimonio.toLocaleString()}</p>
        <p><strong>Estado Civil:</strong> {cliente.estadoCivil}</p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Contas Bancárias</h2>
      {contasDoCliente.length > 0 ? (
        <ul className="space-y-2 mb-6">
          {contasDoCliente.map((conta) => (
            <li
              key={conta.id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <div>
                <p><strong>Tipo:</strong> {conta.tipo}</p>
                <p><strong>Saldo:</strong> R$ {conta.saldo.toLocaleString()}</p>
                <p><strong>Limite de Crédito:</strong> R$ {conta.limiteCredito.toLocaleString()}</p>
                <p><strong>Crédito Disponível:</strong> R$ {conta.creditoDisponivel.toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 mb-6">Nenhuma conta encontrada.</p>
      )}

      <h2 className="text-xl font-semibold mb-2">Agência</h2>
      {agenciaDoCliente ? (
        <div className="bg-white rounded shadow p-4">
          <p><strong>Nome:</strong> {agenciaDoCliente.nome}</p>
          <p><strong>Código:</strong> {agenciaDoCliente.codigo}</p>
          <p><strong>Endereço:</strong> {agenciaDoCliente.endereco}</p>
        </div>
      ) : (
        <p className="text-gray-600">Agência não encontrada.</p>
      )}
    </div>
  );
}
