// Dados do site num lugar só: contatos, endereço e links usados em várias seções.

const mensagem = "Olá, Isabelle! Vim pelo site e gostaria de agendar uma consulta.";

export const contato = {
  whatsappNumero: "5535999770531",
  whatsappExibido: "(35) 9 9977-0531",
  /** Link dos botões de agendamento: abre o WhatsApp com a mensagem já escrita. */
  agendar: `https://wa.me/5535999770531?text=${encodeURIComponent(mensagem)}`,
  whatsapp: "https://wa.me/5535999770531",
  instagram: "https://www.instagram.com/isaccillofisioterapeuta/",
  instagramUsuario: "@isaccillofisioterapeuta",
  email: "isabelle99.costa@gmail.com",
};

export const endereco = {
  rua: "R. Padre João Batista, 838",
  ruaCompleta: "Rua Padre João Batista, 838",
  bairro: "Parque das Nações",
  cidade: "Alfenas",
  uf: "MG",
  cep: "37130-011",
};

/** Perfil no Google Maps (Google Meu Negócio). */
const cid = "17368880053201675150";
export const mapa = {
  perfil: `https://www.google.com/maps?cid=${cid}`,
  rota: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${endereco.ruaCompleta}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.uf}, ${endereco.cep}`,
  )}`,
  embed: `https://maps.google.com/maps?q=${encodeURIComponent(
    `Dra. Isabelle Cillo Fisioterapeuta, ${endereco.ruaCompleta}, ${endereco.cidade} - ${endereco.uf}`,
  )}&z=16&output=embed`,
};

export const empresa = {
  razaoSocial: "Isabelle Costa de Cillo",
  cnpj: "45.681.153/0001-80",
};
