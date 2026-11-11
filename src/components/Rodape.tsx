import { useState } from "react";
import { logos } from "../data/imagens";
import { contato, empresa, endereco } from "../data/site";
import { Email, Instagram, WhatsApp } from "./Icones";

export default function Rodape() {
  const [privacidade, setPrivacidade] = useState(false);
  // No celular, cada contato vira uma linha própria, separada por um fio, com o ícone num círculo
  const linkContato =
    "flex min-h-14 items-center gap-3.5 border-b border-linha text-[15px] last:border-b-0 lg:min-h-9 lg:gap-3 lg:border-b-0";
  const icone = "flex size-9 shrink-0 items-center justify-center rounded-full bg-gelo text-marinho-profundo lg:size-auto lg:bg-transparent";
  // Títulos: no celular, versalete espaçado como o "FISIOTERAPEUTA" da hero
  const titulo = "m-0 text-xs font-medium uppercase tracking-[0.2em] text-lilas-escuro lg:text-sm lg:font-semibold lg:normal-case lg:tracking-normal lg:text-marinho-profundo";

  return (
    <footer className="border-t border-linha">
      <div className="mx-auto flex max-w-[640px] flex-col lg:max-w-[1440px] gap-12 px-6 pb-[max(32px,env(safe-area-inset-bottom))] pt-14 lg:gap-10 lg:px-[clamp(24px,5.6vw,80px)] lg:pb-10 lg:pt-14">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_300px_320px] lg:items-start lg:gap-14">
          <img src={logos.nome} alt="Isabelle Cillo Fisioterapeuta" width={432} height={128} loading="lazy" className="h-14 w-auto self-start" />

          <div className="flex flex-col gap-3">
            <h2 className={titulo}>Endereço</h2>
            <address className="text-base leading-[1.7] text-marinho not-italic lg:text-[15px] lg:leading-relaxed">
              {endereco.rua}
              <br />
              {endereco.bairro}, {endereco.cidade}, {endereco.uf}
              <br />
              <span className="tabular-nums">CEP {endereco.cep}</span>
            </address>
          </div>

          <div className="flex flex-col lg:gap-1">
            <h2 className={`${titulo} mb-1.5 lg:mb-2`}>Contato</h2>
            <a href={contato.instagram} target="_blank" rel="noopener" className={linkContato}>
              <span className={icone}>
                <Instagram />
              </span>
              <span>
                <span className="so-leitor">Instagram: </span>
                {contato.instagramUsuario}
              </span>
            </a>
            <a href={`mailto:${contato.email}`} className={linkContato}>
              <span className={icone}>
                <Email />
              </span>
              <span>
                <span className="so-leitor">E-mail: </span>
                {contato.email}
              </span>
            </a>
            <a href={contato.whatsapp} target="_blank" rel="noopener" className={`${linkContato} tabular-nums`}>
              <span className={icone}>
                <WhatsApp />
              </span>
              <span>
                <span className="so-leitor">WhatsApp: </span>
                {contato.whatsappExibido}
              </span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 border-t border-linha pt-7 text-[13px] leading-relaxed text-marinho lg:flex-row lg:justify-between lg:gap-6 lg:pt-6 lg:leading-normal">
          <p className="m-0 tabular-nums">
            © 2026 {empresa.razaoSocial}
            <span className="hidden lg:inline">, CNPJ {empresa.cnpj}</span>.<br className="lg:hidden" /> Todos os direitos reservados.
          </p>
          <p className="m-0 tabular-nums lg:hidden">CNPJ {empresa.cnpj}</p>
          <p className="m-0 flex flex-wrap items-center gap-x-4">
            <span>Fisioterapeuta em Alfenas, MG</span>
            <button
              type="button"
              aria-expanded={privacidade}
              aria-controls="privacidade"
              onClick={() => setPrivacidade((v) => !v)}
              className="min-h-11 border-0 bg-transparent p-0 text-[13px] text-marinho underline underline-offset-4 lg:min-h-0"
            >
              Privacidade
            </button>
          </p>
        </div>

        {privacidade && (
          <div id="privacidade" className="-mt-6 max-w-[680px] text-[13px] leading-relaxed text-marinho lg:-mt-4">
            <p className="m-0">
              Este site não pede cadastro, não usa cookies de rastreamento e não exibe anúncios. Quando você me chama no WhatsApp ou por
              e-mail, uso o que me enviar só para responder e cuidar do seu atendimento, com o sigilo da LGPD e da ética profissional. O mapa
              do Google só carrega se você clicar nele, e aí vale a política de privacidade do Google. Para pedir que eu apague suas
              informações, é só me escrever.
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
