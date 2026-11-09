import { useRef } from "react";
import { hero } from "../data/imagens";
import { contato } from "../data/site";
import { useFontesProntas } from "../hooks/useFontesProntas";
import { COM_MOVIMENTO, gsap, SplitText, useGSAP } from "../lib/gsap";
import Cabecalho from "./Cabecalho";
import CartoesHero from "./CartoesHero";
import { Seta } from "./Icones";

export default function Hero() {
  const escopo = useRef<HTMLElement>(null);
  const fontes = useFontesProntas();

  useGSAP(
    () => {
      if (!fontes) return;
      const mm = gsap.matchMedia();
      mm.add(COM_MOVIMENTO, () => {
        // Entrada: as letras do nome sobem de dentro de uma máscara, a foto chega logo depois
        const nome = SplitText.create(".hero-nome", { type: "chars", mask: "chars" });
        const entrada = gsap.timeline({ defaults: { ease: "expo.out" } });
        entrada
          .set(".entrada", { visibility: "visible" })
          .from(nome.chars, { yPercent: 110, duration: 1.2, stagger: 0.035 })
          .from(".hero-anel", { autoAlpha: 0, scale: 0.9, rotate: -40, duration: 1.6 }, 0.15)
          .from(".hero-foto", { autoAlpha: 0, y: 70, scale: 0.97, duration: 1.4 }, 0.25)
          .from([".hero-rotulo", ".hero-cidade"], { autoAlpha: 0, y: 12, duration: 0.9 }, 0.6)
          .from(".hero-texto > *", { autoAlpha: 0, y: 18, duration: 0.9, stagger: 0.06 }, 0.7)
          .from(".hero-cartoes", { autoAlpha: 0, y: 18, duration: 0.9 }, 0.85);

        // Rolagem: a foto e o nome se afastam em velocidades diferentes, dando profundidade
        gsap
          .timeline({ scrollTrigger: { trigger: escopo.current, start: "top top", end: "bottom top", scrub: 0.6 } })
          .to(".hero-foto", { yPercent: 12, ease: "none" }, 0)
          .to(".hero-nome", { yPercent: 60, autoAlpha: 0.15, ease: "none" }, 0)
          .to(".hero-anel", { rotate: 14, scale: 1.08, ease: "none" }, 0)
          .to(".hero-brilho", { scale: 1.25, autoAlpha: 0.4, ease: "none" }, 0);

        return () => nome.revert();
      });
      // Com menos movimento, tudo aparece pronto
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".entrada", { visibility: "visible" });
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
          <source type="image/avif" srcSet={hero.avifSet} sizes="(min-width: 1024px) 38vw, 88vw" />
          <source type="image/webp" srcSet={hero.webpSet} sizes="(min-width: 1024px) 38vw, 88vw" />
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

      <div className="hero-texto entrada flex flex-col gap-3.5 lg:items-start lg:gap-[18px]">
        <h2 className="m-0 font-serif text-[32px] font-medium leading-[1.1] lg:text-[38px]">Movimento, bem-estar e qualidade de vida.</h2>
        <p className="m-0 text-base leading-relaxed text-marinho lg:text-[17px]">
          Ajudo você a recuperar seus movimentos com segurança e propósito. Cuido de dores e lesões, acompanhando cada etapa da sua
          reabilitação até o retorno ao esporte que você ama.
        </p>
        <a href={contato.agendar} target="_blank" rel="noopener" className="botao botao-escuro w-full lg:w-auto">
          Agendar a consulta <Seta />
        </a>
      </div>

      <div className="hero-cartoes entrada">
        <CartoesHero />
      </div>
    </section>
  );
}
