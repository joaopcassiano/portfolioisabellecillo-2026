import type Lenis from "lenis";

// Instância global da rolagem suave, para os componentes poderem rolar por código.
export const scroller: { lenis: Lenis | null } = { lenis: null };

export function rolarAte(y: number, duracao = 1.2) {
  if (scroller.lenis) scroller.lenis.scrollTo(y, { duration: duracao });
  else window.scrollTo({ top: y, behavior: "smooth" });
}
