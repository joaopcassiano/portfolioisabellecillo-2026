import { logos } from "../data/imagens";
import { contato, empresa, endereco } from "../data/site";
import { Email, Instagram, WhatsApp } from "./Icones";

export default function Rodape() {
  const linkContato = "flex min-h-11 items-center gap-3 text-[15px] lg:min-h-9";

  return (
    <footer className="border-t border-linha">
      <div className="mx-auto flex max-w-[640px] flex-col lg:max-w-[1440px] gap-7 px-5 pb-8 pt-11 lg:gap-10 lg:px-[clamp(24px,5.6vw,80px)] lg:pb-10 lg:pt-14">
        <div className="flex flex-col gap-7 lg:grid lg:grid-cols-[minmax(0,1fr)_300px_320px] lg:items-start lg:gap-14">
          <img src={logos.nome} alt="Isabelle Cillo Fisioterapeuta" width={432} height={128} loading="lazy" className="h-12 w-auto self-start lg:h-14" />

          <div className="flex flex-col gap-2.5 lg:gap-3">
            <h2 className="m-0 text-sm font-semibold">Endereço</h2>
            <address className="text-[15px] leading-relaxed text-marinho not-italic">
              {endereco.rua}
              <br />
              {endereco.bairro}, {endereco.cidade}, {endereco.uf}
              <br />
              <span className="tabular-nums">CEP {endereco.cep}</span>
            </address>
          </div>

          <div className="flex flex-col lg:gap-1">
            <h2 className="m-0 mb-1 text-sm font-semibold lg:mb-2">Contato</h2>
            <a href={contato.instagram} target="_blank" rel="noopener" className={linkContato}>
              <Instagram />
              <span>
                <span className="so-leitor">Instagram: </span>
                {contato.instagramUsuario}
              </span>
            </a>
            <a href={`mailto:${contato.email}`} className={linkContato}>
              <Email />
              <span>
                <span className="so-leitor">E-mail: </span>
                {contato.email}
              </span>
            </a>
            <a href={contato.whatsapp} target="_blank" rel="noopener" className={`${linkContato} tabular-nums`}>
              <WhatsApp />
              <span>
                <span className="so-leitor">WhatsApp: </span>
                {contato.whatsappExibido}
              </span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-1 border-t border-linha pt-5 text-[13px] leading-normal text-marinho lg:flex-row lg:justify-between lg:gap-6 lg:pt-6">
          <p className="m-0 tabular-nums">
            © 2026 {empresa.razaoSocial}
            <span className="hidden lg:inline">, CNPJ {empresa.cnpj}</span>. Todos os direitos reservados.
          </p>
          <p className="m-0 tabular-nums lg:hidden">CNPJ {empresa.cnpj}</p>
          <p className="m-0">Fisioterapeuta em Alfenas, MG</p>
        </div>
      </div>
    </footer>
  );
}
