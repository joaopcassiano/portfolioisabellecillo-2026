import { useRef } from "react";
import { hero } from "../data/imagens";
import { contato } from "../data/site";
import { useFontesProntas } from "../hooks/useFontesProntas";
import { aberturaSaiu } from "../lib/abertura";
import { COM_MOVIMENTO, gsap, SplitText, useGSAP } from "../lib/gsap";
import Cabecalho from "./Cabecalho";
import CartoesHero from "./CartoesHero";
import { Seta } from "./Icones";

export default function Hero() {
  const escopo = useRef<HTMLElement>(null);
  const fontes = useFontesProntas();

  // Entrada da foto, do anel e dos textos: começa quando a abertura (preloader) sai,
  // sem esperar as fontes, para a foto (o maior elemento da primeira tela) aparecer o quanto antes
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(COM_MOVIMENTO, () => {
        const entrada = gsap
          .timeline({ paused: true, defaults: { ease: "expo.out" } })
          .set(".entrada:not(.hero-nome)", { visibility: "visible" })
          .from(".hero-anel", { autoAlpha: 0, scale: 0.9, rotate: -40, duration: 1.6 }, 0)
          .from(".hero-foto", { autoAlpha: 0, y: 70, scale: 0.97, duration: 1.4 }, 0.05)
          .from([".hero-rotulo", ".hero-cidade"], { autoAlpha: 0, y: 12, duration: 0.9 }, 0.4)
          .from(".hero-texto > *", { autoAlpha: 0, y: 18, duration: 0.9, stagger: 0.06 }, 0.5)
          .from(".hero-cartoes", { autoAlpha: 0, y: 18, duration: 0.9 }, 0.65);
        // Começa quando a abertura (preloader) sai, ou logo de cara quando ela não aparece
        aberturaSaiu.then(() => entrada.play());

        // Rolagem: a foto e o nome se afastam em velocidades diferentes, dando profundidade
        gsap
          .timeline({ scrollTrigger: { trigger: escopo.current, start: "top top", end: "bottom top", scrub: 0.6 } })
          .to(".hero-foto", { yPercent: 12, ease: "none" }, 0)
          // Valores de partida explícitos: o nome ainda está escondido (até as letras subirem) quando isto é montado
          .fromTo(".hero-nome", { yPercent: 0, opacity: 1 }, { yPercent: 60, opacity: 0.15, ease: "none" }, 0)
          .to(".hero-anel", { rotate: 14, scale: 1.08, ease: "none" }, 0)
          .to(".hero-brilho", { scale: 1.25, autoAlpha: 0.4, ease: "none" }, 0);
      });
      // Com menos movimento, tudo aparece pronto
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".entrada", { visibility: "visible" });
      });
    },
    { scope: escopo },
  );

  // Letras do nome: sobem de dentro de uma máscara quando a fonte termina de carregar
  // (a divisão em letras precisa da fonte certa para medir cada uma)
  useGSAP(
    () => {
      if (!fontes) return;
      const mm = gsap.matchMedia();
      mm.add(COM_MOVIMENTO, () => {
        const nome = SplitText.create(".hero-nome", { type: "chars", mask: "chars" });
        gsap.set(".hero-nome", { visibility: "visible" });
        const letras = gsap.from(nome.chars, { yPercent: 110, duration: 1.2, stagger: 0.035, ease: "expo.out", paused: true });
        aberturaSaiu.then(() => letras.play());
        return () => nome.revert();
      });
    },
    { scope: escopo, dependencies: [fontes] },
  );

  return (
    <section ref={escopo} id="inicio" aria-label="Início" className="hero">
      <Cabecalho />

      <div className="hero-palco">
        <div aria-hidden="true" className="hero-brilho" />
        <h1 className="hero-nome entrada">
          <span>ISABELLE</span> <span>CILLO</span>
        </h1>
        <p className="hero-rotulo entrada">FISIOTERAPEUTA</p>
        <p className="hero-cidade entrada">Alfenas, MG</p>
        <div aria-hidden="true" className="hero-anel entrada" />
        <picture className="contents">
          <source type="image/avif" srcSet={hero.avifSet} sizes="(min-width: 1280px) 38vw, (min-width: 640px) 600px, 88vw" />
          <source type="image/webp" srcSet={hero.webpSet} sizes="(min-width: 1280px) 38vw, (min-width: 640px) 600px, 88vw" />
          <img
            src={hero.src}
            alt="Isabelle Cillo, fisioterapeuta, sorrindo, de jaleco branco"
            width={hero.largura}
            height={hero.altura}
            fetchPriority="high"
            className="hero-foto entrada"
          />
        </picture>
        <div aria-hidden="true" className="hero-esmaecer" />
      </div>

      <div className="hero-texto entrada flex flex-col gap-3.5 xl:items-start xl:gap-[18px]">
        <h2 className="m-0 font-serif text-[32px] font-medium leading-[1.1] xl:text-[38px]">Movimento, bem-estar e qualidade de vida.</h2>
        <p className="m-0 text-base leading-relaxed text-marinho xl:text-[17px]">
          Ajudo você a recuperar seus movimentos com segurança e propósito. Cuido de dores e lesões, acompanhando cada etapa da sua
          reabilitação até o retorno ao esporte que você ama.
        </p>
        <a href={contato.agendar} target="_blank" rel="noopener" className="botao botao-escuro w-full xl:w-auto">
          Agendar a consulta <Seta />
        </a>
      </div>

      <div className="hero-cartoes entrada">
        <CartoesHero />
      </div>
    </section>
  );
}
