import { scroller } from "./lenis";

// Abertura (preloader) que vem pronta no HTML (index.html). Aqui só decidimos quando ela sai:
// depois do giro de 0° a 180°, com as fontes e a foto da hero prontas (ou no máximo 3,5 s).
let liberar: () => void = () => {};
/** Resolve quando a abertura começa a sair (ou logo de cara, quando ela não aparece). */
export const aberturaSaiu = new Promise<void>((r) => (liberar = r));

let iniciada = false;

const esperar = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

export function iniciarAbertura() {
  if (iniciada) return;
  iniciada = true;
  const html = document.documentElement;
  const el = document.getElementById("abertura");
  if (!el || !html.classList.contains("com-abertura")) {
    el?.remove();
    liberar();
    return;
  }

  scroller.lenis?.stop();
  html.style.overflow = "hidden";

  // O giro dura 1,5 s contando do início do carregamento da página
  const giro = esperar(Math.max(0, 1550 - performance.now()));
  const foto = document.querySelector<HTMLImageElement>(".hero-foto");
  const carregou = Promise.all([document.fonts.ready, foto?.decode().catch(() => {})]);

  Promise.all([giro, Promise.race([carregou, esperar(3500)])]).then(async () => {
    el.classList.add("saindo");
    html.style.overflow = "";
    scroller.lenis?.start();
    try {
      sessionStorage.setItem("ic-abertura", "1");
    } catch {
      /* navegação privada: a abertura volta a aparecer na próxima visita, sem problema */
    }
    await esperar(250);
    liberar();
    await esperar(900);
    el.remove();
  });
}
