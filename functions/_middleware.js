// Um endereço só para o site: quem chega pelo www ou pelo endereço antigo da Cloudflare Pages
// é levado (301, permanente) para https://isabellecillo.com.br, no mesmo caminho.
// As prévias de cada publicação (algo.isabellecillo.pages.dev) continuam abrindo normalmente.
const PRINCIPAL = "isabellecillo.com.br";
const REDIRECIONAR = new Set(["www.isabellecillo.com.br", "isabellecillo.pages.dev"]);

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (REDIRECIONAR.has(url.hostname)) {
    url.hostname = PRINCIPAL;
    url.protocol = "https:";
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
