import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/jost/wght.css";
import "@fontsource-variable/cormorant-garamond/wght.css";
import "@fontsource-variable/hanken-grotesk/wght.css";
import "./index.css";
import App from "./App";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// No site publicado o HTML já vem pré-renderizado (scripts/prerender.mjs): só ligamos o React nele.
// No modo de desenvolvimento a página chega vazia e é montada do zero.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
