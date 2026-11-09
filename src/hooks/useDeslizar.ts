import { useRef } from "react";
import type { TouchEvent } from "react";

/**
 * Deslizar com o dedo para os lados (celular e tablet).
 * Enquanto o dedo arrasta, o elemento acompanha o movimento; ao soltar, troca de item
 * se o gesto foi longo o bastante, ou volta macio para o lugar.
 * Só conta como deslize quando o movimento é mais horizontal do que vertical,
 * para não atrapalhar a rolagem normal da página.
 */
export function useDeslizar(paraEsquerda: () => void, paraDireita: () => void, minimo = 50) {
  const inicio = useRef<{ x: number; y: number } | null>(null);
  const horizontal = useRef<boolean | null>(null);
  const deslizou = useRef(false);
  const alvo = useRef<HTMLElement | null>(null);

  const mover = (dx: number, animado: boolean) => {
    const el = alvo.current;
    if (!el) return;
    el.style.transition = animado ? "transform 450ms cubic-bezier(0.22, 1, 0.36, 1)" : "none";
    el.style.transform = dx ? `translateX(${dx}px)` : "";
  };

  const onTouchStart = (e: TouchEvent<HTMLElement>) => {
    const t = e.touches[0];
    inicio.current = { x: t.clientX, y: t.clientY };
    horizontal.current = null;
    deslizou.current = false;
    alvo.current = e.currentTarget;
  };

  const onTouchMove = (e: TouchEvent<HTMLElement>) => {
    if (!inicio.current) return;
    const t = e.touches[0];
    const dx = t.clientX - inicio.current.x;
    const dy = t.clientY - inicio.current.y;
    // Decide a direção do gesto nos primeiros pixels e mantém até soltar
    if (horizontal.current === null && Math.abs(dx) + Math.abs(dy) > 8) horizontal.current = Math.abs(dx) > Math.abs(dy);
    // Acompanha o dedo com um pouco de resistência, como um cartão de verdade
    if (horizontal.current) mover(dx * 0.55, false);
  };

  const onTouchEnd = (e: TouchEvent<HTMLElement>) => {
    if (!inicio.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - inicio.current.x;
    inicio.current = null;
    const valeu = horizontal.current && Math.abs(dx) >= minimo;
    if (!valeu) {
      mover(0, true);
      return;
    }
    deslizou.current = true;
    // O cartão novo já entra deslizando; o arraste some sem pulo
    mover(0, false);
    // Dedo para a esquerda mostra o próximo; para a direita, o anterior
    if (dx < 0) paraEsquerda();
    else paraDireita();
  };

  return {
    /** Espalhe no elemento que recebe o gesto (ele também é o que acompanha o dedo). */
    gestos: { onTouchStart, onTouchMove, onTouchEnd },
    /** true logo depois de um deslize, para ignorar o toque que vem junto. */
    deslizou,
  };
}
