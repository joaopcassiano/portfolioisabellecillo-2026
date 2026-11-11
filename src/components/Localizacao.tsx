import { contato, endereco, mapa } from "../data/site";
import { useState } from "react";
import { Pino, Seta } from "./Icones";

// O mapa do Google só carrega quando a pessoa pede: até lá, nada de cookies do Google
// e a página fica mais leve. No lugar, um desenho simples de ruas com o pino do consultório.
function MapaSobClique() {
  const [aberto, setAberto] = useState(false);
  const caixa =
    "relative h-[340px] w-full overflow-hidden rounded-[18px] bg-[#dfe6e5] lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:h-[560px] lg:self-center lg:rounded-[20px]";

  if (aberto) {
    return (
      <iframe
        src={mapa.embed}
        title="Mapa do Google com a localização do consultório"
        referrerPolicy="no-referrer-when-downgrade"
        className={`${caixa} border-0`}
      />
    );
  }

  return (
    <div className={caixa}>
      <svg aria-hidden="true" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <g fill="none" stroke="#f7f5f0" strokeLinecap="round">
          <path d="M-20 70 L420 40" strokeWidth="14" />
          <path d="M-20 215 C120 200 260 240 420 205" strokeWidth="18" />
          <path d="M90 -20 L130 320" strokeWidth="10" />
          <path d="M290 -20 C270 100 300 200 280 320" strokeWidth="12" />
          <path d="M130 140 L420 120" strokeWidth="7" />
          <path d="M-20 140 L130 150" strokeWidth="7" />
          <path d="M200 50 L210 210" strokeWidth="6" />
          <path d="M20 -20 L40 320" strokeWidth="5" />
          <path d="M360 -20 L370 320" strokeWidth="5" />
        </g>
        <circle cx="330" cy="260" r="34" fill="#c9d3d2" opacity="0.7" />
        <circle cx="45" cy="100" r="22" fill="#c9d3d2" opacity="0.7" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-marinho-profundo text-off shadow-[0_10px_24px_rgba(0,31,63,0.25)]">
          <Pino size={26} />
        </span>
        <button type="button" onClick={() => setAberto(true)} className="botao botao-escuro">
          Ver no mapa
        </button>
        <p className="m-0 max-w-[260px] text-[13px] leading-snug text-marinho">O mapa é carregado do Google quando você clica.</p>
      </div>
    </div>
  );
}

export default function Localizacao() {
  return (
    <section id="localizacao" aria-labelledby="localizacao-titulo" className="bg-gelo">
      <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-7 px-5 py-[72px] lg:min-h-[800px] lg:max-w-[1440px] lg:grid-cols-[420px_minmax(0,1fr)] lg:content-center lg:gap-x-24 lg:gap-y-8 lg:px-[clamp(24px,5.6vw,80px)] lg:py-[120px]">
        <div className="flex flex-col gap-3 lg:col-start-1 lg:row-start-1 lg:gap-4">
          <h2 id="localizacao-titulo" className="titulo-secao">
            Onde me encontrar
          </h2>
          <p className="m-0 text-base leading-relaxed text-marinho lg:text-lg">
            Atendo no bairro {endereco.bairro}, em {endereco.cidade}.
          </p>
        </div>

        <MapaSobClique />

        <address className="flex flex-col gap-0.5 border-y border-linha-gelo py-5 not-italic lg:col-start-1 lg:row-start-2 lg:gap-1 lg:py-6">
          <span className="font-serif text-2xl font-medium leading-[1.2] lg:text-[28px]">{endereco.ruaCompleta}</span>
          <span className="text-base leading-relaxed text-marinho lg:text-[17px]">
            {endereco.bairro}, {endereco.cidade}, {endereco.uf}
          </span>
          <span className="text-base leading-relaxed tabular-nums text-marinho lg:text-[17px]">CEP {endereco.cep}</span>
        </address>

        <div className="flex flex-col gap-3 lg:col-start-1 lg:row-start-3 lg:flex-row lg:flex-wrap">
          <a href={contato.agendar} target="_blank" rel="noopener" className="botao botao-escuro">
            Agendar a consulta <Seta />
          </a>
          <a href={mapa.rota} target="_blank" rel="noopener" className="botao botao-contorno">
            Como chegar <Seta />
          </a>
        </div>
      </div>
    </section>
  );
}
