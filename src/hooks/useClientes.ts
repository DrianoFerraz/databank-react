import { useEffect, useState } from "react";
import { Cliente } from "../types";
import { fetchClientes } from "../services/clientesService";

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const carregarClientes = async () => {
      try {
        const dados = await fetchClientes();
        setClientes(dados);
      } catch (err) {
        setErro("Erro ao carregar os clientes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    carregarClientes();
  }, []);

  return { clientes, loading, erro };
}
