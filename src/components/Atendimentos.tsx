import { fotos } from "../data/imagens";
import { endereco } from "../data/site";
import Foto from "./Foto";
import { Pino } from "./Icones";

const etapas = [
  {
    titulo: "Primeira consulta",
    texto: "Ouço sua história e avalio como você se movimenta. Depois explico o que está acontecendo e monto o seu plano de tratamento.",
  },
  {
    titulo: "Durante o tratamento",
    texto: "As sessões seguem o plano, mas ele não é fixo. Ajusto exercícios e técnicas conforme você evolui.",
  },
  {
    titulo: "Até a volta",
    texto: "Acompanho você até voltar à rotina ou ao esporte, e no caso dos atletas, até a beira do campo.",
  },
];

export default function Atendimentos() {
  return (
    <section id="atendimentos" aria-labelledby="atendimentos-titulo" className="bg-gelo">
      <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-8 px-5 py-[72px] lg:min-h-[960px] lg:max-w-[1440px] lg:grid-cols-[minmax(0,1fr)_460px] lg:content-center lg:gap-x-[120px] lg:gap-y-10 lg:px-[clamp(24px,5.6vw,80px)] lg:py-[120px]">
        <div className="flex flex-col gap-3 lg:col-start-1 lg:row-start-1 lg:max-w-[680px] lg:gap-4">
          <h2 id="atendimentos-titulo" className="titulo-secao">
            Como é o atendimento
          </h2>
          <p className="m-0 text-base leading-relaxed text-marinho lg:text-lg">
            Cada tratamento começa com uma conversa e segue no seu ritmo. Você sabe o que está fazendo e por quê, em cada etapa.
          </p>
        </div>

        <Foto
          imagem={fotos.conversa}
          alt="Isabelle rindo durante uma conversa no consultório"
          className="aspect-[7/8] w-full rounded-[18px] lg:aspect-auto object-cover object-[50%_25%] lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:h-[640px] lg:w-[460px] lg:self-center lg:rounded-[20px]"
        />

        <ol className="m-0 list-none border-b border-linha-gelo p-0 lg:col-start-1 lg:row-start-2 lg:max-w-[680px]">
          {etapas.map((e, i) => (
            <li key={e.titulo} className="grid grid-cols-[44px_minmax(0,1fr)] gap-3.5 border-t border-linha-gelo py-[22px] lg:grid-cols-[72px_minmax(0,1fr)] lg:gap-6 lg:py-7">
              <span aria-hidden="true" className="font-fina text-[40px] font-extralight leading-[0.9] text-marinho lg:text-[56px]">
                {i + 1}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="m-0 font-serif text-[26px] font-medium leading-[1.1] lg:text-[30px]">{e.titulo}</h3>
                <p className="m-0 text-base leading-relaxed text-marinho lg:text-[17px]">{e.texto}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="m-0 flex items-start gap-2.5 text-[15px] leading-relaxed text-marinho lg:col-start-1 lg:row-start-3 lg:max-w-[680px] lg:gap-3 lg:text-base">
          <Pino />
          Atendo no consultório, no bairro {endereco.bairro}, em {endereco.cidade}. Quando o caso pede, combinamos outro formato.
        </p>
      </div>
    </section>
  );
}
