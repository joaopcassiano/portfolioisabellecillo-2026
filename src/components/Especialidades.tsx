import { useEffect, useRef, useState } from "react";
import { ABRIR_ESPECIALIDADE } from "./CartoesHero";
import { fotos, type Imagem } from "../data/imagens";
import { contato } from "../data/site";
import { useFontesProntas } from "../hooks/useFontesProntas";
import { COM_MOVIMENTO, gsap, ScrollTrigger, SplitText, useGSAP } from "../lib/gsap";
import { rolarAte } from "../lib/lenis";
import Foto from "./Foto";
import { Seta } from "./Icones";

type Especialidade = { nome: string; texto: string; imagem: Imagem; alt: string; posicao: string };

const especialidades: Especialidade[] = [
  {
    nome: "Fisioterapia esportiva",
    texto: "Trato e previno lesões do esporte para você voltar a treinar e competir com segurança. Na volta, acompanho você na beira do campo.",
    imagem: fotos.campo,
    alt: "Isabelle agachada na beira do campo, atendendo um jogador de futebol sentado no gramado",
    posicao: "40% 38%",
  },
  {
    nome: "Fisioterapia traumato-ortopédica",
    texto: "Trato lesões e dores em músculos, ossos e articulações, com um plano pensado para o seu caso.",
    imagem: fotos.joelho,
    alt: "Isabelle examinando o joelho de um paciente",
    posicao: "58% 16%",
  },
  {
    nome: "Reabilitação pós-operatória",
    texto: "Acompanho sua recuperação depois da cirurgia, do primeiro movimento até a volta à rotina.",
    imagem: fotos.equilibrio,
    alt: "Isabelle avaliando a perna de uma paciente sobre uma plataforma de equilíbrio",
    posicao: "66% 14%",
  },
  {
    nome: "Fisioterapia funcional",
    texto: "Trabalho força, mobilidade e equilíbrio para você se movimentar melhor no dia a dia.",
    imagem: fotos.sentada,
    alt: "Isabelle sorrindo, sentada em uma bola de exercícios no consultório",
    posicao: "50% 20%",
  },
];

export default function Especialidades() {
  const [ativa, setAtiva] = useState(0);
  const [trocou, setTrocou] = useState(false);
  // Foto que estava na tela antes da troca: fica embaixo enquanto a nova aparece por cima
  const [fotoAnterior, setFotoAnterior] = useState<number | null>(null);
  const a = especialidades[ativa];
  const escopo = useRef<HTMLElement>(null);
  const fixacao = useRef<ScrollTrigger | null>(null);
  const atualRef = useRef(0);
  const fontes = useFontesProntas();

  const mostrar = (i: number) => {
    if (i === atualRef.current) return;
    setFotoAnterior(atualRef.current);
    atualRef.current = i;
    setAtiva(i);
    setTrocou(true);
  };

  useGSAP(
    () => {
      if (!fontes) return;
      const mm = gsap.matchMedia();
      mm.add(COM_MOVIMENTO, () => {
        const titulo = SplitText.create(".esp-titulo", { type: "words", mask: "words" });
        const tl = gsap.timeline({
          defaults: { ease: "expo.out" },
          scrollTrigger: { trigger: escopo.current, start: "top 70%", once: true },
        });
        // A foto é revelada de baixo para cima, como uma cortina, enquanto volta ao tamanho normal
        tl.fromTo(
          ".esp-foto",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "power3.inOut" },
          0,
        )
          .from(".esp-foto img", { scale: 1.2, duration: 2.2, ease: "power2.out" }, 0)
          .from(titulo.words, { yPercent: 105, duration: 1.1, stagger: 0.06 }, 0.15)
          .from(".esp-item", { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.07 }, 0.3)
          .from(".esp-cta", { autoAlpha: 0, y: 16, duration: 0.8 }, 0.6);
        return () => titulo.revert();
      });

      // A seção fica parada na tela e a rolagem passa de uma especialidade para a outra.
      // Só em telas com altura para mostrar foto, lista e botão juntos.
      mm.add(`${COM_MOVIMENTO} and (min-height: 620px)`, () => {
        const ultimo = especialidades.length - 1;
        fixacao.current = ScrollTrigger.create({
          trigger: escopo.current,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 0.75 * ultimo)}`,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (st) => mostrar(Math.round(st.progress * ultimo)),
        });
        gsap.fromTo(
          ".esp-progresso",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: escopo.current, start: "top top", end: () => `+=${Math.round(window.innerHeight * 0.75 * ultimo)}`, scrub: true } },
        );
        return () => {
          fixacao.current = null;
        };
      });
    },
    { scope: escopo, dependencies: [fontes] },
  );

  useEffect(() => {
    if (fotoAnterior === null) return;
    const id = window.setTimeout(() => setFotoAnterior(null), 950);
    return () => window.clearTimeout(id);
  }, [ativa, fotoAnterior]);

  // Com a seção fixa, escolher uma especialidade rola até o ponto dela; sem ela, só troca.
  const escolher = (i: number) => {
    const st = fixacao.current;
    if (st) rolarAte(st.start + ((st.end - st.start) * i) / (especialidades.length - 1) + 2);
    else mostrar(i);
  };

  // Um clique no cartão da hero abre aqui a mesma especialidade
  useEffect(() => {
    const abrir = (e: Event) => {
      const i = (e as CustomEvent<number>).detail;
      if (fixacao.current) escolher(i);
      else {
        mostrar(i);
        const topo = escopo.current?.getBoundingClientRect().top ?? 0;
        rolarAte(window.scrollY + topo - 24);
      }
    };
    window.addEventListener(ABRIR_ESPECIALIDADE, abrir);
    return () => window.removeEventListener(ABRIR_ESPECIALIDADE, abrir);
  }, []);

  return (
    <section
      ref={escopo}
      id="especialidades"
      aria-labelledby="especialidades-titulo"
      className="mx-auto flex h-[max(100svh,620px)] max-w-[640px] flex-col justify-center gap-4 px-5 py-6 lg:grid lg:h-auto lg:min-h-svh lg:max-w-[1440px] lg:grid-cols-[520px_minmax(0,1fr)] lg:content-center lg:gap-x-[120px] lg:gap-y-10 lg:px-[clamp(24px,5.6vw,80px)] lg:py-20"
    >
      <h2 id="especialidades-titulo" className="esp-titulo titulo-secao lg:col-start-2 lg:row-start-1">
        Como posso te ajudar
      </h2>

      <div className="esp-foto relative min-h-[110px] max-h-[46svh] flex-1 overflow-hidden lg:max-h-none lg:min-h-0 rounded-[18px] bg-gelo lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:h-[min(660px,calc(100svh-160px))] lg:self-center lg:rounded-[20px]">
        {fotoAnterior !== null && (
          <Foto
            key={`antes-${fotoAnterior}`}
            imagem={especialidades[fotoAnterior].imagem}
            alt=""
            className="absolute inset-0 size-full object-cover"
            style={{ objectPosition: especialidades[fotoAnterior].posicao }}
          />
        )}
        <Foto
          key={ativa}
          imagem={a.imagem}
          alt={a.alt}
          className={`absolute inset-0 size-full object-cover ${trocou ? "foto-surge" : ""}`}
          style={{ objectPosition: a.posicao }}
        />
      </div>

      <ul className="relative m-0 list-none border-b border-linha p-0 lg:col-start-2 lg:row-start-2">
        <span aria-hidden="true" className="esp-progresso absolute -left-3 top-0 hidden h-full w-0.5 origin-top scale-y-0 rounded-full bg-lilas lg:-left-5 [.anima_&]:block" />
        {especialidades.map((e, i) => {
          const aberta = i === ativa;
          return (
            <li key={e.nome} className="esp-item border-t border-linha">
              <button
                type="button"
                aria-expanded={aberta}
                aria-controls={`especialidade-${i}`}
                onClick={() => escolher(i)}
                className="flex min-h-14 w-full items-center gap-3.5 py-3 text-left lg:min-h-[76px] lg:gap-[18px] lg:py-4"
              >
                <span
                  aria-hidden="true"
                  className={`size-2.5 shrink-0 rounded-full bg-bege shadow-[0_0_0_4px_var(--color-off),0_0_0_5px_var(--color-lilas)] transition-[scale,opacity] duration-500 ease-saida ${aberta ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
                />
                <span className={`font-fina text-2xl font-light leading-[1.2] transition-colors duration-500 lg:text-4xl lg:leading-[1.1] ${aberta ? "text-marinho-profundo" : "text-lilas-escuro"}`}>
                  {e.nome}
                </span>
              </button>
              {/* O texto abre e fecha deslizando, em vez de aparecer de uma vez */}
              <div
                id={`especialidade-${i}`}
                aria-hidden={!aberta}
                className={`grid transition-[grid-template-rows,opacity] duration-700 ease-saida ${aberta ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="m-0 mb-3.5 ml-6 text-[15px] leading-normal text-marinho lg:mb-6 lg:ml-7 lg:max-w-[520px] lg:text-[17px] lg:leading-relaxed">
                    {e.texto}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <a href={contato.agendar} target="_blank" rel="noopener" className="esp-cta botao botao-escuro w-full lg:col-start-2 lg:row-start-3 lg:w-auto lg:justify-self-start">
        Agendar a consulta <Seta />
      </a>
    </section>
  );
}
