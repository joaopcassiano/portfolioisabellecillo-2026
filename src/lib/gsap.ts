// Ponto único de registro dos plugins GSAP usados no site.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// Curvas das skills do Emil Kowalski: saída rápida e chegada suave
gsap.registerEase("saida", (p: number) => 1 - Math.pow(1 - p, 4));

/** Animações só rodam para quem não pediu menos movimento no aparelho. */
export const COM_MOVIMENTO = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
