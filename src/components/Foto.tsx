import type { CSSProperties } from "react";
import type { Imagem } from "../data/imagens";

type Props = {
  imagem: Imagem;
  alt: string;
  className?: string;
  style?: CSSProperties;
  /** Largura em que a foto aparece na tela, para o navegador escolher a versão certa. */
  tamanhos?: string;
  /** Fotos abaixo da primeira tela carregam só quando chegam perto (padrão). */
  prioridade?: boolean;
};

// Na maioria das seções a foto ocupa a coluna do celular/tablet (até 600px) ou 520px no computador
const TAMANHOS_PADRAO = "(min-width: 1024px) 520px, (min-width: 640px) 600px, 92vw";

/** Foto com AVIF e WebP de reserva, em várias larguras. O tamanho na tela vem do className. */
export default function Foto({ imagem, alt, className, style, tamanhos = TAMANHOS_PADRAO, prioridade = false }: Props) {
  return (
    <picture className="contents">
      <source srcSet={imagem.avif} sizes={tamanhos} type="image/avif" />
      <source srcSet={imagem.webp} sizes={tamanhos} type="image/webp" />
      <img
        src={imagem.src}
        alt={alt}
        width={imagem.largura}
        height={imagem.altura}
        loading={prioridade ? "eager" : "lazy"}
        decoding="async"
        className={className}
        style={style}
      />
    </picture>
  );
}
