import { useEffect, useState } from "react";

/** true quando as fontes terminam de carregar, para dividir o texto em linhas e palavras no tamanho certo. */
export function useFontesProntas() {
  const [prontas, setProntas] = useState(false);
  useEffect(() => {
    document.fonts.ready.then(() => setProntas(true));
  }, []);
  return prontas;
}
