import { useRef } from "react";
import type { TouchEvent } from "react";

/**
 * Deslizar com o dedo para os lados (celular e tablet).
 * Só conta como deslize quando o movimento é mais horizontal do que vertical,
 * para não atrapalhar a rolagem normal da página.
 */
export function useDeslizar(paraEsquerda: () => void, paraDireita: () => void, minimo = 40) {
  const inicio = useRef<{ x: number; y: number } | null>(null);
  const deslizou = useRef(false);

  const onTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    inicio.current = { x: t.clientX, y: t.clientY };
    deslizou.current = false;
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (!inicio.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - inicio.current.x;
    const dy = t.clientY - inicio.current.y;
    inicio.current = null;
    if (Math.abs(dx) < minimo || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    deslizou.current = true;
    // Dedo para a esquerda mostra o próximo; para a direita, o anterior
    if (dx < 0) paraEsquerda();
    else paraDireita();
  };

  return {
    /** Espalhe no elemento que recebe o gesto. */
    gestos: { onTouchStart, onTouchEnd },
    /** true logo depois de um deslize, para ignorar o toque que vem junto. */
    deslizou,
  };
}
