// Pré-renderização: coloca o HTML do site dentro do dist/index.html depois do build.
// Assim o Google (e quem compartilha o link) recebe o conteúdo pronto, sem depender do JavaScript.
import { readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const dist = resolve("dist");
const ssrDir = resolve("dist-ssr");
const { render } = await import(pathToFileURL(resolve(ssrDir, "entry-server.js")).href);

let html = readFileSync(resolve(dist, "index.html"), "utf8");
const app = render();
if (!html.includes('<div id="root"></div>')) throw new Error('Não achei o <div id="root"> no dist/index.html');
html = html.replace('<div id="root"></div>', `<div id="root">${app}</div>`);

// Pré-carrega a fonte do nome e a foto da hero, que aparecem na primeira tela
const assets = readdirSync(resolve(dist, "assets"));
const fonte = assets.find((f) => /^jost-latin-wght-normal-.*\.woff2$/.test(f));
const hero600 = assets.find((f) => /^hero-600-.*\.avif$/.test(f));
const hero816 = assets.find((f) => /^hero-816-.*\.avif$/.test(f));
const preload = [
  fonte && `<link rel="preload" href="/assets/${fonte}" as="font" type="font/woff2" crossorigin />`,
  hero600 &&
    hero816 &&
    `<link rel="preload" as="image" type="image/avif" imagesrcset="/assets/${hero600} 600w, /assets/${hero816} 816w" imagesizes="(min-width: 1024px) 38vw, 88vw" fetchpriority="high" />`,
]
  .filter(Boolean)
  .join("\n    ");
html = html.replace("</title>", `</title>\n    ${preload}`);

writeFileSync(resolve(dist, "index.html"), html);
rmSync(ssrDir, { recursive: true, force: true });
console.log(`pré-renderizado: ${Math.round(app.length / 1024)} KB de HTML`);
