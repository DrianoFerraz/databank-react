import { useEffect, useState } from "react";
import { Agencia } from "../types";
import { fetchAgencias } from "../services/clientesService";

export function useAgencias() {
  const [agencias, setAgencias] = useState<Agencia[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    fetchAgencias()
      .then(setAgencias)
      .catch(() => setErro("Erro ao carregar agências"))
      .finally(() => setLoading(false));
  }, []);

  return { agencias, loading, erro };
}
