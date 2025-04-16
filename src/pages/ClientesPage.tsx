import { useState } from "react";
import { useClientes } from "../hooks/useClientes";
import { Cliente } from "../types";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

export default function ClientesPage() {
  const { clientes, loading, erro } = useClientes();
  const [busca, setBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);

  const filtrarClientes = (cliente: Cliente) => {
    const termo = busca.toLowerCase();
    return (
      cliente.nome.toLowerCase().includes(termo) ||
      cliente.cpfCnpj.replace(/\D/g, "").includes(termo.replace(/\D/g, ""))
    );
  };

  const clientesFiltrados = clientes.filter(filtrarClientes);

  const totalPaginas = Math.ceil(clientesFiltrados.length / ITEMS_PER_PAGE);
  const inicio = (paginaAtual - 1) * ITEMS_PER_PAGE;
  const fim = inicio + ITEMS_PER_PAGE;
  const clientesPaginados = clientesFiltrados.slice(inicio, fim);

  if (loading) return <p className="p-4">Carregando clientes...</p>;
  if (erro) return <p className="p-4 text-red-500">{erro}</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>

      <input
        type="text"
        placeholder="Buscar por nome ou CPF/CNPJ..."
        value={busca}
        onChange={(e) => {
          setBusca(e.target.value);
          setPaginaAtual(1);
        }}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        aria-label="Buscar cliente por nome ou CPF/CNPJ"
      />

      <ul className="space-y-4">
        {clientesPaginados.map((cliente) => (
          <li
            key={cliente.id}
            className="p-4 bg-white rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{cliente.nome}</p>
              <p className="text-sm text-gray-600">{cliente.cpfCnpj}</p>
            </div>
            <Link
              to={`/cliente/${cliente.id}`}
              className="text-blue-600 hover:underline"
            >
              Ver detalhes
            </Link>
          </li>
        ))}
      </ul>

      {totalPaginas > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i}
              onClick={() => setPaginaAtual(i + 1)}
              className={`px-3 py-1 rounded ${
                i + 1 === paginaAtual
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              aria-label={`Ir para a página ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
