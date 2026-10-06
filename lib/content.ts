// Todo o conteúdo vem de curriculo/curriculo-ana-julia.pdf.

export const contato = {
  email: "contatoanajumgs@gmail.com",
  telefone: "(47) 99662-2661",
  telefoneHref: "tel:+5547996622661",
  whatsapp: "https://wa.me/5547996622661",
  linkedin: "https://www.linkedin.com/in/ana-julia-magalh%C3%A3esdasilva",
  linkedinRotulo: "linkedin.com/in/ana-julia-magalhãesdasilva",
  cidade: "Brusque, SC",
};

export const secoes = [
  { id: "inicio", rotulo: "Início" },
  { id: "destaques", rotulo: "Destaques" },
  { id: "sobre", rotulo: "Sobre" },
  { id: "atuacao", rotulo: "Atuação" },
  { id: "experiencia", rotulo: "Experiência" },
  { id: "competencias", rotulo: "Competências" },
  { id: "formacao", rotulo: "Formação" },
  { id: "contato", rotulo: "Contato" },
] as const;

export const menu = ["sobre", "atuacao", "experiencia", "competencias", "contato"] as const;

export const destaques = [
  {
    numero: "4",
    titulo: "redes sob gestão",
    texto: "Instagram como foco, além de LinkedIn, TikTok e YouTube.",
  },
  {
    numero: "80+",
    titulo: "participantes na Convenção",
    texto: "Cobertura em stories, em tempo real, como storymaker.",
  },
  {
    numero: "2+",
    titulo: "publicações por semana",
    texto: "Frequência semanal nas redes sociais da empresa.",
  },
];

export const experiencias = [
  {
    periodo: "2026 — Atual",
    cargo: "Criação de Conteúdo",
    vinculo: "Freelancer",
    empresa: "Hangar CF 360",
    resumo:
      "Conteúdo para redes sociais com foco na divulgação do box e da modalidade praticada.",
  },
  {
    periodo: "Mai 2024 — Set 2026",
    cargo: "Assistente de Marketing",
    vinculo: "De Jovem Aprendiz a efetivada",
    empresa: "Intelidata Informática",
    resumo:
      "Começou como Jovem Aprendiz no setor de marketing, foi efetivada e assumiu a gestão de Social Media da empresa.",
    pontos: [
      "Gestão de Instagram, LinkedIn, TikTok e YouTube, com mais de 2 publicações por semana.",
      "Planejamento, roteiro, captação e edição de vídeos institucionais, da montagem do cenário à maquiagem.",
      "Análise de resultados e do crescimento dos perfis, com um conteúdo sobre o produto da empresa que alcançou 1 milhão de visualizações no Instagram.",
      "E-mail marketing e assinaturas institucionais via RD Station.",
      "Storymaker na Convenção da empresa (80+ participantes), em visitas institucionais, palestras e confraternizações.",
      "Orçamentos e contato com fornecedores para eventos corporativos e brindes.",
      "Palestrante em eventos internos e em universidade, sobre comunicação multigeracional e sobre autocuidado, na campanha do Outubro Rosa.",
    ],
  },
] as const;

export const outrasExperiencias = [
  {
    periodo: "2025",
    cargo: "Vestuário de Moda",
    empresa: "Enigma G · Freelancer",
    resumo:
      "Planejamento e montagem semanal de vitrines, alinhando composição visual, cores e tecidos à estratégia de imagem da loja.",
  },
  {
    periodo: "2025",
    cargo: "Auxiliar de Consultório Odontológico (ASB)",
    empresa: "Odontolim Odontologia",
    resumo:
      "Auxílio nos atendimentos e procedimentos, organização do ambiente e dos materiais.",
  },
  {
    periodo: "2023 — 2024",
    cargo: "Recepcionista",
    empresa: "Hangar CF 360",
    resumo:
      "Atendimento e relacionamento com os alunos, venda de planos e criação de conteúdo para o Instagram.",
  },
];

export const competencias = [
  {
    area: "Comunicação e Conteúdo",
    itens:
      "Produção de conteúdo para redes sociais, roteiros, planejamento de conteúdo, comunicação institucional e comunicação multigeracional.",
  },
  {
    area: "Social Media",
    itens:
      "Gestão de Instagram, LinkedIn, TikTok e YouTube, análise de métricas, e-mail marketing e cobertura de eventos como storymaker.",
  },
  {
    area: "Audiovisual",
    itens: "Captação e edição de vídeo, montagem de cenários e maquiagem para gravações.",
  },
  {
    area: "Eventos e Relacionamento",
    itens: "Orçamentos, contato com fornecedores e palestras.",
  },
  {
    area: "Tecnologia e Produtividade",
    itens:
      "Aplicação de IA (ChatGPT, Gemini e Claude) na criação de roteiros e legendas, Pacote Office e Google Workspace.",
  },
];

export const ferramentas = [
  "Adobe Premiere",
  "CapCut",
  "Edits",
  "Canva",
  "Mlabs",
  "Meta Business",
  "RD Station",
  "Adobe Photoshop (básico)",
];

export const cursos = [
  "Branding, por Ana Couto",
  "Planejamento de eventos integrando experiências ao calendário de marketing",
  "Como falar bem em público",
  "Comunicação e convivência no ambiente de trabalho",
  "Geração Empreendedora: Empreendedorismo",
];
