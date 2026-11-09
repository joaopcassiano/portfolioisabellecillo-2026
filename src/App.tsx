import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./lib/gsap";
import { scroller } from "./lib/lenis";
import { iniciarAbertura } from "./lib/abertura";
import Hero from "./components/Hero";
import Especialidades from "./components/Especialidades";
import Atendimentos from "./components/Atendimentos";
import Sobre from "./components/Sobre";
import Depoimentos from "./components/Depoimentos";
import Localizacao from "./components/Localizacao";
import Contato from "./components/Contato";
import Rodape from "./components/Rodape";

export default function App() {
  // Rolagem suave sincronizada com o ScrollTrigger, que dá ritmo às animações de rolagem.
  useEffect(() => {
    // Sinaliza que o JavaScript assumiu a página (algumas animações só escondem conteúdo depois disso)
    document.documentElement.classList.add("pronto");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      iniciarAbertura();
      return;
    }
    const lenis = new Lenis({ lerp: 0.085, anchors: { offset: -88 } });
    scroller.lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.documentElement.style.scrollBehavior = "auto";
    iniciarAbertura();
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      scroller.lenis = null;
    };
  }, []);

  return (
    <>
      <a href="#conteudo" className="pular">
        Pular para o conteúdo
      </a>
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Especialidades />
        <Atendimentos />
        <Sobre />
        <Depoimentos />
        <Localizacao />
        <Contato />
      </main>
      <Rodape />
    </>
  );
}
