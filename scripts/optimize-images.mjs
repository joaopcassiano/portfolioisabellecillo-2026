// Gera as imagens otimizadas do site (AVIF + WebP), os ícones e a imagem de compartilhamento.
// Fontes: as fotos novas em "IMAGENS/", a do campo em "IMAGENS PROFISSIONAL/" e os recortes em "imagens-fonte/".
// Rode com: npm run images
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const out = "src/assets";
const pub = "public";
mkdirSync(out, { recursive: true });
const fotos = "IMAGENS PROFISSIONAL";

async function variantes(src, nome, larguras) {
  for (const w of larguras) {
    const img = sharp(src).resize({ width: w, withoutEnlargement: true });
    await img.clone().avif({ quality: 62 }).toFile(`${out}/${nome}-${w}.avif`);
    await img.clone().webp({ quality: 82 }).toFile(`${out}/${nome}-${w}.webp`);
  }
}

// Foto recortada da hero (fundo transparente)
await variantes("imagens-fonte/hero-recorte.png", "hero", [600, 816, 1200]);

// Fotos de atendimento (fotos novas, em "IMAGENS/", com o nome de onde cada uma entra no site)
const novas = "IMAGENS";
const larguras = [600, 900, 1200];
await variantes(`${fotos}/fisioterapia esportiva.jpeg`, "campo", [640, 860, 1200, 1600, 2000]);
await variantes(`${novas}/FISIOTERAPIA TRAUMATO.JPG`, "joelho", larguras);
await variantes(`${novas}/PÓS OPERATORIA.JPG`, "equilibrio", larguras);
await variantes(`${novas}/FISIOTERAPIA FUNCIONAL.JPG`, "sentada", larguras);
await variantes(`${novas}/COMO É O ATENDIMENTO.JPG`, "conversa", larguras);
await variantes(`${novas}/SOBRE MIM.JPG`, "notebook", larguras);
await variantes(`${novas}/VAMOS CUIDAR DO SEU MOVIMENTO - Copia.JPG`, "contato", larguras);

// Miniaturas dos cartões da hero (104 x 124 na tela, 2x para telas de alta densidade)
// As mesmas fotos de "Como posso te ajudar", recortadas na Isabelle
const miniaturas = [
  ["campo", `${fotos}/fisioterapia esportiva.jpeg`, null],
  ["joelho", `${novas}/FISIOTERAPIA TRAUMATO.JPG`, "attention"],
  ["equilibrio", `${novas}/PÓS OPERATORIA.JPG`, "attention"],
  ["sentada", `${novas}/FISIOTERAPIA FUNCIONAL.JPG`, "attention"],
];
for (const [nome, src, posicao] of miniaturas) {
  // A foto do campo é horizontal e aberta: o recorte aproxima na Isabelle
  const img = posicao
    ? sharp(src).resize({ width: 208, height: 248, fit: "cover", position: posicao })
    : sharp(src).extract({ left: 1150, top: 380, width: 820, height: 978 }).resize({ width: 208, height: 248 });
  await img.clone().avif({ quality: 60 }).toFile(`${out}/mini-${nome}.avif`);
  await img.clone().webp({ quality: 80 }).toFile(`${out}/mini-${nome}.webp`);
}

// Logos
await sharp("imagens-fonte/logo-monograma.png").resize({ height: 96 }).webp({ quality: 90 }).toFile(`${out}/logo-monograma.webp`);
await sharp("imagens-fonte/logo-nome.png").resize({ height: 128 }).webp({ quality: 90 }).toFile(`${out}/logo-nome.webp`);

// Ícones: monograma azul-marinho sobre o off-white da paleta
const fundo = { r: 247, g: 245, b: 240, alpha: 1 };
async function icone(tamanho, arquivo) {
  const marca = await sharp("imagens-fonte/logo-monograma.png")
    .resize({ width: Math.round(tamanho * 0.62), height: Math.round(tamanho * 0.62), fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  await sharp({ create: { width: tamanho, height: tamanho, channels: 4, background: fundo } })
    .composite([{ input: marca, gravity: "center" }])
    .png()
    .toFile(`${pub}/${arquivo}`);
}
await icone(192, "icon-192.png");
await icone(512, "icon-512.png");
await icone(180, "apple-touch-icon.png");
await icone(48, "favicon.png");

// Imagem de compartilhamento (WhatsApp, Instagram, Google): 1200 x 630
const logo = await sharp("imagens-fonte/logo-nome.png").resize({ width: 560 }).toBuffer();
const foto = await sharp("imagens-fonte/hero-recorte.png").resize({ height: 600 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: fundo } })
  .composite([
    { input: logo, left: 80, top: 230 },
    { input: foto, left: 790, top: 60 },
  ])
  .jpeg({ quality: 86 })
  .toFile(`${pub}/og-image.jpg`);

console.log("imagens geradas");
