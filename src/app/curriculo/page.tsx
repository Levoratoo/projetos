"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "@/state/locale";
import type { Locale } from "@/state/locale";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

/* ── Types ─────────────────────────────────────────────────────────────────── */
type Lang = "pt" | "en" | "es" | "zh" | "de" | "ja";

interface Exp { role: string; company: string; period: string; desc: string; }
interface Edu { degree: string; school: string; period: string; }
interface Cert { name: string; issuer: string; url: string | null; kind: "verify" | "pdf"; }
interface Project {
  title: string;
  year: number;
  desc: Record<Lang, string>;
  tags: string;
  link: string;
}

/* ── Translations ───────────────────────────────────────────────────────────── */
const T: Record<Lang, {
  subtitle: string; printBtn: string; hSummary: string; hExperience: string;
  hProjects: string; hCerts: string; hEducation: string;
  verify: string;
  summary: string;
  experiences: Exp[]; education: Edu[];
}> = {
  pt: {
    subtitle: "Analista de Negócios Sênior · Gerente de Projetos · Desenvolvedor Full Stack",
    printBtn: "↓ Salvar como PDF",
    hSummary: "Resumo Profissional",
    hExperience: "Experiência Profissional",
    hProjects: "Projetos em Portfólio",
    hCerts: "Certificações",
    hEducation: "Educação",
    verify: "verificar",
    summary: "Analista de Negócios Sênior e trabalho com tecnologia há 6 anos, basicamente tentando convencer sistema, processo e gente a trabalharem juntos sem gerar terapia coletiva. Integro coisas que não conversam, automatizo o que ninguém quer fazer manualmente e tento fazer a tecnologia ajudar, em vez de atrapalhar ainda mais.",
    experiences: [
      { role: "Analista de Negócios Sênior / Desenvolvedor Full Stack", company: "Printbag Embalagens", period: "Ago 2025 – atual · Camboriú, SC", desc: "Desenvolvimento de sistemas, automações, integrações, ERP e e-commerce. Se tem processo repetitivo, planilha que virou gambiarra oficial ou sistema que \"quase conversa\"… normalmente chega pra mim. Entender o caos, integrar as coisas, automatizar o possível e deixar tudo rodando mais liso." },
      { role: "Gerente de Projetos – PJ", company: "Rede Ufit Academia", period: "Ago 2025 – Out 2025 · Itapema, SC", desc: "Organizei o caos tecnológico pra rede crescer sem surtar. Implementei soluções de IA pra automatizar fluxo comercial, atendimento e captação de leads, conectando WhatsApp, RD Station e sistemas internos." },
      { role: "Gerente de Projetos – PJ", company: "Sankhya Gestão de Negócios", period: "Jun 2024 – Ago 2025 · Balneário Camboriú, SC", desc: "Implantação, integração e suporte a novos clientes. Ajudava empresas a tirar o ERP do \"modo projeto\" e colocar pra rodar de verdade no dia a dia. Alinhar expectativa, resolver pepino e adaptar sistema pra realidade do cliente." },
      { role: "Analista de Sistemas", company: "Banana Brasil", period: "Fev 2023 – Out 2024 · Jaraguá do Sul, SC", desc: "Guardião do ERP da empresa. Banco de dados, suporte ao time, desenvolvimento de soluções internas, automação de processos e tradução da tecnologia pra quem só queria fazer o trabalho acontecer." },
      { role: "Analista de Sistemas", company: "AMC Têxtil", period: "Set 2021 – Fev 2023 · Itajaí, SC", desc: "Ponte entre operação e desenvolvimento: levantamento de requisitos, acompanhamento de projetos e melhorias no ERP. Suporte da rotina e redução do ruído entre quem usa e quem desenvolve." },
      { role: "Suporte Técnico de Sistema", company: "DB1 Group (Consignet)", period: "Nov 2020 – Set 2021", desc: "Suporte na linha de frente do sistema de crédito consignado. Atendimento a usuários, resolução de chamados e manutenção da operação sob pressão." },
      { role: "Administração – Consultorias Júniores", company: "ICETI – Instituto Cesumar", period: "Jan 2018 – Ago 2019 · Maringá, PR", desc: "Administração das consultorias juniores da faculdade: projetos organizados, equipes engajadas e iniciativas continuadas." },
    ],
    education: [
      { degree: "Análise e Desenvolvimento de Sistemas", school: "Universidade do Vale do Itajaí (UNIVALI)", period: "Jun 2024 – Dez 2026" },
      { degree: "Bacharelado em Engenharia de Software", school: "UniCesumar", period: "Jan 2021 – Set 2022" },
    ],
  },
  en: {
    subtitle: "Senior Business Analyst · Project Manager · Full Stack Developer",
    printBtn: "↓ Save as PDF",
    hSummary: "Professional Summary",
    hExperience: "Work Experience",
    hProjects: "Portfolio Projects",
    hCerts: "Certifications",
    hEducation: "Education",
    verify: "verify",
    summary: "Senior Business Analyst with 6 years in tech, bridging the gap between systems, processes and people. I integrate things that don't talk to each other, automate what no one wants to do manually, and make sure technology helps rather than gets in the way.",
    experiences: [
      { role: "Senior Business Analyst / Full Stack Developer", company: "Printbag Embalagens", period: "Aug 2025 – present · Camboriú, SC", desc: "Systems development, automation, integrations, ERP and e-commerce. If there's a repetitive process, a spreadsheet that became the unofficial workaround, or a system that \"almost works\", it usually lands on my desk. Understand the chaos, integrate things, automate what's possible, keep everything running smoothly." },
      { role: "Project Manager – Freelance", company: "Rede Ufit Academia", period: "Aug 2025 – Oct 2025 · Itapema, SC", desc: "Organized the tech chaos so the network could grow. Implemented AI solutions to automate sales flow, customer service and lead capture, connecting WhatsApp, RD Station and internal systems." },
      { role: "Project Manager – Freelance", company: "Sankhya Gestão de Negócios", period: "Jun 2024 – Aug 2025 · Balneário Camboriú, SC", desc: "Implementation, integration and support for new and active clients. Helped companies move the ERP from \"project mode\" into real daily operations. Aligning expectations, solving problems and adapting the system to the client's reality." },
      { role: "Systems Analyst", company: "Banana Brasil", period: "Feb 2023 – Oct 2024 · Jaraguá do Sul, SC", desc: "ERP guardian. Database maintenance, team support, internal solution development and process automation. Translating technology for people who just wanted to get their work done." },
      { role: "Systems Analyst", company: "AMC Têxtil", period: "Sep 2021 – Feb 2023 · Itajaí, SC", desc: "Bridge between operations and development: requirements gathering, project tracking and ERP improvements. Reducing the gap between users and developers." },
      { role: "System Technical Support", company: "DB1 Group (Consignet)", period: "Nov 2020 – Sep 2021", desc: "Front-line support for a payroll credit system. User assistance, ticket resolution and keeping operations running under pressure." },
      { role: "Administration – Junior Consulting", company: "ICETI – Instituto Cesumar", period: "Jan 2018 – Aug 2019 · Maringá, PR", desc: "Managed junior consulting entities at university: organized projects, kept teams engaged and supported young leadership initiatives." },
    ],
    education: [
      { degree: "Systems Analysis and Development", school: "Universidade do Vale do Itajaí (UNIVALI)", period: "Jun 2024 – Dec 2026" },
      { degree: "Bachelor in Software Engineering", school: "UniCesumar", period: "Jan 2021 – Sep 2022" },
    ],
  },
  es: {
    subtitle: "Analista de Negocios Senior · Gerente de Proyectos · Desarrollador Full Stack",
    printBtn: "↓ Guardar como PDF",
    hSummary: "Resumen Profesional",
    hExperience: "Experiencia Laboral",
    hProjects: "Proyectos en Portafolio",
    hCerts: "Certificaciones",
    hEducation: "Educación",
    verify: "verificar",
    summary: "Analista de Negocios Senior con 6 años en tecnología. Integro sistemas que no se comunican, automatizo tareas manuales y hago que la tecnología ayude en lugar de complicar.",
    experiences: [
      { role: "Analista de Negocios Senior / Desarrollador Full Stack", company: "Printbag Embalagens", period: "Ago 2025 – actual · Camboriú, SC", desc: "Desarrollo de sistemas, automatizaciones, integraciones, ERP y e-commerce. Entiendo el caos, integro las piezas y automatizo todo lo posible." },
      { role: "Gerente de Proyectos – Freelance", company: "Rede Ufit Academia", period: "Ago 2025 – Oct 2025 · Itapema, SC", desc: "Implementé soluciones de IA para automatizar flujos comerciales y captación de leads." },
      { role: "Gerente de Proyectos – Freelance", company: "Sankhya Gestão de Negócios", period: "Jun 2024 – Ago 2025 · Balneário Camboriú, SC", desc: "Implantación, integración y soporte a clientes. Ayudé a empresas a poner el ERP en producción real." },
      { role: "Analista de Sistemas", company: "Banana Brasil", period: "Feb 2023 – Oct 2024 · Jaraguá do Sul, SC", desc: "Gestión de base de datos, soporte al equipo, desarrollo de soluciones internas y automatización." },
      { role: "Analista de Sistemas", company: "AMC Têxtil", period: "Sep 2021 – Feb 2023 · Itajaí, SC", desc: "Puente entre operación y desarrollo: relevamiento de requisitos, seguimiento de proyectos y soporte del ERP." },
      { role: "Soporte Técnico de Sistema", company: "DB1 Group (Consignet)", period: "Nov 2020 – Sep 2021", desc: "Soporte de primera línea para sistema de crédito. Atención a usuarios y resolución de tickets bajo presión." },
      { role: "Administración – Consultoría Junior", company: "ICETI – Instituto Cesumar", period: "Ene 2018 – Ago 2019 · Maringá, PR", desc: "Administración de consultorías junior universitarias: proyectos organizados y equipos comprometidos." },
    ],
    education: [
      { degree: "Análisis y Desarrollo de Sistemas", school: "Universidade do Vale do Itajaí (UNIVALI)", period: "Jun 2024 – Dic 2026" },
      { degree: "Ingeniería de Software", school: "UniCesumar", period: "Ene 2021 – Sep 2022" },
    ],
  },
  zh: {
    subtitle: "高级业务分析师 · 项目经理 · 全栈开发者",
    printBtn: "↓ 保存为 PDF",
    hSummary: "职业简介",
    hExperience: "工作经历",
    hProjects: "项目作品集",
    hCerts: "认证证书",
    hEducation: "教育背景",
    verify: "验证",
    summary: "高级业务分析师，拥有 6 年技术经验，专注于系统集成、流程自动化和业务技术融合。擅长需求分析、ERP 实施和数据驱动决策。",
    experiences: [
      { role: "高级业务分析师 / 全栈开发者", company: "Printbag Embalagens", period: "2025年8月 – 至今", desc: "负责系统开发、自动化、集成、ERP 和电商平台建设，优化重复性流程并推动数字化转型。" },
      { role: "项目经理（自由职业）", company: "Rede Ufit Academia", period: "2025年8月 – 2025年10月", desc: "实施 AI 解决方案，自动化商业流程和线索获取，连接 WhatsApp、RD Station 和内部系统。" },
      { role: "项目经理（自由职业）", company: "Sankhya Gestão de Negócios", period: "2024年6月 – 2025年8月", desc: "负责 ERP 实施、集成与客户支持，帮助企业将系统从「项目模式」切换为日常生产运营。" },
      { role: "系统分析师", company: "Banana Brasil", period: "2023年2月 – 2024年10月", desc: "数据库管理、团队支持、内部系统开发和流程自动化。" },
      { role: "系统分析师", company: "AMC Têxtil", period: "2021年9月 – 2023年2月", desc: "连接业务运营与开发团队：需求收集、项目跟踪和 ERP 优化。" },
      { role: "系统技术支持", company: "DB1 Group (Consignet)", period: "2020年11月 – 2021年9月", desc: "薪资贷款系统的一线技术支持，处理用户工单和日常运营维护。" },
      { role: "行政管理 – 青年咨询", company: "ICETI – Instituto Cesumar", period: "2018年1月 – 2019年8月", desc: "管理大学青年咨询机构，组织项目并支持年轻领导力发展。" },
    ],
    education: [
      { degree: "系统分析与开发", school: "Universidade do Vale do Itajaí (UNIVALI)", period: "2024年6月 – 2026年12月" },
      { degree: "软件工程学士", school: "UniCesumar", period: "2021年1月 – 2022年9月" },
    ],
  },
  de: {
    subtitle: "Senior Business Analyst · Projektmanager · Full Stack Entwickler",
    printBtn: "↓ Als PDF speichern",
    hSummary: "Berufsprofil",
    hExperience: "Berufserfahrung",
    hProjects: "Portfolio-Projekte",
    hCerts: "Zertifizierungen",
    hEducation: "Ausbildung",
    verify: "verifizieren",
    summary: "Senior Business Analyst mit 6 Jahren Technologieerfahrung. Ich integriere Systeme, automatisiere manuelle Prozesse und sorge dafür, dass Technologie hilft statt hindert.",
    experiences: [
      { role: "Senior Business Analyst / Full Stack Entwickler", company: "Printbag Embalagens", period: "Aug 2025 – heute · Camboriú, SC", desc: "Systementwicklung, Automatisierung, Integrationen, ERP und E-Commerce. Chaotische Prozesse strukturieren, integrieren und optimieren." },
      { role: "Projektmanager – Freelance", company: "Rede Ufit Academia", period: "Aug 2025 – Okt 2025 · Itapema, SC", desc: "KI-Lösungen zur Automatisierung von Vertrieb und Lead-Generierung implementiert." },
      { role: "Projektmanager – Freelance", company: "Sankhya Gestão de Negócios", period: "Jun 2024 – Aug 2025 · Balneário Camboriú, SC", desc: "ERP-Implementierung, Integration und Kundensupport. Unternehmen in den Produktivbetrieb überführt." },
      { role: "Systemanalyst", company: "Banana Brasil", period: "Feb 2023 – Okt 2024 · Jaraguá do Sul, SC", desc: "Datenbankpflege, Teamunterstützung, interne Lösungsentwicklung und Prozessautomatisierung." },
      { role: "Systemanalyst", company: "AMC Têxtil", period: "Sep 2021 – Feb 2023 · Itajaí, SC", desc: "Schnittstelle zwischen Betrieb und Entwicklung: Anforderungsanalyse, Projektbegleitung und ERP-Support." },
      { role: "Technischer System-Support", company: "DB1 Group (Consignet)", period: "Nov 2020 – Sep 2021", desc: "Erstlinien-Support für ein Konsignatkreditsystem. Ticketbearbeitung und Betriebsstabilisierung." },
      { role: "Verwaltung – Junior-Consulting", company: "ICETI – Instituto Cesumar", period: "Jan 2018 – Aug 2019 · Maringá, PR", desc: "Verwaltung von Junior-Beratungseinheiten an der Universität." },
    ],
    education: [
      { degree: "Systemanalyse und -entwicklung", school: "Universidade do Vale do Itajaí (UNIVALI)", period: "Jun 2024 – Dez 2026" },
      { degree: "Bachelor in Software Engineering", school: "UniCesumar", period: "Jan 2021 – Sep 2022" },
    ],
  },
  ja: {
    subtitle: "シニアビジネスアナリスト · プロジェクトマネージャー · フルスタック開発者",
    printBtn: "↓ PDFとして保存",
    hSummary: "職務概要",
    hExperience: "職務経歴",
    hProjects: "ポートフォリオ",
    hCerts: "認定資格",
    hEducation: "学歴",
    verify: "確認する",
    summary: "テクノロジー業界6年のシニアビジネスアナリスト。システム統合、プロセス自動化、ERP実装を専門とし、ビジネスとテクノロジーの橋渡し役として価値ある成果を届けます。",
    experiences: [
      { role: "シニアビジネスアナリスト / フルスタック開発者", company: "Printbag Embalagens", period: "2025年8月 – 現在", desc: "システム開発、自動化、連携、ERPおよびEコマースを担当。複雑なプロセスを整理し自動化。" },
      { role: "プロジェクトマネージャー（フリーランス）", company: "Rede Ufit Academia", period: "2025年8月 – 2025年10月", desc: "AI ソリューションを実装して営業フローとリード獲得を自動化。" },
      { role: "プロジェクトマネージャー（フリーランス）", company: "Sankhya Gestão de Negócios", period: "2024年6月 – 2025年8月", desc: "ERP 導入・統合・顧客サポート。企業がERPを実運用へ移行できるよう支援。" },
      { role: "システムアナリスト", company: "Banana Brasil", period: "2023年2月 – 2024年10月", desc: "データベース管理、チームサポート、内部ソリューション開発、プロセス自動化。" },
      { role: "システムアナリスト", company: "AMC Têxtil", period: "2021年9月 – 2023年2月", desc: "運用部門と開発チームの橋渡し：要件定義、プロジェクト管理、ERPサポート。" },
      { role: "システムテクニカルサポート", company: "DB1 Group (Consignet)", period: "2020年11月 – 2021年9月", desc: "給与クレジットシステムの最前線サポート。ユーザー対応・チケット処理。" },
      { role: "管理部門 – ジュニアコンサルティング", company: "ICETI – Instituto Cesumar", period: "2018年1月 – 2019年8月", desc: "大学のジュニアコンサルティング組織の管理。" },
    ],
    education: [
      { degree: "システム分析・開発", school: "Universidade do Vale do Itajaí (UNIVALI)", period: "2024年6月 – 2026年12月" },
      { degree: "ソフトウェアエンジニアリング学士", school: "UniCesumar", period: "2021年1月 – 2022年9月" },
    ],
  },
};

/* ── Projects ───────────────────────────────────────────────────────────────── */
const PROJECTS: Project[] = [
  { title: "Press Kit Digital, LEVORATO DJ", year: 2025, tags: "HTML/CSS/JS · GitHub Pages · DJ · Booking", link: "https://levoratoo.github.io/presskitlevoratodj", desc: { pt: "Press kit digital com hero neon animado, timeline de trajetória, sets embeds, galeria com download e CTAs de booking.", en: "Digital press kit with animated neon hero, career timeline, embedded sets, downloadable gallery and booking CTAs.", es: "Press kit digital con hero neon, timeline, sets incrustados, galería y CTAs de booking.", zh: "数字宣传册：动态霓虹主图、职业时间线、曲目嵌入、可下载图库和预约功能。", de: "Digitales Press-Kit mit Neon-Hero, Karriere-Timeline, eingebetteten Sets, Galerie und Booking-CTAs.", ja: "ネオンヒーロー、タイムライン、セット埋め込み、ダウンロードギャラリー付きデジタルプレスキット。" } },
  { title: "Landing Page Printbag", year: 2026, tags: "Landing Page · Leads · EmailJS · N8N · GTM", link: "https://www.embalagensprintbag.com/", desc: { pt: "Landing page de conversão com formulário validado, EmailJS, webhook N8N e rastreamento GTM.", en: "Conversion landing page with validated form, EmailJS, N8N webhook and GTM tracking.", es: "Landing page de conversión con formulario, EmailJS, webhook N8N y seguimiento GTM.", zh: "转化型落地页，含表单验证、EmailJS、N8N Webhook 和 GTM 追踪。", de: "Conversion-Landingpage mit Formular, EmailJS, N8N-Webhook und GTM-Tracking.", ja: "フォーム検証・EmailJS・N8N Webhook・GTM追跡付きのコンバージョン LP。" } },
  { title: "Dona Çiça Hot Dog, Landing Page", year: 2026, tags: "React · Landing Page · WhatsApp", link: "https://levoratoo.github.io/donacicasite/", desc: { pt: "Site para food truck com cardápio interativo e integração WhatsApp.", en: "Food truck site with interactive menu and WhatsApp integration.", es: "Sitio para food truck con menú interactivo e integración WhatsApp.", zh: "餐车网站，含互动菜单和 WhatsApp 集成。", de: "Food-Truck-Website mit interaktivem Menü und WhatsApp-Integration.", ja: "インタラクティブメニューとWhatsApp連携付きフードトラックサイト。" } },
  { title: "New Talent – Site Institucional", year: 2026, tags: "React · Next.js · SEO · WhatsApp", link: "https://levoratoo.github.io/sitenewtalent/", desc: { pt: "Site institucional escola de DJ com três unidades, abas de produtos e conversão para WhatsApp.", en: "Institutional site for a DJ school with three units, product tabs and WhatsApp conversion.", es: "Sitio institucional escuela de DJ con tres unidades y conversión WhatsApp.", zh: "DJ学校官网，含三个校区、产品选项卡和 WhatsApp 转化功能。", de: "Institutionelle Website einer DJ-Schule mit drei Standorten und WhatsApp-Conversion.", ja: "3拠点展開のDJスクール公式サイト。WhatsApp誘導機能付き。" } },
  { title: "Dashboard de Análise de Pedidos e Estoque", year: 2023, tags: "Next.js · TypeScript · SQL Server", link: "https://levoratoo.github.io/estoqueemtemporeal/", desc: { pt: "Dashboard web para pedidos pendentes e estoque em tempo real, substituindo planilhas.", en: "Web dashboard for real-time pending orders and inventory, replacing spreadsheets.", es: "Dashboard web para pedidos pendientes e inventario en tiempo real.", zh: "实时采购订单和库存管理 Web 仪表板，替代电子表格。", de: "Web-Dashboard für Echtzeitbestellungen und Lagerbestand.", ja: "リアルタイム注文・在庫管理ダッシュボード。スプレッドシートを代替。" } },
  { title: "Sistema de Planejamento Orçamentário", year: 2026, tags: "Orçamento · Centros de Custo · Next.js", link: "https://levoratoo.github.io/orcamentario-custos/planejamento/", desc: { pt: "Controle orçamentário por centro de custo com fluxo de aprovação e comparativo previsto vs realizado.", en: "Budget control by cost center with approval workflow and planned vs. actual comparison.", es: "Control presupuestario por centro de costos con flujo de aprobación.", zh: "按成本中心进行预算控制，含审批流程和预算vs实际对比。", de: "Budgetkontrolle nach Kostenstellen mit Genehmigungsworkflow und Soll-Ist-Vergleich.", ja: "コストセンター別予算管理、承認ワークフローと計画vs実績比較付き。" } },
  { title: "Sistema Orçamentário, Produtos Gráficos", year: 2026, tags: "Orçamento · Wizard · Catálogo · Webhook", link: "https://levoratoo.github.io/orcamentoengenhariaprintbag/", desc: { pt: "Wizard guiado para orçamento de embalagens com catálogo técnico e dashboard de métricas.", en: "Guided wizard for packaging quotation with technical catalog and metrics dashboard.", es: "Wizard para cotización de embalajes con catálogo técnico y dashboard.", zh: "包装报价向导，含技术目录和指标仪表板。", de: "Geführter Assistent für Verpackungsangebote mit technischem Katalog.", ja: "包装見積もりウィザード。技術カタログと指標ダッシュボード付き。" } },
  { title: "Sistema de Monitoramento de Pedidos", year: 2026, tags: "Monitoramento · Real Time · SQL Server", link: "https://levoratoo.github.io/Middleware/", desc: { pt: "Dashboard com alertas e filtros dinâmicos para acompanhamento de pedidos em tempo real.", en: "Dashboard with alerts and dynamic filters for real-time order monitoring.", es: "Dashboard con alertas y filtros dinámicos para seguimiento de pedidos en tiempo real.", zh: "含实时告警和动态筛选的订单监控仪表板。", de: "Dashboard mit Echtzeit-Alerts und dynamischen Filtern.", ja: "リアルタイムアラートと動的フィルター付き注文監視ダッシュボード。" } },
  { title: "Sistema Interno de Chamados", year: 2026, tags: "Chamados · Teams · Next.js · SQL Server", link: "https://levoratoo.github.io/sistemas-de-chamado/", desc: { pt: "Sistema de gestão de chamados com integração Microsoft Teams e fluxo de aprovação.", en: "Internal ticketing system with Microsoft Teams integration and approval workflow.", es: "Sistema de gestión de tickets con integración Microsoft Teams.", zh: "内部工单系统，集成 Microsoft Teams 和审批流程。", de: "Internes Ticketsystem mit Microsoft Teams-Integration.", ja: "Microsoft Teams連携と承認フロー付き社内チケット管理システム。" } },
  { title: "Gestão da Produção Industrial, MES", year: 2026, tags: "MES · Produção · Pipeline · Next.js", link: "https://levoratoo.github.io/gestao-producao-industrial/", desc: { pt: "MES com pipeline de 7 etapas, apontamento, controle de qualidade e painel operacional.", en: "MES with 7-stage pipeline, production tracking, quality control and operational panel.", es: "MES con pipeline de 7 etapas, registro de producción y control de calidad.", zh: "MES系统，含7阶段流水线、生产记录、质量控制和运营面板。", de: "MES mit 7-Stufen-Pipeline, Produktionserfassung und Qualitätskontrolle.", ja: "7段階パイプライン・生産記録・品質管理付きMESシステム。" } },
];

const CERTS: Cert[] = [
  { name: "Talking to AI: Prompt Engineering for Project Managers", issuer: "PMI", url: "https://www.credly.com/badges/42894808-ab3a-4a94-8fe6-04ec2f22eda6/linked_in_profile", kind: "verify" },
  { name: "Generative AI Overview for Project Managers", issuer: "PMI", url: "https://www.credly.com/badges/db7faca4-8d3a-441c-bc13-b29bdd62255e/linked_in_profile", kind: "verify" },
  { name: "Practical Application of Gen AI for Project Managers", issuer: "PMI", url: "https://www.credly.com/badges/930f82eb-ea65-4de5-b3e6-987c218bf921/linked_in_profile", kind: "verify" },
  { name: "Scrum Fundamentals Certified (SFC™)", issuer: "SCRUMstudy", url: "https://www.scrumstudy.com/certification/verify?type=SFC&number=895606", kind: "verify" },
  { name: "Six Sigma Yellow Belt (SSYB™)", issuer: "6sigmastudy", url: "https://www.6sigmastudy.com/certification/verify?type=SSYB&number=1134705", kind: "verify" },
  { name: "Business Analysis Fundamentals with AI Certified", issuer: "SCRUMstudy", url: "https://c46e136a583f7e334124-ac22991740ab4ff17e21daf2ed577041.ssl.cf1.rackcdn.com/Certificate/BusinessAnalysisFundamentalswithAICertified-PedroHenriqueLevoratoFran%C3%A7a-1134709.pdf", kind: "pdf" },
  { name: "Kanban Essentials with AI Certified", issuer: "SCRUMstudy", url: "https://c46e136a583f7e334124-ac22991740ab4ff17e21daf2ed577041.ssl.cf1.rackcdn.com/Certificate/KanbanEssentialswithAICertified-PedroHenriqueLevoratoFran%C3%A7a-1134711.pdf", kind: "pdf" },
];

const VALID_LANGS: Lang[] = ["pt", "en", "es", "zh", "de", "ja"];

function normalizeLangParam(raw: string | null): Lang | null {
  if (raw == null || raw === "") return null;
  const v = raw.trim().toLowerCase();
  if (v === "pt-br" || v === "pt_br") return "pt";
  if (VALID_LANGS.includes(v as Lang)) return v as Lang;
  return null;
}

/**
 * Prioridade: ?lang= na URL → idioma ativo do app (LocaleProvider / seletor).
 * Alinhado ao padrão do site: abrir em português; o idioma do CV segue o seletor, não o localStorage antigo.
 */
function resolveLang(locale: Locale, searchParams: URLSearchParams): Lang {
  const fromUrl = normalizeLangParam(searchParams.get("lang"));
  if (fromUrl) return fromUrl;
  return locale as Lang;
}

/* ── CV Component ───────────────────────────────────────────────────────────── */
function CurriculoInner() {
  const { locale } = useLocale();
  const searchParams = useSearchParams();
  /** Sempre null no 1º render (SSR + hidratação), nunca ler searchParams no useState inicial, senão cliente e servidor divergem. */
  const [lang, setLang] = useState<Lang | null>(null);
  const printedRef = useRef(false);

  useEffect(() => {
    setLang(resolveLang(locale, searchParams));
  }, [locale, searchParams]);

  useEffect(() => {
    if (lang === null) return;
    if (printedRef.current) return;
    printedRef.current = true;
    const id = window.setTimeout(() => window.print(), 800);
    return () => window.clearTimeout(id);
  }, [lang]);

  if (lang === null) return null;

  const t = T[lang];

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: "Segoe UI", Arial, sans-serif; font-size: 11.5px; line-height: 1.6; color: #1a1a1a; background: #f4f4f4; }
        .cv { background: #fff; max-width: 820px; margin: 24px auto; padding: 40px 44px 36px; box-shadow: 0 4px 32px rgba(0,0,0,.12); }
        .cv-toolbar { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; margin-bottom: 28px; }
        .cv-toolbar-row { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; }
        .print-btn { display: flex; align-items: center; gap: 6px; margin-bottom: 0; background: #c0392b; color: #fff; border: none; border-radius: 999px; padding: 8px 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; cursor: pointer; }
        .print-btn:hover { background: #e74c3c; }
        header { border-bottom: 2px solid #c0392b; padding-bottom: 12px; margin-bottom: 20px; }
        header h1 { font-size: 22px; font-weight: 900; text-transform: uppercase; letter-spacing: .04em; }
        .subtitle { font-size: 12px; font-weight: 700; color: #c0392b; margin-top: 3px; }
        .contacts { display: flex; flex-wrap: wrap; gap: 6px 18px; margin-top: 8px; font-size: 10.5px; color: #555; }
        .contacts-highlight { color: #c0392b; }
        .contacts a { color: #c0392b; text-decoration: none; }
        .contacts a:hover { text-decoration: underline; }
        .cert-link { color: #c0392b; text-decoration: none; }
        .cert-link:hover { text-decoration: underline; }
        .cv-screen-only { }
        .cv-print-only { display: none; }
        section { margin-bottom: 20px; }
        h2 { font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: .28em; color: #c0392b; border-bottom: 1px solid #ddd; padding-bottom: 4px; margin-bottom: 12px; }
        .bio { font-size: 11.5px; line-height: 1.65; color: #333; }
        .exp-item { margin-bottom: 14px; }
        .exp-role { font-size: 13px; font-weight: 800; }
        .exp-sub { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; margin-top: 1px; }
        .exp-company { font-size: 11.5px; font-weight: 600; color: #c0392b; }
        .exp-period { font-size: 10px; color: #555; white-space: nowrap; }
        .exp-desc { margin-top: 5px; font-size: 11px; line-height: 1.6; color: #444; }
        .proj-item { border-left: 2px solid #c0392b; padding-left: 10px; margin-bottom: 10px; }
        .proj-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
        .proj-title { font-weight: 700; font-size: 11.5px; }
        .proj-meta { font-size: 10px; color: #555; white-space: nowrap; }
        .proj-desc { font-size: 11px; color: #444; margin-top: 2px; line-height: 1.5; }
        .proj-tags { font-size: 10px; color: #888; margin-top: 2px; }
        .proj-link { font-size: 10.5px; color: #c0392b; text-decoration: none; }
        .cert-item { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; margin-bottom: 7px; }
        .cert-name { font-weight: 600; font-size: 11.5px; }
        .cert-meta { font-size: 10.5px; color: #555; white-space: nowrap; display: flex; gap: 6px; }
        .edu-item { margin-bottom: 8px; }
        .edu-degree { font-weight: 700; font-size: 12px; }
        .edu-school { font-size: 11px; color: #c0392b; }
        .edu-period { font-size: 10px; color: #555; }
        footer { margin-top: 20px; padding-top: 10px; border-top: 1px solid #ddd; font-size: 9.5px; color: #aaa; text-align: center; }
        @media print {
          body { background: white; }
          .cv { box-shadow: none; margin: 0; padding: 0; max-width: 100%; }
          .cv-toolbar { display: none !important; }
          .print-btn { display: none !important; }
          .exp-item { page-break-inside: avoid; break-inside: avoid; }
          .cert-item,
          .proj-item {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .cert-meta { white-space: normal !important; }
          .cv-screen-only { display: none !important; }
          .cv-print-only { display: inline !important; }
          .cv .contacts span,
          .cv .proj-link,
          .cv footer { text-decoration: none !important; }
          @page { margin: 14mm 16mm; }
          [data-floating-lang-switcher],
          [data-floating-lang-switcher] * {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
            pointer-events: none !important;
            clip-path: inset(100%) !important;
            position: absolute !important;
            left: -99999px !important;
            z-index: -9999 !important;
          }
        }
      `}</style>

      <div className="cv">
        <div className="cv-toolbar">
          <div className="cv-toolbar-row">
            <button type="button" className="print-btn" onClick={() => window.print()}>{t.printBtn}</button>
            <Suspense fallback={null}>
              <LanguageSwitcher />
            </Suspense>
          </div>
        </div>

        <header>
          <h1>Pedro Henrique Levorato França</h1>
          <div className="subtitle">{t.subtitle}</div>
          <div className="contacts">
            <span>Itajaí, SC, Brasil</span>
            <span>(44) 9 8839-2703</span>
            <span className="cv-screen-only contacts-highlight">
              <a href="mailto:levorato157@gmail.com">levorato157@gmail.com</a>
            </span>
            <span className="cv-print-only contacts-highlight">levorato157@gmail.com</span>
            <span className="cv-screen-only contacts-highlight">
              <a href="https://www.linkedin.com/in/pedrolevorato/" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/pedrolevorato
              </a>
            </span>
            <span className="cv-print-only contacts-highlight">linkedin.com/in/pedrolevorato</span>
            <span className="cv-screen-only contacts-highlight">
              <a href="https://github.com/levoratoo" target="_blank" rel="noopener noreferrer">
                github.com/levoratoo
              </a>
            </span>
            <span className="cv-print-only contacts-highlight">github.com/levoratoo</span>
          </div>
        </header>

        <section>
          <h2>{t.hSummary}</h2>
          <p className="bio">{t.summary}</p>
        </section>

        <section>
          <h2>{t.hExperience}</h2>
          {t.experiences.map((e, i) => (
            <div className="exp-item" key={i}>
              <div className="exp-role">{e.role}</div>
              <div className="exp-sub">
                <span className="exp-company">{e.company}</span>
                <span className="exp-period">{e.period}</span>
              </div>
              <p className="exp-desc">{e.desc}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>{t.hProjects}</h2>
          {PROJECTS.map((p, i) => (
            <div className="proj-item" key={i}>
              <div className="proj-header">
                <span className="proj-title">{p.title}</span>
                <span className="proj-meta">{p.year}</span>
              </div>
              <div className="proj-desc">{p.desc[lang]}</div>
              <div className="proj-tags">{p.tags}</div>
              {p.link && (
                <>
                  <a
                    className="cv-screen-only proj-link"
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {p.link.replace(/^https?:\/\//, "")}
                  </a>
                  <span className="cv-print-only proj-link">{p.link.replace(/^https?:\/\//, "")}</span>
                </>
              )}
            </div>
          ))}
        </section>

        <section>
          <h2>{t.hCerts}</h2>
          {CERTS.map((c, i) => (
            <div className="cert-item" key={i}>
              <span className="cert-name">{c.name}</span>
              <span className="cert-meta">
                <span className="cv-screen-only">
                  {c.issuer}
                  {c.url ? (
                    <>
                      {" · "}
                      <a className="cert-link" href={c.url} target="_blank" rel="noopener noreferrer">
                        {t.verify}
                      </a>
                    </>
                  ) : null}
                </span>
                <span className="cv-print-only">{c.issuer}</span>
              </span>
            </div>
          ))}
        </section>

        <section>
          <h2>{t.hEducation}</h2>
          {t.education.map((e, i) => (
            <div className="edu-item" key={i}>
              <div className="edu-degree">{e.degree}</div>
              <div className="edu-school">{e.school}</div>
              <div className="edu-period">{e.period}</div>
            </div>
          ))}
        </section>

        <footer>
          Pedro Henrique Levorato França · Itajaí, SC, Brasil · (44) 9 8839-2703 · levorato157@gmail.com ·
          linkedin.com/in/pedrolevorato · github.com/levoratoo
        </footer>
      </div>
    </>
  );
}

export default function CurriculoPage() {
  return (
    <Suspense fallback={null}>
      <CurriculoInner />
    </Suspense>
  );
}
