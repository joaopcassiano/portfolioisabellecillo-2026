import { fotos } from "../data/imagens";
import { contato } from "../data/site";
import Foto from "./Foto";
import { Seta } from "./Icones";

export default function Contato() {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="mx-auto max-w-[640px] px-5 lg:max-w-[1440px] py-[72px] lg:px-[clamp(24px,5.6vw,80px)] lg:py-[120px]">
      <div className="overflow-hidden rounded-[20px] bg-marinho text-off lg:grid lg:min-h-[520px] lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)]">
        <div className="relative aspect-[4/3] lg:aspect-auto">
          <Foto
            imagem={fotos.sentada}
            alt="Isabelle sorrindo, sentada em uma bola de exercícios no consultório"
            className="absolute inset-0 size-full object-cover object-[50%_22%]"
          />
        </div>
        <div className="flex flex-col items-start gap-[18px] px-6 pb-7 pt-8 lg:justify-center lg:gap-6 lg:px-20 lg:py-[72px]">
          <h2 id="contato-titulo" className="m-0 max-w-[560px] font-serif text-4xl font-medium leading-[1.08] lg:text-[56px] lg:leading-[1.05] lg:tracking-[-0.01em]">
            Vamos cuidar do seu movimento?
          </h2>
          <p className="m-0 max-w-[480px] text-base leading-relaxed text-texto-claro lg:text-lg">
            Agende sua consulta pelo WhatsApp. Na primeira conversa, entendo o seu caso e combinamos o melhor horário para você.
          </p>
          <a href={contato.agendar} target="_blank" rel="noopener" className="botao botao-bege mt-1.5 w-full text-[17px] lg:mt-2 lg:w-auto">
            Agendar a consulta <Seta size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
