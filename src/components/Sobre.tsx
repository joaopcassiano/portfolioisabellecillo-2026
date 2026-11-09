import { useRef } from "react";
import { fotos } from "../data/imagens";
import { useFontesProntas } from "../hooks/useFontesProntas";
import { COM_MOVIMENTO, gsap, ScrollTrigger, SplitText, useGSAP } from "../lib/gsap";
import Foto from "./Foto";

type Formacao = { ano: string; curso: string; instituicao?: string; emAndamento?: boolean };

// Em ordem cronológica, da mais antiga para a mais recente
const formacao: Formacao[] = [
  { ano: "2023", curso: "Graduação em Fisioterapia", instituicao: "Universidade Federal de Alfenas, UNIFAL-MG" },
  { ano: "2023", curso: "Capacitação em Fisioterapia Esportiva" },
  { ano: "2023", curso: "Capacitação em Mobilização e Manipulação" },
  { ano: "2026", curso: "Mestrado em Ciências da Reabilitação", instituicao: "Universidade Federal de Alfenas, UNIFAL-MG" },
  { ano: "2026", curso: "Pós-graduação em Fisiologia do Exercício", instituicao: "Universidade Federal de Alfenas, UNIFAL-MG" },
  { ano: "2027", curso: "Pós-graduação em Fisioterapia Esportiva", instituicao: "Anhanguera", emAndamento: true },
  {
    ano: "2027",
    curso: "Pós-graduação em Fisioterapia Traumato-ortopédica e Desportiva de Resultados",
    instituicao: "Anhanguera",
    emAndamento: true,
  },
];

export default function Sobre() {
  const escopo = useRef<HTMLElement>(null);
  const fontes = useFontesProntas();

  useGSAP(
    () => {
      if (!fontes) return;
      const mm = gsap.matchMedia();
      mm.add(COM_MOVIMENTO, () => {
        const titulo = SplitText.create(".sobre-titulo", { type: "words", mask: "words" });
        // aria "none": o parágrafo continua sendo lido normalmente, sem atributos extras
        const texto = SplitText.create(".sobre-texto", { type: "words", aria: "none" });

        // Título sobe e a foto é revelada quando a seção chega
        gsap
          .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: escopo.current, start: "top 70%", once: true } })
          .fromTo(".sobre-foto", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "power3.inOut" }, 0)
          .from(titulo.words, { yPercent: 105, duration: 1.1, stagger: 0.06 }, 0.1);

        // A foto anda devagar dentro da moldura enquanto a página rola
        gsap.fromTo(
          ".sobre-foto img",
          { yPercent: -6 },
          { yPercent: 6, ease: "none", scrollTrigger: { trigger: ".sobre-foto", start: "top bottom", end: "bottom top", scrub: true } },
        );

        // O texto principal se preenche palavra por palavra, no ritmo da rolagem
        // As palavras saem de um azul acinzentado (ainda legível) e chegam ao azul-marinho
        gsap.from(texto.words, {
          color: "#5f6c8f",
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ".sobre-texto", start: "top 82%", end: "bottom 50%", scrub: true },
        });

        // As linhas da formação se desenham da esquerda para a direita, uma depois da outra
        gsap
          .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: ".sobre-formacao", start: "top 78%", once: true } })
          .from(".sobre-linha", { scaleX: 0, duration: 1.1, stagger: 0.08 }, 0)
          .from(".sobre-apoio", { autoAlpha: 0, y: 14, duration: 0.8 }, 0.5);

        // Cada formação aparece e ganha cor quando chega na tela, e continua colorida depois.
        // Uma trilha lateral se desenha junto, marcando cada curso com um ponto, como uma linha do tempo.
        gsap.utils.toArray<HTMLElement>(".formacao").forEach((item) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top 85%",
            onEnter: () => item.classList.add("ativa"),
            onLeaveBack: () => item.classList.remove("ativa"),
          });
        });
        gsap.fromTo(
          ".formacao-trilha",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".sobre-formacao ul", start: "top 85%", end: "bottom 85%", scrub: 0.4 } },
        );

        return () => {
          titulo.revert();
          texto.revert();
        };
      });
    },
    { scope: escopo, dependencies: [fontes] },
  );

  return (
    <section
      ref={escopo}
      id="sobre"
      aria-labelledby="sobre-titulo"
      className="mx-auto grid max-w-[640px] grid-cols-1 gap-8 px-5 py-[72px] lg:min-h-[1040px] lg:max-w-[1440px] lg:grid-cols-[460px_minmax(0,1fr)] lg:content-start lg:gap-x-[120px] lg:gap-y-6 lg:px-[clamp(24px,5.6vw,80px)] lg:py-[120px]"
    >
      <h2 id="sobre-titulo" className="sobre-titulo titulo-secao lg:col-start-2 lg:row-start-1">
        Sobre mim
      </h2>

      <div className="sobre-foto relative aspect-[5/6] w-full overflow-hidden rounded-[18px] bg-gelo lg:sticky lg:top-28 lg:col-start-1 lg:row-span-4 lg:row-start-1 lg:aspect-auto lg:h-[680px] lg:w-[460px] lg:self-start lg:rounded-[20px]">
        <Foto
          imagem={fotos.notebook}
          alt="Isabelle sorrindo, sentada à mesa com o notebook"
          className="absolute inset-0 size-full scale-[1.14] object-cover object-[50%_30%]"
        />
      </div>

      <p className="sobre-texto m-0 font-serif text-[23px] leading-[1.38] lg:col-start-2 lg:row-start-2 lg:max-w-[700px] lg:text-[28px] lg:leading-[1.35]">
        Sou fisioterapeuta com atuação nas áreas traumato-ortopédica e esportiva, e acredito que a reabilitação vai muito além de tratar
        uma lesão. Ela envolve compreender cada pessoa, sua rotina, seus desafios e, principalmente, aquilo que ela deseja voltar a fazer.
      </p>

      <div className="sobre-formacao flex flex-col gap-3 lg:col-start-2 lg:row-start-3 lg:mt-6 lg:max-w-[700px] lg:gap-4">
        <h3 className="m-0 text-[15px] font-semibold text-marinho">Formação e qualificações</h3>
        <ul className="relative m-0 list-none p-0">
          <span aria-hidden="true" className="formacao-trilha absolute -left-3 top-0 hidden h-full w-0.5 origin-top rounded-full bg-bege lg:-left-5 [.anima_&]:block" />
          {formacao.map((f) => (
            <li key={f.curso} className="formacao relative">
              <span aria-hidden="true" className="formacao-ponto absolute -left-[15px] top-[22px] hidden size-2 rounded-full bg-bege-escuro lg:-left-[23px] [.anima_&]:block" />
              <span aria-hidden="true" className="sobre-linha absolute inset-x-0 top-0 h-px origin-left bg-linha" />
              <div className="sobre-item-conteudo grid grid-cols-[52px_minmax(0,1fr)] gap-3 py-3.5 lg:grid-cols-[80px_minmax(0,1fr)] lg:gap-4">
                <span className="formacao-ano font-fina text-base font-light tabular-nums text-marinho lg:text-lg">{f.ano}</span>
                <span className="flex flex-col items-start gap-0.5">
                  <span className="text-base font-medium lg:text-[17px]">{f.curso}</span>
                  {f.instituicao && <span className="text-sm text-marinho lg:text-[15px]">{f.instituicao}</span>}
                  {f.emAndamento && (
                    <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-gelo px-2.5 py-1 text-xs font-medium text-marinho">
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-bege-escuro" />
                      Em andamento
                    </span>
                  )}
                </span>
              </div>
            </li>
          ))}
          <li aria-hidden="true" className="relative h-px">
            <span className="sobre-linha absolute inset-x-0 top-0 h-px origin-left bg-linha" />
          </li>
        </ul>
      </div>

      <p className="sobre-apoio m-0 text-base leading-relaxed text-marinho lg:col-start-2 lg:row-start-4 lg:max-w-[700px] lg:text-lg">
        Mais do que tratar uma lesão, meu objetivo é ajudar você a recuperar a confiança no seu corpo e a voltar a se movimentar com
        segurança.
      </p>
    </section>
  );
}
