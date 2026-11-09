// Pré-renderização: coloca o HTML do site dentro do dist/index.html depois do build.
// Assim o Google (e quem compartilha o link) recebe o conteúdo pronto, sem depender do JavaScript.
import { readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { createHash } from "node:crypto";
import { resolve } from "node:path";

const dist = resolve("dist");
const ssrDir = resolve("dist-ssr");
const { render } = await import(pathToFileURL(resolve(ssrDir, "entry-server.js")).href);

// Quebras de linha no padrão LF: o navegador normaliza CRLF antes de calcular o hash dos scripts (CSP)
const CR = String.fromCharCode(13);
let html = readFileSync(resolve(dist, "index.html"), "utf8").split(CR).join("");
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

// CSS embutido na página: o navegador pinta a primeira tela sem esperar outro arquivo (são só ~10 KB comprimidos)
const linkCss = html.match(/<link rel="stylesheet"[^>]*href="\/assets\/([^"]+\.css)"[^>]*>/);
if (linkCss) {
  const css = readFileSync(resolve(dist, "assets", linkCss[1]), "utf8");
  html = html.replace(linkCss[0], `<style>${css}</style>`);
}

writeFileSync(resolve(dist, "index.html"), html);

// Política de segurança (CSP): libera só os scripts embutidos que estão no HTML, pelo hash do conteúdo.
// Assim nenhum script injetado por terceiros roda na página.
const hashes = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(
  (m) => `'sha256-${createHash("sha256").update(m[1]).digest("base64")}'`,
);
const headersPath = resolve(dist, "_headers");
const headers = readFileSync(headersPath, "utf8");
if (!headers.includes("__CSP_SCRIPTS__")) throw new Error("Não achei o __CSP_SCRIPTS__ no _headers");
writeFileSync(headersPath, headers.replaceAll("__CSP_SCRIPTS__", hashes.join(" ")));
rmSync(ssrDir, { recursive: true, force: true });
console.log(`pré-renderizado: ${Math.round(app.length / 1024)} KB de HTML`);
