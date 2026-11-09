// Todas as imagens do site, em AVIF (mais leve) com WebP de reserva. Geradas por scripts/optimize-images.mjs.
import heroAvif600 from "../assets/hero-600.avif";
import heroAvif816 from "../assets/hero-816.avif";
import heroWebp600 from "../assets/hero-600.webp";
import heroWebp816 from "../assets/hero-816.webp";
import campoAvif640 from "../assets/campo-640.avif";
import campoWebp640 from "../assets/campo-640.webp";
import campoAvif860 from "../assets/campo-860.avif";
import campoWebp860 from "../assets/campo-860.webp";
import campoAvif from "../assets/campo-1200.avif";
import campoWebp from "../assets/campo-1200.webp";
import campoAvif1600 from "../assets/campo-1600.avif";
import campoWebp1600 from "../assets/campo-1600.webp";
import campoAvif2000 from "../assets/campo-2000.avif";
import campoWebp2000 from "../assets/campo-2000.webp";
import joelhoAvif480 from "../assets/joelho-480.avif";
import joelhoWebp480 from "../assets/joelho-480.webp";
import joelhoAvif from "../assets/joelho-683.avif";
import joelhoWebp from "../assets/joelho-683.webp";
import sentadaAvif600 from "../assets/sentada-600.avif";
import sentadaWebp600 from "../assets/sentada-600.webp";
import sentadaAvif800 from "../assets/sentada-800.avif";
import sentadaWebp800 from "../assets/sentada-800.webp";
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

/** avif e webp são listas de versões (srcset); src é a versão de reserva para navegadores antigos. */
export type Imagem = { avif: string; webp: string; src: string; largura: number; altura: number };

/** Monta uma imagem com uma ou mais larguras, para o navegador baixar só a que precisa. */
function imagem(versoes: [avif: string, webp: string, largura: number][], altura: number): Imagem {
  const maior = versoes[versoes.length - 1];
  const lista = (i: 0 | 1) => (versoes.length === 1 ? versoes[0][i] : versoes.map((v) => `${v[i]} ${v[2]}w`).join(", "));
  return { avif: lista(0), webp: lista(1), src: maior[1], largura: maior[2], altura };
}

export const hero = {
  avifSet: `${heroAvif600} 600w, ${heroAvif816} 816w`,
  webpSet: `${heroWebp600} 600w, ${heroWebp816} 816w`,
  src: heroWebp816,
  largura: 816,
  altura: 1226,
};

export const fotos = {
  sentada: imagem([[sentadaAvif600, sentadaWebp600, 600], [sentadaAvif800, sentadaWebp800, 800], [sentadaAvif, sentadaWebp, 1000]], 1500),
  campo: imagem([[campoAvif640, campoWebp640, 640], [campoAvif860, campoWebp860, 860], [campoAvif, campoWebp, 1200], [campoAvif1600, campoWebp1600, 1600], [campoAvif2000, campoWebp2000, 2000]], 1333),
  joelho: imagem([[joelhoAvif480, joelhoWebp480, 480], [joelhoAvif, joelhoWebp, 683]], 866),
  conversa: imagem([[conversaAvif, conversaWebp, 429]], 644),
  notebook: imagem([[notebookAvif, notebookWebp, 410]], 615),
  equilibrio: imagem([[equilibrioAvif, equilibrioWebp, 410]], 615),
} satisfies Record<string, Imagem>;

export const miniaturas = {
  equilibrio: imagem([[miniEquilibrioAvif, miniEquilibrioWebp, 208]], 248),
  sentada: imagem([[miniSentadaAvif, miniSentadaWebp, 208]], 248),
  campo: imagem([[miniCampoAvif, miniCampoWebp, 208]], 248),
  joelho: imagem([[miniJoelhoAvif, miniJoelhoWebp, 208]], 248),
} satisfies Record<string, Imagem>;

export const logos = { monograma: logoMonograma, nome: logoNome };
