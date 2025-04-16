import { useEffect, useState } from "react";
import { Conta } from "../types";
import { fetchContas } from "../services/clientesService";

export function useContas() {
  const [contas, setContas] = useState<Conta[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetchContas()
      .then(setContas)
      .catch(() => setErro("Erro ao carregar contas"))
      .finally(() => setLoading(false));
  }, []);

  return { contas, loading, erro };
}
