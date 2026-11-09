import { useEffect, useState } from "react";

/**
 * Guarda qual item está na tela, qual estava antes e para que lado foi a troca.
 * O item anterior fica disponível por um instante, para a transição mostrar os dois ao mesmo tempo.
 */
export function useTroca(total: number, duracaoMs = 950) {
  const [estado, setEstado] = useState<{ atual: number; anterior: number | null; direcao: 1 | -1 }>({
    atual: 0,
    anterior: null,
    direcao: 1,
  });

  const ir = (passo: number) =>
    setEstado((s) => ({ atual: (s.atual + passo + total) % total, anterior: s.atual, direcao: passo >= 0 ? 1 : -1 }));

  const irPara = (i: number) =>
    setEstado((s) => (i === s.atual ? s : { atual: i, anterior: s.atual, direcao: i > s.atual ? 1 : -1 }));

  // Depois da transição, o item anterior sai de cena
  useEffect(() => {
    if (estado.anterior === null) return;
    const id = window.setTimeout(() => setEstado((s) => ({ ...s, anterior: null })), duracaoMs);
    return () => window.clearTimeout(id);
  }, [estado.atual, estado.anterior, duracaoMs]);

  return { ...estado, ir, irPara };
}
