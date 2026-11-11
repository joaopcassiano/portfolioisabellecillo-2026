import { useEffect, useState, type CSSProperties } from "react";
import { miniaturas, type Imagem } from "../data/imagens";
import Foto from "./Foto";
import { useDeslizar } from "../hooks/useDeslizar";
import { useTroca } from "../hooks/useTroca";
import { Chevron, Pausa, Play } from "./Icones";

type Cartao = { rotulo: string; titulo: string; texto: string; imagem: Imagem; alt: string };

// As mesmas especialidades e fotos de "Como posso te ajudar", na mesma ordem
const cartoes: Cartao[] = [
  {
    rotulo: "Especialidade",
    titulo: "Fisioterapia esportiva",
    texto: "Cuido da lesão e estou na beira do campo ou da quadra na sua volta.",
    imagem: miniaturas.campo,
    alt: "Isabelle agachada na beira do campo, atendendo um jogador de futebol",
  },
  {
    rotulo: "Especialidade",
    titulo: "Traumato-ortopédica",
    texto: "Lesões e dores em músculos, ossos e articulações.",
    imagem: miniaturas.joelho,
    alt: "Isabelle examinando o joelho de um paciente",
  },
  {
    rotulo: "Especialidade",
    titulo: "Pós-operatória",
    texto: "Do primeiro passo depois da cirurgia até a volta à rotina.",
    imagem: miniaturas.equilibrio,
    alt: "Isabelle avaliando a perna de uma paciente sobre uma plataforma de equilíbrio",
  },
  {
    rotulo: "Especialidade",
    titulo: "Fisioterapia funcional",
    texto: "Força, mobilidade e equilíbrio para o seu dia a dia.",
    imagem: miniaturas.sentada,
    alt: "Isabelle sorrindo, sentada em uma bola de exercícios no consultório",
  },
];

/** Evento que abre a especialidade correspondente na seção "Como posso te ajudar". */
export const ABRIR_ESPECIALIDADE = "abrir-especialidade";

const INTERVALO = 6000;

export default function CartoesHero() {
  const { atual, anterior, direcao, ir } = useTroca(cartoes.length, 650);
  const [tocando, setTocando] = useState(true);
  const [emFoco, setEmFoco] = useState(false);

  // Quem desativou animações no aparelho começa com a troca automática parada
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setTocando(false);
  }, []);

  // O tempo recomeça a cada troca, inclusive depois de um deslize ou clique nas setas
  useEffect(() => {
    if (!tocando || emFoco) return;
    const id = window.setTimeout(() => ir(1), INTERVALO);
    return () => window.clearTimeout(id);
  }, [tocando, emFoco, atual]);

  // No celular, deslizar o dedo no cartão troca para o próximo ou o anterior
  const { gestos, deslizou } = useDeslizar(
    () => ir(1),
    () => ir(-1),
  );
  const c = cartoes[atual];

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Destaques do atendimento"
      className="flex flex-col gap-2.5 lg:gap-3.5"
      onMouseEnter={() => setEmFoco(true)}
      onMouseLeave={() => setEmFoco(false)}
      onFocus={() => setEmFoco(true)}
      onBlur={() => setEmFoco(false)}
    >
      <div className="flex items-center gap-2.5 text-[13px] font-medium tabular-nums text-marinho lg:gap-3">
        <button type="button" aria-label="Cartão anterior" onClick={() => ir(-1)} className="flex size-11 items-center justify-center">
          <Chevron direcao="esquerda" />
        </button>
        <span aria-hidden="true">{`0${atual + 1}`}</span>
        <div aria-hidden="true" className="h-0.5 grow overflow-hidden rounded-full bg-linha">
          <div className="h-0.5 bg-marinho-profundo transition-[width] duration-300" style={{ width: `${((atual + 1) / cartoes.length) * 100}%` }} />
        </div>
        <span aria-hidden="true">04</span>
        <button type="button" aria-label="Próximo cartão" onClick={() => ir(1)} className="flex size-11 items-center justify-center">
          <Chevron />
        </button>
        <button
          type="button"
          aria-label={tocando ? "Pausar a troca automática" : "Retomar a troca automática"}
          onClick={() => setTocando((v) => !v)}
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-linha"
        >
          {tocando ? <Pausa /> : <Play />}
        </button>
      </div>

      <div className="relative touch-pan-y" aria-live={tocando && !emFoco ? "off" : "polite"} {...gestos}>
        <div aria-hidden="true" className="absolute inset-x-[18px] -bottom-2.5 hidden h-10 rounded-[14px] bg-lilas opacity-45 lg:block" />
        <a
          href="#especialidades"
          onClick={(e) => {
            e.preventDefault();
            if (deslizou.current) return;
            window.dispatchEvent(new CustomEvent(ABRIR_ESPECIALIDADE, { detail: atual }));
          }}
          className="relative flex gap-3.5 rounded-2xl bg-marinho p-2 transition-transform duration-150 active:scale-[0.98] lg:gap-[18px] lg:p-2.5 lg:shadow-[0_18px_40px_rgba(0,31,63,0.18)]"
        >
          <Foto
            key={atual}
            imagem={c.imagem}
            tamanhos="104px"
            alt={c.alt}
            style={{ "--dir": direcao } as CSSProperties}
            className={`${anterior !== null ? "cartao-entra" : ""} h-[104px] w-[88px] shrink-0 rounded-[10px] object-cover lg:h-[124px] lg:w-[104px]`}
          />
          <div
            key={`texto-${atual}`}
            style={{ "--dir": direcao, animationDelay: "60ms" } as CSSProperties}
            className={`${anterior !== null ? "cartao-entra" : ""} flex flex-col justify-between py-1 pr-1 lg:py-1.5 lg:pr-1.5`}
          >
            <div>
              <p className="m-0 text-xs font-medium text-bege lg:text-[13px]">{c.rotulo}</p>
              <p className="m-0 mt-0.5 font-serif text-[23px] font-medium leading-[1.05] text-off lg:mt-1 lg:text-[26px]">{c.titulo}</p>
            </div>
            <p className="m-0 text-[13px] leading-snug text-texto-claro">{c.texto}</p>
            <span className="so-leitor"> (ver em Como posso te ajudar)</span>
          </div>
        </a>
      </div>
    </div>
  );
}
