import { useEffect, useRef, useState } from "react";
import { mapa } from "../data/site";
import { Chevron, Estrelas, Pausa, Play } from "./Icones";

// Avaliações reais do perfil no Google. Por privacidade, só o primeiro nome e a inicial do sobrenome.
const depoimentos = [
  {
    nome: "Emerson G.",
    destaque: "Voltei muito melhor após a minha cirurgia.",
    texto: "Ótimo atendimento! Tive excelentes resultados e voltei muito melhor após a minha cirurgia. Recomendo demais!",
  },
  {
    nome: "Monalisa G.",
    destaque: "Explica tudo direitinho e passa muita confiança.",
    texto:
      "Minha experiência foi muito boa! Fui muito bem atendida, com bastante atenção e cuidado. Ela é uma profissional muito querida, explica tudo direitinho e passa muita confiança. Super recomendo!",
  },
  {
    nome: "Thaís M.",
    destaque: "Atendimento completo e humanizado.",
    texto: "Excelente profissional. Formação excepcional, atendimento completo e humanizado. Indico demais!",
  },
  {
    nome: "Fernanda C.",
    destaque: "Solícita, atenciosa e competente.",
    texto:
      "Ótimo atendimento desde o contato por WhatsApp, Isabelle é muito solícita, atenciosa e competente. Fiquei muito satisfeita com o tratamento.",
  },
  {
    nome: "Giovana G.",
    destaque: "Responsável, dedicada e comprometida.",
    texto: "Excelente profissional! Muito responsável, dedicada e comprometida, sempre realizando seu trabalho com muita competência. Super indico!",
  },
];

const total = depoimentos.length;
const INTERVALO = 3000;

export default function Depoimentos() {
  const [atual, setAtual] = useState(0);
  const [tocando, setTocando] = useState(true);
  const [emFoco, setEmFoco] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const secao = useRef<HTMLElement>(null);

  // Quem desativou animações no aparelho começa com a troca automática parada
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setTocando(false);
  }, []);

  // Só passa sozinho enquanto a seção está na tela
  useEffect(() => {
    const el = secao.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Troca a cada 3 segundos e para enquanto a pessoa passa o mouse, toca ou navega pelo teclado
  useEffect(() => {
    if (!tocando || emFoco || !visivel) return;
    const id = window.setTimeout(() => setAtual((i) => (i + 1) % total), INTERVALO);
    return () => window.clearTimeout(id);
  }, [tocando, emFoco, visivel, atual]);
  const ir = (passo: number) => setAtual((i) => (i + passo + total) % total);
  const d = depoimentos[atual];
  const vizinho = (passo: number) => depoimentos[(atual + passo + total) % total];

  const lateral = (passo: number, classe: string) => {
    const v = vizinho(passo);
    return (
      <button
        type="button"
        aria-label={`Ver depoimento de ${v.nome}`}
        onClick={() => ir(passo)}
        className={`absolute hidden border-0 bg-marinho font-fina font-extralight text-bege transition-opacity duration-150 hover:opacity-90 ${classe}`}
      >
        {v.nome[0]}
      </button>
    );
  };

  return (
    <section ref={secao} id="depoimentos" aria-labelledby="depoimentos-titulo" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[55%] h-[520px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(155,158,206,0.22),rgba(155,158,206,0))] lg:top-[52%] lg:h-[620px] lg:w-[1100px]"
      />
      <div className="relative mx-auto flex max-w-[640px] flex-col gap-7 px-5 py-[72px] lg:min-h-[900px] lg:max-w-[1440px] lg:items-center lg:justify-center lg:gap-14 lg:px-[clamp(24px,5.6vw,80px)] lg:pb-24 lg:pt-28">
        <div className="flex flex-col gap-3 lg:items-center lg:gap-3.5 lg:text-center">
          <h2 id="depoimentos-titulo" className="titulo-secao">
            O que dizem meus pacientes
          </h2>
          <p className="m-0 flex items-center gap-2.5 text-[15px] text-marinho lg:text-base">
            <span className="hidden text-bege-escuro lg:inline-flex">
              <Estrelas />
            </span>
            Nota 5,0 no Google, com 28 avaliações
          </p>
        </div>

        <div
          className="relative h-[470px] w-full lg:h-[400px] lg:max-w-[1280px]"
          onMouseEnter={() => setEmFoco(true)}
          onMouseLeave={() => setEmFoco(false)}
          onFocus={() => setEmFoco(true)}
          onBlur={() => setEmFoco(false)}
          onTouchStart={() => setEmFoco(true)}
          onTouchEnd={() => setEmFoco(false)}
        >
          {lateral(-2, "left-0 top-20 h-60 w-20 rounded-[14px] text-[40px] opacity-45 xl:block")}
          {lateral(-1, "left-[7.5%] top-10 h-80 w-[140px] rounded-2xl text-[64px] opacity-75 lg:block lg:left-0 xl:left-[96px]")}
          <div aria-hidden="true" className="absolute -right-1.5 top-[30px] h-[410px] w-10 rounded-[14px] bg-marinho opacity-45 lg:hidden" />

          <figure
            key={atual}
            aria-live={tocando && !emFoco ? "off" : "polite"}
            className="foto-troca absolute left-0 top-0 m-0 grid h-[470px] w-[calc(100%-28px)] overflow-hidden rounded-[18px] bg-white shadow-[0_18px_44px_rgba(0,31,63,0.14)] lg:left-1/2 lg:h-[400px] lg:w-[min(760px,calc(100%-340px))] lg:-translate-x-1/2 lg:grid-cols-[minmax(0,1fr)_240px] lg:rounded-[20px] lg:shadow-[0_24px_60px_rgba(0,31,63,0.14)]"
          >
            <div className="flex flex-col justify-between px-6 py-7 lg:px-11 lg:py-10">
              <div className="flex flex-col gap-4 lg:gap-5">
                <p className="m-0 font-fina text-2xl font-light leading-[1.2] lg:text-[28px]">{d.destaque}</p>
                <blockquote className="m-0 font-serif text-[19px] leading-[1.45] text-marinho lg:text-[21px]">“{d.texto}”</blockquote>
              </div>
              <figcaption className="flex items-center gap-3">
                <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-marinho font-fina text-xl font-light text-bege lg:hidden">
                  {d.nome[0]}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-semibold lg:text-base">{d.nome}</span>
                  <span className="text-[13px] text-marinho lg:text-sm">Avaliação no Google</span>
                </span>
              </figcaption>
            </div>
            <div aria-hidden="true" className="hidden flex-col items-center justify-center gap-[18px] bg-marinho text-bege lg:flex">
              <span className="font-fina text-[140px] font-extralight leading-none">{d.nome[0]}</span>
              <Estrelas />
            </div>
          </figure>

          {lateral(1, "right-[7.5%] top-10 h-80 w-[140px] rounded-2xl text-[64px] opacity-75 lg:block lg:right-0 xl:right-[96px]")}
          {lateral(2, "right-0 top-20 h-60 w-20 rounded-[14px] text-[40px] opacity-45 xl:block")}
        </div>

        <div className="flex items-center justify-between lg:justify-center lg:gap-5">
          <button
            type="button"
            aria-label="Depoimento anterior"
            onClick={() => ir(-1)}
            className="flex size-11 items-center justify-center rounded-full border border-[#c9cbe0] bg-off text-marinho-profundo"
          >
            <Chevron size={16} direcao="esquerda" />
          </button>
          <div aria-hidden="true" className="flex gap-2">
            {depoimentos.map((x, i) => (
              <span key={x.nome} className={`h-2 rounded-full transition-[width] duration-200 ${i === atual ? "w-6 bg-marinho-profundo" : "w-2 bg-[#c9cbe0]"}`} />
            ))}
          </div>
          <button
            type="button"
            aria-label="Próximo depoimento"
            onClick={() => ir(1)}
            className="flex size-11 items-center justify-center rounded-full border border-[#c9cbe0] bg-off text-marinho-profundo"
          >
            <Chevron size={16} />
          </button>
          <button
            type="button"
            aria-label={tocando ? "Pausar a troca automática dos depoimentos" : "Retomar a troca automática dos depoimentos"}
            onClick={() => setTocando((v) => !v)}
            className="flex size-11 items-center justify-center rounded-full border border-[#c9cbe0] bg-off text-marinho-profundo"
          >
            {tocando ? <Pausa /> : <Play />}
          </button>
          <a href={mapa.perfil} target="_blank" rel="noopener" className="ml-4 hidden text-[15px] font-medium underline underline-offset-4 lg:inline">
            Ver todas no Google
          </a>
        </div>
        <a href={mapa.perfil} target="_blank" rel="noopener" className="self-center text-[15px] font-medium underline underline-offset-4 lg:hidden">
          Ver todas no Google
        </a>
      </div>
    </section>
  );
}
