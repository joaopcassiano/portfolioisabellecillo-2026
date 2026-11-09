import { useEffect, useState } from "react";
import { logos } from "../data/imagens";
import { contato } from "../data/site";
import { Fechar, Menu, Seta } from "./Icones";

const links = [
  { href: "#especialidades", texto: "Especialidades" },
  { href: "#atendimentos", texto: "Atendimentos" },
  { href: "#sobre", texto: "Sobre" },
  { href: "#localizacao", texto: "Localização" },
];

export default function Cabecalho() {
  const [aberto, setAberto] = useState(false);

  // Fecha o menu do celular com a tecla Esc
  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  return (
    <header className="absolute inset-x-4 top-4 z-30 lg:inset-x-[clamp(24px,5.6vw,80px)] lg:top-6">
      <div className="flex h-[60px] items-center justify-between rounded-2xl bg-gelo pl-3.5 pr-2 lg:h-[68px] lg:rounded-[18px] lg:pl-[18px] lg:pr-3">
        <a href="#inicio" aria-label="Isabelle Cillo, início" className="flex items-center">
          <img src={logos.monograma} alt="" width={90} height={96} className="h-9 w-auto lg:h-[42px]" />
        </a>

        <nav aria-label="Seções do site" className="hidden gap-9 text-[15px] font-medium text-marinho lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors duration-150 hover:text-marinho-profundo">
              {l.texto}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <a href="#contato" className="botao botao-escuro h-11 px-4 text-sm lg:h-[46px] lg:px-5 lg:text-[15px]">
            Contato <Seta size={13} />
          </a>
          <button
            type="button"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={aberto}
            aria-controls="menu-celular"
            onClick={() => setAberto((v) => !v)}
            className="flex size-11 items-center justify-center rounded-xl text-marinho-profundo lg:hidden"
          >
            {aberto ? <Fechar /> : <Menu />}
          </button>
        </div>
      </div>

      {aberto && (
        <nav id="menu-celular" aria-label="Seções do site" className="mt-2 rounded-2xl bg-gelo p-2 shadow-[0_18px_40px_rgba(0,31,63,0.14)] lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setAberto(false)}
                  className="flex min-h-[52px] items-center rounded-xl px-3 font-serif text-[24px] font-medium"
                >
                  {l.texto}
                </a>
              </li>
            ))}
          </ul>
          <a href={contato.agendar} target="_blank" rel="noopener" className="botao botao-escuro mt-2 w-full">
            Agendar a consulta <Seta />
          </a>
        </nav>
      )}
    </header>
  );
}
