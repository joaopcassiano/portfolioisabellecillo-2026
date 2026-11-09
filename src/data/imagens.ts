// Todas as imagens do site, em AVIF (mais leve) com WebP de reserva. Geradas por scripts/optimize-images.mjs.
import heroAvif600 from "../assets/hero-600.avif";
import heroAvif816 from "../assets/hero-816.avif";
import heroWebp600 from "../assets/hero-600.webp";
import heroWebp816 from "../assets/hero-816.webp";
import campoAvif from "../assets/campo-1200.avif";
import campoWebp from "../assets/campo-1200.webp";
import joelhoAvif from "../assets/joelho-683.avif";
import joelhoWebp from "../assets/joelho-683.webp";
import sentadaAvif from "../assets/sentada-1000.avif";
import sentadaWebp from "../assets/sentada-1000.webp";
import conversaAvif from "../assets/conversa-429.avif";
import conversaWebp from "../assets/conversa-429.webp";
import notebookAvif from "../assets/notebook-410.avif";
import notebookWebp from "../assets/notebook-410.webp";
import equilibrioAvif from "../assets/equilibrio-410.avif";
import equilibrioWebp from "../assets/equilibrio-410.webp";
import miniEquilibrioAvif from "../assets/mini-equilibrio.avif";
import miniEquilibrioWebp from "../assets/mini-equilibrio.webp";
import miniSentadaAvif from "../assets/mini-sentada.avif";
import miniSentadaWebp from "../assets/mini-sentada.webp";
import miniCampoAvif from "../assets/mini-campo.avif";
import miniCampoWebp from "../assets/mini-campo.webp";
import miniJoelhoAvif from "../assets/mini-joelho.avif";
import miniJoelhoWebp from "../assets/mini-joelho.webp";
import logoMonograma from "../assets/logo-monograma.webp";
import logoNome from "../assets/logo-nome.webp";

export type Imagem = { avif: string; webp: string; largura: number; altura: number };

export const hero = {
  avifSet: `${heroAvif600} 600w, ${heroAvif816} 816w`,
  webpSet: `${heroWebp600} 600w, ${heroWebp816} 816w`,
  src: heroWebp816,
  largura: 816,
  altura: 1226,
};

export const fotos = {
  sentada: { avif: sentadaAvif, webp: sentadaWebp, largura: 1000, altura: 1500 },
  campo: { avif: campoAvif, webp: campoWebp, largura: 1200, altura: 800 },
  joelho: { avif: joelhoAvif, webp: joelhoWebp, largura: 683, altura: 866 },
  conversa: { avif: conversaAvif, webp: conversaWebp, largura: 429, altura: 644 },
  notebook: { avif: notebookAvif, webp: notebookWebp, largura: 410, altura: 615 },
  equilibrio: { avif: equilibrioAvif, webp: equilibrioWebp, largura: 410, altura: 615 },
} satisfies Record<string, Imagem>;

export const miniaturas = {
  equilibrio: { avif: miniEquilibrioAvif, webp: miniEquilibrioWebp, largura: 208, altura: 248 },
  sentada: { avif: miniSentadaAvif, webp: miniSentadaWebp, largura: 208, altura: 248 },
  campo: { avif: miniCampoAvif, webp: miniCampoWebp, largura: 208, altura: 248 },
  joelho: { avif: miniJoelhoAvif, webp: miniJoelhoWebp, largura: 208, altura: 248 },
} satisfies Record<string, Imagem>;

export const logos = { monograma: logoMonograma, nome: logoNome };
