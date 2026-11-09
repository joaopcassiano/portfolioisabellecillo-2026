import { contato, endereco, mapa } from "../data/site";
import { Seta } from "./Icones";

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

        <iframe
          src={mapa.embed}
          title="Mapa do Google com a localização do consultório"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[340px] w-full rounded-[18px] border-0 bg-[#dfe6e5] lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:h-[560px] lg:self-center lg:rounded-[20px]"
        />

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
