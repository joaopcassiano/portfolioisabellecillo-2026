// Todas as imagens do site, em AVIF (mais leve) com WebP de reserva. Geradas por scripts/optimize-images.mjs.
import heroAvif600 from "../assets/hero-600.avif";
import heroAvif816 from "../assets/hero-816.avif";
import heroWebp600 from "../assets/hero-600.webp";
import heroWebp816 from "../assets/hero-816.webp";
import heroAvif1200 from "../assets/hero-1200.avif";
import heroWebp1200 from "../assets/hero-1200.webp";
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
import joelhoAvif600 from "../assets/joelho-600.avif";
import joelhoWebp600 from "../assets/joelho-600.webp";
import joelhoAvif900 from "../assets/joelho-900.avif";
import joelhoWebp900 from "../assets/joelho-900.webp";
import joelhoAvif1200 from "../assets/joelho-1200.avif";
import joelhoWebp1200 from "../assets/joelho-1200.webp";
import equilibrioAvif600 from "../assets/equilibrio-600.avif";
import equilibrioWebp600 from "../assets/equilibrio-600.webp";
import equilibrioAvif900 from "../assets/equilibrio-900.avif";
import equilibrioWebp900 from "../assets/equilibrio-900.webp";
import equilibrioAvif1200 from "../assets/equilibrio-1200.avif";
import equilibrioWebp1200 from "../assets/equilibrio-1200.webp";
import sentadaAvif600 from "../assets/sentada-600.avif";
import sentadaWebp600 from "../assets/sentada-600.webp";
import sentadaAvif900 from "../assets/sentada-900.avif";
import sentadaWebp900 from "../assets/sentada-900.webp";
import sentadaAvif1200 from "../assets/sentada-1200.avif";
import sentadaWebp1200 from "../assets/sentada-1200.webp";
import conversaAvif600 from "../assets/conversa-600.avif";
import conversaWebp600 from "../assets/conversa-600.webp";
import conversaAvif900 from "../assets/conversa-900.avif";
import conversaWebp900 from "../assets/conversa-900.webp";
import conversaAvif1200 from "../assets/conversa-1200.avif";
import conversaWebp1200 from "../assets/conversa-1200.webp";
import notebookAvif600 from "../assets/notebook-600.avif";
import notebookWebp600 from "../assets/notebook-600.webp";
import notebookAvif900 from "../assets/notebook-900.avif";
import notebookWebp900 from "../assets/notebook-900.webp";
import notebookAvif1200 from "../assets/notebook-1200.avif";
import notebookWebp1200 from "../assets/notebook-1200.webp";
import contatoAvif600 from "../assets/contato-600.avif";
import contatoWebp600 from "../assets/contato-600.webp";
import contatoAvif900 from "../assets/contato-900.avif";
import contatoWebp900 from "../assets/contato-900.webp";
import contatoAvif1200 from "../assets/contato-1200.avif";
import contatoWebp1200 from "../assets/contato-1200.webp";
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
  avifSet: `${heroAvif600} 600w, ${heroAvif816} 816w, ${heroAvif1200} 1200w`,
  webpSet: `${heroWebp600} 600w, ${heroWebp816} 816w, ${heroWebp1200} 1200w`,
  src: heroWebp816,
  largura: 816,
  altura: 1226,
};

export const fotos = {
  sentada: imagem([[sentadaAvif600, sentadaWebp600, 600], [sentadaAvif900, sentadaWebp900, 900], [sentadaAvif1200, sentadaWebp1200, 1200]], 1800),
  campo: imagem([[campoAvif640, campoWebp640, 640], [campoAvif860, campoWebp860, 860], [campoAvif, campoWebp, 1200], [campoAvif1600, campoWebp1600, 1600], [campoAvif2000, campoWebp2000, 2000]], 1333),
  joelho: imagem([[joelhoAvif600, joelhoWebp600, 600], [joelhoAvif900, joelhoWebp900, 900], [joelhoAvif1200, joelhoWebp1200, 1200]], 1800),
  conversa: imagem([[conversaAvif600, conversaWebp600, 600], [conversaAvif900, conversaWebp900, 900], [conversaAvif1200, conversaWebp1200, 1200]], 1800),
  notebook: imagem([[notebookAvif600, notebookWebp600, 600], [notebookAvif900, notebookWebp900, 900], [notebookAvif1200, notebookWebp1200, 1200]], 1800),
  equilibrio: imagem([[equilibrioAvif600, equilibrioWebp600, 600], [equilibrioAvif900, equilibrioWebp900, 900], [equilibrioAvif1200, equilibrioWebp1200, 1200]], 1800),
  contato: imagem([[contatoAvif600, contatoWebp600, 600], [contatoAvif900, contatoWebp900, 900], [contatoAvif1200, contatoWebp1200, 1200]], 1800),
} satisfies Record<string, Imagem>;

export const miniaturas = {
  equilibrio: imagem([[miniEquilibrioAvif, miniEquilibrioWebp, 208]], 248),
  sentada: imagem([[miniSentadaAvif, miniSentadaWebp, 208]], 248),
  campo: imagem([[miniCampoAvif, miniCampoWebp, 208]], 248),
  joelho: imagem([[miniJoelhoAvif, miniJoelhoWebp, 208]], 248),
} satisfies Record<string, Imagem>;

export const logos = { monograma: logoMonograma, nome: logoNome };
