import type { CSSProperties } from "react";
import type { Imagem } from "../data/imagens";

type Props = {
  imagem: Imagem;
  alt: string;
  className?: string;
  style?: CSSProperties;
  /** Fotos abaixo da primeira tela carregam só quando chegam perto (padrão). */
  prioridade?: boolean;
};

/** Foto com AVIF e WebP de reserva. O tamanho na tela vem do className. */
export default function Foto({ imagem, alt, className, style, prioridade = false }: Props) {
  return (
    <picture className="contents">
      <source srcSet={imagem.avif} type="image/avif" />
      <img
        src={imagem.webp}
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
