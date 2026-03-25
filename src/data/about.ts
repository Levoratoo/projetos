/** Dados estruturados da seção "Sobre mim", agnósticos de idioma. */

export type ExperienceItem = {
  id: string;
  company: string;
  /** Chave para buscar o cargo traduzido em i18n/about.ts */
  roleKey: string;
  period: string;
  /** Se ainda está nessa posição */
  current: boolean;
  /** Se é a carreira musical (recebe estilo e ícone especial) */
  isMusic?: boolean;
  /** Link externo opcional (press kit, site etc.) */
  link?: string;
};

export type CertItem = {
  id: string;
  name: string;
  issuer: string;
  /** Tipo de link (rótulo vem do i18n) */
  kind: "credly" | "verify" | "pdf";
  url: string;
};

export type RecommendationItem = {
  id: string;
  author: string;
  /** Texto em português (idioma original do LinkedIn) */
  text: string;
  /** Perfil de quem recomendou; se ausente, o card abre a página de recomendações */
  authorUrl?: string;
  /** Cargo / headline (opcional) */
  roleLine?: string;
};

/* ─── Experiências ──────────────────────────────────────────────────────── */
export const experiences: ExperienceItem[] = [
  {
    id: "printbag",
    company: "Printbag Embalagens",
    roleKey: "rolePrintbag",
    period: "Nov 2025",
    current: true,
  },
  {
    id: "music",
    company: "Levorato · Carreira Musical",
    roleKey: "roleMusic",
    period: "2011",
    current: true,
    isMusic: true,
    link: "https://levoratoo.github.io/presskitlevoratodj/",
  },
  {
    id: "ufit",
    company: "Rede Ufit Academia",
    roleKey: "roleUfit",
    period: "Ago 2025 – Out 2025",
    current: false,
  },
  {
    id: "sankhya",
    company: "Sankhya Gestão de Negócios",
    roleKey: "roleSankhya",
    period: "Jun 2024 – Ago 2025",
    current: false,
  },
  {
    id: "banana",
    company: "Banana Brasil",
    roleKey: "roleBanana",
    period: "Fev 2023 – Out 2024",
    current: false,
  },
  {
    id: "amc",
    company: "AMC Textil",
    roleKey: "roleAmc",
    period: "Set 2021 – Fev 2023",
    current: false,
  },
  {
    id: "db1",
    company: "DB1 Group",
    roleKey: "roleDb1",
    period: "Nov 2020 – Set 2021",
    current: false,
  },
  {
    id: "iceti",
    company: "ICETI – Instituto Cesumar",
    roleKey: "roleIceti",
    period: "Jan 2018 – Ago 2019",
    current: false,
  },
];

/* ─── Certificações (links oficiais / Credly / PDF) ─────────────────────── */
export const certifications: CertItem[] = [
  {
    id: "prompt-ai",
    name: "Talking to AI: Prompt Engineering for Project Managers",
    issuer: "PMI",
    kind: "verify",
    url: "https://www.credly.com/badges/42894808-ab3a-4a94-8fe6-04ec2f22eda6/linked_in_profile",
  },
  {
    id: "gen-ai-overview",
    name: "Generative AI Overview for Project Managers",
    issuer: "PMI",
    kind: "verify",
    url: "https://www.credly.com/badges/db7faca4-8d3a-441c-bc13-b29bdd62255e/linked_in_profile",
  },
  {
    id: "gen-ai-practical",
    name: "Practical Application of Gen AI for Project Managers",
    issuer: "PMI",
    kind: "verify",
    url: "https://www.credly.com/badges/930f82eb-ea65-4de5-b3e6-987c218bf921/linked_in_profile",
  },
  {
    id: "sfc",
    name: "Scrum Fundamentals Certified (SFC™)",
    issuer: "SCRUMstudy",
    kind: "verify",
    url: "https://www.scrumstudy.com/certification/verify?type=SFC&number=895606",
  },
  {
    id: "ssyb",
    name: "Six Sigma Yellow Belt (SSYB™)",
    issuer: "6sigmastudy",
    kind: "verify",
    url: "https://www.6sigmastudy.com/certification/verify?type=SSYB&number=1134705",
  },
  {
    id: "ba-ai-pdf",
    name: "Business Analysis Fundamentals with AI Certified",
    issuer: "SCRUMstudy",
    kind: "pdf",
    url: "https://c46e136a583f7e334124-ac22991740ab4ff17e21daf2ed577041.ssl.cf1.rackcdn.com/Certificate/BusinessAnalysisFundamentalswithAICertified-PedroHenriqueLevoratoFrança-1134709.pdf",
  },
  {
    id: "kanban-ai-pdf",
    name: "Kanban Essentials with AI Certified",
    issuer: "SCRUMstudy",
    kind: "pdf",
    url: "https://c46e136a583f7e334124-ac22991740ab4ff17e21daf2ed577041.ssl.cf1.rackcdn.com/Certificate/KanbanEssentialswithAICertified-PedroHenriqueLevoratoFrança-1134711.pdf",
  },
];

/** Recomendações públicas no LinkedIn (texto fiel ao perfil; authorUrl só quando houver link público) */
export const recommendations: RecommendationItem[] = [
  {
    id: "aline",
    author: "Aline Torezani",
    roleLine: "Analista de E-commerce | Banana Brasil",
    text: "Um ótimo profissional!",
    authorUrl: "https://www.linkedin.com/in/aline-torezani-638a68206/",
  },
  {
    id: "leandro",
    author: "Leandro Olczyk",
    roleLine: "Support Analyst and Integration | JavaScript | SQL",
    text: "Agradeço ao Pedro pelo esforço dedicado ao realizar o levantamento de simulações para identificação e correção de Bugs, gerenciando a comunicação entre Desenvolvedor e Usuário. Valeu Pedro!",
    authorUrl: "https://www.linkedin.com/in/leandro-olczyk-8297691a3/",
  },
  {
    id: "bryan-ribeiro-rovani",
    author: "Bryan Ribeiro Rovani",
    roleLine: "TI - Assistente na Banana Brasil.",
    text: `Pedro foi um profissional dentro da Banana Brasil, que eu tive o prazer de conhecer e trabalhar juntamente com ele. Sempre que necessário prestou-me suporte e se mostrava sempre atencioso a contribuir com alguma melhoria. Com certeza deixo ênfase em sua velocidade de resolução de problemas, sua habilidade de aprender rápido, sua organização em desempenhar as atividades dentro da Bnb, tanto também como seu comprometimento com a organização.`,
  },
  {
    id: "moises-moura",
    author: "Moises Moura",
    roleLine: "Analista de Relacionamento (Customer Success)",
    text: "Tive o privilégio de conhecer e trabalhar com o Pedro nos últimos 3 anos. Ele é um excelente profissional, sempre prestativo, demonstrando grande atenção aos detalhes e comprometido com suas responsabilidades.",
  },
  {
    id: "joao-pedro-redondo",
    author: "João Pedro Redondo",
    roleLine: "Software Engineer | Java | JavaScript | Node.js | React",
    text: "Ótimo profissional, dedicado e proficiente.",
  },
  {
    id: "eduardo-hiroshi",
    author: "Eduardo Hiroshi",
    roleLine: "Desenvolvedor | Javascript | Progress | Python | HTML",
    text: "O Pedro Henrique é um excelente profissional, sempre esteve disposto em nos ajudar enquanto presidente da Unidev, além de ter mostrado um grande esforço para tornar nossa consultoria a melhor da universidade. Mesmo tendo pouco tempo para trabalhar junto com ele, ganhei muita experiência e conhecimento que levarei para toda minha carreira profissional, e posso afirmar que além de um bom amigo, ele é um ótimo líder.",
  },
  {
    id: "diego-franca",
    author: "Diego França",
    roleLine:
      "Tailor-made market intelligence for your business | B2B | Solutions | Adtech | Mentor",
    text: `Pedro é uma pessoa dedicada, confiante e inspiradora. Ele está sempre motivado para encarar novos desafios e, quando ele se propõe a fazer algo, ele fará, e fará bem feito. É surpreendente a velocidade que o Pedro aprende coisas novas. Sua habilidade de escutar as pessoas, sempre as motivar e estar disposto a arregaçar as mangas e trabalhar junto com elas faz dele um líder fora da curva. Pedro é capaz de gerenciar tarefas com facilidade e inteligência, e sempre consegue analisar as situações por diferentes ângulos em busca de soluções eficientes.`,
  },
  {
    id: "felipe-machado",
    author: "Felipe Machado",
    roleLine:
      "Full Stack Developer | AI & LLM Integrations | Intelligent Automation | Python • C# 💻",
    text: "Pedro Levorato é um ótimo lider, trabalhei com ele na liderança da Consultoria Júnior UNIDEV e em pouco tempo conseguimos obter ótimos resultados.",
  },
  {
    id: "murilo-coleta-marques",
    author: "Murilo Coleta Marques",
    text: `Pedro é aquela pessoa de energia boa, que transforma o ambiente, motiva todo mundo, extremamente responsável e não nega ajuda a ninguém, uma pessoa que você pode contar para tudo, nunca me deixou na mão, além disso tudo, ele é muito compreensivel, sabe lidar com as pessoas e analisa extremamente bem as situações nas quais é posto`,
  },
  {
    id: "joao-vieira",
    author: "João Vieira",
    roleLine: "Node.js | Dev TecnoSpeed TI | Engenheira de Software",
    text: "Tive a oportunidade de conhecer o Pedro dentro da faculdade, onde ele se mostrou ser uma pessoa muito proativa e focada, ocupando diversos cargos de liderança e gestão, e como líder tem um perfil muito interessante, onde ele busca auxiliar todos ao seu redor e extrair o melhor de cada indivíduo.",
  },
  {
    id: "lucas-matheus-canal",
    author: "Lucas Matheus Canal",
    roleLine: "Aluno na UniCesumar",
    text: `levorato pelo pouco tempo que eu estudei e fiz alguns trabalhos com ele já vi o quão responsável ele é, tanto em questão de gerenciamento de recursos e de pessoas como em questo de incentivo as pessoas que estão no grupo, ele nasceu com esse dom de líder e liderança, sem duvidas melhor ponto dele é o trabalho em equipe que ele consegue executar, a função dele administrativa é muito boa, pelo que estudamos e os trabalhos que fizemos em esse 1 ano que temos já deu  pra ter uma noção do que esse menino tem de bom`,
  },
  {
    id: "felipe-defendi",
    author: "Felipe Defendi",
    roleLine:
      "💻 Engenheiro de Software | Suporte Técnico | Desenvolvedor Full-Stack (Flutter, Node.js, Nest.js, React.js, Vue.js, HTML, CSS)  🌟",
    text: `Pedro Levorato é um líder nato! Na minha experiência com ele na consultoria Junior Unidev, ele sempre tentou envolver ao máximo todos os integrantes da mesma, sempre incentivando a todos, estabelecendo metas e ralando para cumpri-las! Não pense que era fácil, pois ele tinha que administrar muitos jovens que nem sequer tinham entrado no mercado de trabalho ainda, ou seja,  pessoas "despreparadas" e por isso e muito mais, tenho máximo respeito por ele.`,
  },
  {
    id: "rodrigo-simao",
    author: "Rodrigo Simão",
    roleLine: "CEO and Software Engineer at Ology",
    text: "Durante o período em que participei na consultoria UnidevTI, o Pedro era o presidente da mesma e foi quem fez a nossa consultoria bater recordes de projetos em comparação a anos anteriores, ele quem gerenciou e motivou todos os consultores a participar e completar os projetos com êxito.",
  },
  {
    id: "thiago-dantas-teixeira",
    author: "Thiago Dantas Teixeira",
    roleLine:
      "Funcionário público na Prefeitura Municipal de Maringá | Fiscalização e Operação de Trânsito",
    text: "Trabalhamos por alguns meses na UnidevTI enquanto o Pedro era Presidente e a percepção que tive foi de alguém bastante motivado e criativo. Durante sua gestão a UnidevTI teve ótimos resultados o que a levou a uma posição de destaque, em relação as outras consultorias. De forma resumida, a sua forma de liderança deve ser destacada, pois motivou os outros membros a chegar nos resultados obtidos.",
  },
  {
    id: "lucas-zuin-cossitt",
    author: "Lucas Zuin Cossitt",
    roleLine:
      "Desenvolvedor de software apaixonado por tecnologia e backend | Node.js | SQL | Cloud | DevOps | PHP | Graduado em Engenharia de Software pela UniCesumar Maringá - PR | PJ - Aberto a novas oportunidades",
    text: "Pedro é muito bom líder, se da bem na gestão de projetos e na evolução dos mesmos. No meu periodo de contato com ele na UnidevTI, tivemos um desempenho sensacional graças a ele.",
  },
];

/** Página com todas as recomendações recebidas no LinkedIn */
export const LINKEDIN_RECOMMENDATIONS_URL =
  "https://www.linkedin.com/in/pedrolevorato/details/recommendations/";
