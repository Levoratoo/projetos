import type { PreviewProject } from "@/data/projects";
import type { Locale } from "@/state/locale";

export type LocalizedPreview = {
  title: string;
  area: string;
  statusLabel: string;
  description?: string;
  bullets?: string[];
  tags: string[];
};

const STATUS: Record<PreviewProject["status"], Record<Locale, string>> = {
  Concluído: {
    pt: "Concluído",
    en: "Completed",
    es: "Completado",
    zh: "已完成",
    de: "Abgeschlossen",
    ja: "完了",
  },
  "Em produção": {
    pt: "Em produção",
    en: "In production",
    es: "En producción",
    zh: "生产中",
    de: "In Produktion",
    ja: "本番運用中",
  },
};

export function previewStatusLabel(
  status: PreviewProject["status"],
  locale: Locale
): string {
  return STATUS[status][locale];
}

/** Campos traduzidos do card/preview (PT vem dos dados em `projects.ts`). */
type Bundle = {
  title: string;
  area: string;
  description: string;
  bullets: string[];
  tags: string[];
};

type NonPt = Exclude<Locale, "pt">;

const BUNDLES: Record<string, Partial<Record<NonPt, Bundle>>> = {
  "dashboard-separacao-estoque": {
    en: {
      title: "Orders & stock analysis dashboard",
      area: "Operations",
      description:
        "Web dashboard for pending orders and live stock, replacing spreadsheets with an always up-to-date view.",
      bullets: [
        "Pending orders with balance-based status",
        "Line-item detail per order",
        "Stock by location, batch and expiry",
        "Filters and charts for quick analysis",
      ],
      tags: ["Dashboard", "Inventory", "Orders"],
    },
    es: {
      title: "Dashboard de análisis de pedidos y stock",
      area: "Operaciones",
      description:
        "Dashboard web para pedidos pendientes y stock en tiempo real, sustituyendo hojas de cálculo por una vista actualizada.",
      bullets: [
        "Pedidos pendientes con estado por saldo",
        "Detalle de ítems por pedido",
        "Stock por ubicación, lote y caducidad",
        "Filtros y gráficos para análisis rápido",
      ],
      tags: ["Dashboard", "Inventario", "Pedidos"],
    },
    zh: {
      title: "订单与库存分析看板",
      area: "运营",
      description:
        "用于待处理订单与实时库存的 Web 看板，用实时视图替代电子表格。",
      bullets: [
        "按余额显示待处理订单状态",
        "每条订单的明细行",
        "按库位、批次与效期的库存",
        "筛选与图表快速分析",
      ],
      tags: ["看板", "库存", "订单"],
    },
    de: {
      title: "Dashboard zur Auftrags- und Bestandsanalyse",
      area: "Operations",
      description:
        "Web-Dashboard für offene Aufträge und Echtzeitbestand – ersetzt Tabellenkalkulationen durch eine aktuelle Sicht.",
      bullets: [
        "Offene Aufträge mit Status nach Saldo",
        "Positionsdetails pro Auftrag",
        "Bestand nach Lagerplatz, Charge und MHD",
        "Filter und Diagramme für schnelle Analyse",
      ],
      tags: ["Dashboard", "Bestand", "Aufträge"],
    },
    ja: {
      title: "受注・在庫分析ダッシュボード",
      area: "オペレーション",
      description:
        "未処理受注とリアルタイム在庫のための Web ダッシュボード。表計算に代わる常に最新の一覧。",
      bullets: [
        "残高ベースのステータスで未処理受注を表示",
        "受注ごとの明細行",
        "ロケーション・ロット・期限別の在庫",
        "フィルダとチャートで素早く分析",
      ],
      tags: ["ダッシュボード", "在庫", "受注"],
    },
  },
  "planejamento-orcamentario-coordenador": {
    en: {
      title: "Coordinator budget planning system",
      area: "Finance",
      description:
        "Web system for budget planning and control by cost center, with approval flows, assumptions and forecast vs actual.",
      bullets: [
        "Budget scenarios with approval stages",
        "Cost-center management with permissions",
        "Assumptions and notes with history",
        "Forecast vs actual comparison",
      ],
      tags: ["Budget", "Cost centers", "Chart of accounts"],
    },
    es: {
      title: "Sistema de planificación presupuestaria por coordinador",
      area: "Finanzas",
      description:
        "Sistema web para planificación y control presupuestario por centro de coste, con flujo de aprobación, premisas y comparación previsto vs real.",
      bullets: [
        "Escenarios presupuestarios con etapas de aprobación",
        "Gestión por centro de coste con permisos",
        "Premisas y justificaciones con historial",
        "Comparación previsto vs realizado",
      ],
      tags: ["Presupuesto", "Centros de coste", "Plan de cuentas"],
    },
    zh: {
      title: "协调员预算编制系统",
      area: "财务",
      description:
        "按成本中心进行预算编制与控制的 Web 系统，含审批流、假设与预测对比实际。",
      bullets: [
        "带审批阶段的预算情景",
        "按成本中心与权限管理",
        "假设与备注及历史",
        "预测与实际对比",
      ],
      tags: ["预算", "成本中心", "会计科目表"],
    },
    de: {
      title: "Budgetplanungssystem nach Koordinator",
      area: "Finanzen",
      description:
        "Web-System für Budgetplanung und -steuerung nach Kostenstelle mit Freigaben, Annahmen und Plan-Ist-Vergleich.",
      bullets: [
        "Budgetszenarien mit Freigabestufen",
        "Kostenstellenverwaltung mit Berechtigungen",
        "Annahmen und Begründungen mit Historie",
        "Plan-Ist-Vergleich",
      ],
      tags: ["Budget", "Kostenstellen", "Kontenplan"],
    },
    ja: {
      title: "コーディネーター別予算計画システム",
      area: "財務",
      description:
        "コストセンター別の予算計画・管理、承認フロー、前提、予測と実績の比較を行う Web システム。",
      bullets: [
        "承認段階のある予算シナリオ",
        "権限付きコストセンター管理",
        "前提と履歴付きメモ",
        "予測と実績の比較",
      ],
      tags: ["予算", "コストセンター", "勘定科目"],
    },
  },
  "sistema-orcamentario-produtos-graficos": {
    en: {
      title: "Budget system, graphic products",
      area: "Engineering",
      description:
        "Internal web app to manage graphic product quote requests, centralizing creation and review.",
      bullets: [
        "Guided wizard with automatic validation",
        "Technical catalog with smart rules",
        "Configurable form for engineering",
        "Webhook integration and submission history",
        "Dashboard with metrics and comparisons",
      ],
      tags: ["Budget", "Graphic products", "Wizard", "Technical catalog"],
    },
    es: {
      title: "Sistema presupuestario, productos gráficos",
      area: "Ingeniería",
      description:
        "Aplicación web interna para gestionar solicitudes de presupuesto de productos gráficos, centralizando creación y análisis.",
      bullets: [
        "Asistente guiado con validación automática",
        "Catálogo técnico con reglas inteligentes",
        "Formulario configurable por ingeniería",
        "Integración webhook e historial de envíos",
        "Panel con métricas y comparativos",
      ],
      tags: ["Presupuesto", "Productos gráficos", "Asistente", "Catálogo técnico"],
    },
    zh: {
      title: "预算系统, 印刷品",
      area: "工程",
      description:
        "内部 Web 应用，管理印刷品报价申请，集中创建与审核。",
      bullets: [
        "带自动校验的引导式向导",
        "带智能规则的技术型录",
        "工程可配置表单",
        "Webhook 集成与提交历史",
        "指标与对比看板",
      ],
      tags: ["预算", "印刷品", "向导", "技术型录"],
    },
    de: {
      title: "Budgetsystem, grafische Produkte",
      area: "Engineering",
      description:
        "Interne Web-App zur Verwaltung von Angebotsanfragen für grafische Produkte – zentralisierte Erstellung und Prüfung.",
      bullets: [
        "Geführter Wizard mit automatischer Validierung",
        "Technischer Katalog mit Regeln",
        "Konfigurierbares Formular für Engineering",
        "Webhook-Integration und Versandhistorie",
        "Dashboard mit Kennzahlen und Vergleichen",
      ],
      tags: ["Budget", "Grafikprodukte", "Wizard", "Technischer Katalog"],
    },
    ja: {
      title: "予算システム, グラフィック製品",
      area: "エンジニアリング",
      description:
        "グラフィック製品の見積依頼を管理する社内 Web アプリ。作成とレビューを一元化。",
      bullets: [
        "自動検証付きウィザード",
        "ルール付き技術カタログ",
        "エンジニアリング向け設定フォーム",
        "Webhook 連携と送信履歴",
        "指標と比較のダッシュボード",
      ],
      tags: ["予算", "グラフィック", "ウィザード", "技術カタログ"],
    },
  },
  "monitoramento-pedidos-tempo-real": {
    en: {
      title: "Real-time order monitoring system",
      area: "Operations",
      description:
        "Live dashboard for processed orders and integrations, with advanced filters, error ranking and per-order technical detail.",
      bullets: [
        "Auto refresh (~3s) without full page reload",
        "Online/offline connection and sync indicator",
        "Filters by order, system type (SOR/CRM) and status",
        "Search inside sent/received XML payloads",
        "Metrics: totals, errors, success rate and failure ranking",
      ],
      tags: ["Real-time", "Orders", "Integrations", "Observability", "XML", "KPI", "Filters"],
    },
    es: {
      title: "Sistema de monitorización de pedidos en tiempo real",
      area: "Operaciones",
      description:
        "Panel en tiempo real para pedidos procesados e integraciones, con filtros avanzados, ranking de errores y detalle técnico por pedido.",
      bullets: [
        "Actualización automática cada ~3s sin recargar",
        "Indicador de conexión y sincronización",
        "Filtros por pedido, sistema (SOR/CRM) y estado",
        "Búsqueda en XML enviados y recibidos",
        "Métricas: totales, errores, tasa de éxito y ranking de fallos",
      ],
      tags: ["Tiempo real", "Pedidos", "Integraciones", "Observabilidad", "XML", "KPI", "Filtros"],
    },
    zh: {
      title: "实时订单监控系统",
      area: "运营",
      description:
        "已处理订单与集成的实时看板，含高级筛选、错误排行与按单技术明细。",
      bullets: [
        "约每 3 秒自动刷新，无需整页刷新",
        "在线/离线连接与同步指示",
        "按订单、系统类型(SOR/CRM)与状态筛选",
        "在收发的 XML 中搜索",
        "指标：总量、错误、成功率与失败排行",
      ],
      tags: ["实时", "订单", "集成", "可观测", "XML", "KPI", "筛选"],
    },
    de: {
      title: "Echtzeit-Auftragsüberwachung",
      area: "Operations",
      description:
        "Live-Dashboard für verarbeitete Aufträge und Integrationen mit Filtern, Fehlerranking und technischem Auftragsdetail.",
      bullets: [
        "Automatische Aktualisierung (~3s) ohne Reload",
        "Online/Offline- und Sync-Anzeige",
        "Filter nach Auftrag, Systemtyp (SOR/CRM) und Status",
        "Suche in gesendeten/empfangenen XML-Payloads",
        "Kennzahlen: Gesamt, Fehler, Erfolgsquote, Ranking",
      ],
      tags: ["Echtzeit", "Aufträge", "Integrationen", "Observability", "XML", "KPI", "Filter"],
    },
    ja: {
      title: "リアルタイム受注モニタリング",
      area: "オペレーション",
      description:
        "処理済み受注と連携のライブダッシュボード。高度なフィルタ、エラー順位、受注ごとの技術詳細。",
      bullets: [
        "約3秒ごとの自動更新（リロード不要）",
        "オンライン/オフラインと同期インジケータ",
        "受注番号、システム種別(SOR/CRM)、ステータスでフィルタ",
        "送受信 XML 内の検索",
        "件数、エラー、成功率、失敗ランキング",
      ],
      tags: ["リアルタイム", "受注", "連携", "可観測性", "XML", "KPI", "フィルタ"],
    },
  },
  "apresentador-projetos": {
    en: {
      title: "Internal project showcase",
      area: "Systems",
      description:
        "Interactive hub to present internal case studies with previews, visual narrative and centralized access.",
      bullets: [
        "Standardized cards with status and progress",
        "Quick preview via modal and fullscreen overlay",
        "Consistent visual story for stakeholders",
        "Structure ready for new cases",
      ],
      tags: ["Portfolio", "Frontend", "UX"],
    },
    es: {
      title: "Presentador de proyectos internos",
      area: "Sistemas",
      description:
        "Hub interactivo para presentar casos internos con vistas previas, narrativa visual y acceso centralizado.",
      bullets: [
        "Tarjetas estandarizadas con estado y progreso",
        "Vista previa rápida por modal y overlay a pantalla completa",
        "Narrativa visual coherente para stakeholders",
        "Estructura lista para nuevos casos",
      ],
      tags: ["Portafolio", "Frontend", "UX"],
    },
    zh: {
      title: "内部项目展示平台",
      area: "系统",
      description:
        "以预览、视觉叙事与集中访问展示内部案例的互动中心。",
      bullets: [
        "带状态与进度的标准化卡片",
        "通过模态与全屏叠加快速预览",
        "面向干系人的一致视觉叙事",
        "可扩展的新案例结构",
      ],
      tags: ["作品集", "前端", "UX"],
    },
    de: {
      title: "Internes Projekt-Showcase",
      area: "Systeme",
      description:
        "Interaktiver Hub für interne Case Studies mit Previews, visueller Story und zentralem Zugang.",
      bullets: [
        "Standardisierte Karten mit Status und Fortschritt",
        "Schnellvorschau per Modal und Vollbild-Overlay",
        "Einheitliche visuelle Story für Stakeholder",
        "Struktur für neue Cases",
      ],
      tags: ["Portfolio", "Frontend", "UX"],
    },
    ja: {
      title: "社内プロジェクト展示ハブ",
      area: "システム",
      description:
        "プレビュー、ビジュアルストーリー、一元アクセスで社内事例を紹介するインタラクティブハブ。",
      bullets: [
        "ステータスと進捗のカード標準化",
        "モーダルとフルスクリーンオーバーレイでクイックプレビュー",
        "ステークホルダー向けの一貫したビジュアル",
        "新規ケース向けの拡張可能な構造",
      ],
      tags: ["ポートフォリオ", "フロントエンド", "UX"],
    },
  },
  "sistema-chamados-portfolio-vivo": {
    en: {
      title: "Printbag internal ticketing system",
      area: "Systems",
      description:
        "Internal system to centralize cross-team requests with a single traceable flow.",
      bullets: [
        "Forms by type to reduce incomplete requests",
        "Queue by area/role with smart filters",
        "Kanban, dashboard, automatic SLA and notifications",
        "LDAP/SSO integration and 30+ modeled types",
      ],
      tags: ["Tickets", "SLA", "Kanban", "Dashboard", "LDAP/SSO"],
    },
    es: {
      title: "Sistema interno de tickets Printbag",
      area: "Sistemas",
      description:
        "Sistema interno para centralizar solicitudes entre áreas con un flujo único y trazable.",
      bullets: [
        "Formularios por tipo para reducir solicitudes incompletas",
        "Cola por área/perfil con filtros inteligentes",
        "Kanban, panel, SLA automático y notificaciones",
        "Integración LDAP/SSO y más de 30 tipos modelados",
      ],
      tags: ["Tickets", "SLA", "Kanban", "Dashboard", "LDAP/SSO"],
    },
    zh: {
      title: "Printbag 内部工单系统",
      area: "系统",
      description:
        "以单一可追溯流程集中跨团队请求的内部系统。",
      bullets: [
        "按类型表单减少不完整申请",
        "按区域/角色的队列与智能筛选",
        "看板、看板、自动 SLA 与通知",
        "LDAP/SSO 集成与 30+ 种类型",
      ],
      tags: ["工单", "SLA", "看板", "仪表板", "LDAP/SSO"],
    },
    de: {
      title: "Internes Ticket-System Printbag",
      area: "Systeme",
      description:
        "Internes System zur zentralen Erfassung von teamübergreifenden Anfragen mit einem nachvollziehbaren Flow.",
      bullets: [
        "Formulare nach Typ für vollständigere Anfragen",
        "Warteschlange nach Bereich/Rolle mit Filtern",
        "Kanban, Dashboard, SLA und Benachrichtigungen",
        "LDAP/SSO und über 30 modellierte Typen",
      ],
      tags: ["Tickets", "SLA", "Kanban", "Dashboard", "LDAP/SSO"],
    },
    ja: {
      title: "Printbag 社内チケットシステム",
      area: "システム",
      description:
        "部門横断の依頼を一元化し、トレース可能な単一フローで処理する社内システム。",
      bullets: [
        "タイプ別フォームで不完全な依頼を削減",
        "エリア/ロール別キューとスマートフィルタ",
        "カンバン、ダッシュボード、自動 SLA、通知",
        "LDAP/SSO 連携と30種以上のタイプ",
      ],
      tags: ["チケット", "SLA", "カンバン", "ダッシュボード", "LDAP/SSO"],
    },
  },
  "landing-page-printbag": {
    en: {
      title: "Printbag landing page",
      area: "Marketing",
      description:
        "Conversion-focused landing page to attract clients and qualified leads, not corporate brochureware.",
      bullets: [
        "Single-page structure built for sales action",
        "Validated form with visual feedback and parallel submit",
        "EmailJS + n8n webhook automation",
        "Conversion tracking via Google Tag Manager",
      ],
      tags: ["Landing page", "Leads", "Conversion", "EmailJS", "n8n webhook", "GTM"],
    },
    es: {
      title: "Landing Page Printbag",
      area: "Marketing",
      description:
        "Landing de conversión para atraer clientes y leads cualificados, sin enfoque institucional.",
      bullets: [
        "Estructura de una página orientada a la acción comercial",
        "Formulario validado con feedback visual y envío paralelo",
        "Integración EmailJS y webhook n8n",
        "Seguimiento de conversión con Google Tag Manager",
      ],
      tags: ["Landing", "Leads", "Conversión", "EmailJS", "Webhook n8n", "GTM"],
    },
    zh: {
      title: "Printbag 落地页",
      area: "营销",
      description:
        "以转化为目标的落地页，吸引客户与合格线索，而非机构介绍。",
      bullets: [
        "面向销售动作的单页结构",
        "带视觉反馈与并行提交的验证表单",
        "EmailJS 与 n8n webhook 自动化",
        "通过 Google Tag Manager 追踪转化",
      ],
      tags: ["落地页", "线索", "转化", "EmailJS", "n8n", "GTM"],
    },
    de: {
      title: "Printbag Landing Page",
      area: "Marketing",
      description:
        "Conversion-orientierte Landing Page für Kunden und qualifizierte Leads, kein reines Image-Portal.",
      bullets: [
        "Ein-Pager-Struktur für Vertriebsaktionen",
        "Validiertes Formular mit Feedback und Parallelversand",
        "EmailJS und n8n-Webhook-Automation",
        "Conversion-Tracking via Google Tag Manager",
      ],
      tags: ["Landing Page", "Leads", "Conversion", "EmailJS", "n8n", "GTM"],
    },
    ja: {
      title: "Printbag ランディングページ",
      area: "マーケティング",
      description:
        "顧客と質の高いリード獲得に特化したコンバージョン重視の LP（企業紹介サイトではない）。",
      bullets: [
        "営業アクション向けの単一ページ構成",
        "視覚的フィードバックと並行送信のバリデーション済みフォーム",
        "EmailJS と n8n ウェブフックの自動化",
        "Google Tag Manager でコンバージョン計測",
      ],
      tags: ["ランディング", "リード", "コンバージョン", "EmailJS", "n8n", "GTM"],
    },
  },
  "site-institucional-printbag": {
    en: {
      title: "Printbag corporate website",
      area: "Marketing",
      description:
        "Institutional front-end for Printbag: packaging manufacturer with ESG narrative, credibility (badges, brands) and a clear path from solutions to contact and store.",
      bullets: [
        "Hero with YouTube, overlay and CTAs; stats and certification badges",
        "About with timeline; Solutions with products, finishes and commercial benefits",
        "ESG, Privacy, Contact and Careers; link to loja.printbag.com.br",
        "Vite + React + TypeScript, Tailwind and shadcn/ui, Framer Motion, React Router, TanStack Query",
      ],
      tags: [
        "Corporate",
        "ESG",
        "Vite",
        "React",
        "Tailwind",
        "Framer Motion",
        "shadcn/ui",
        "GitHub Pages",
      ],
    },
    es: {
      title: "Sitio institucional Printbag",
      area: "Marketing",
      description:
        "Front institucional de Printbag: fabricante con narrativa ESG, credibilidad (sellos, marcas) y recorrido claro hacia contacto y tienda.",
      bullets: [
        "Hero con YouTube, overlay y CTAs; métricas y sellos de certificación",
        "Sobre con línea de tiempo; Soluciones con productos, acabados y ventajas",
        "ESG, Privacidad, Contacto y Trabaja con nosotros; enlace a loja.printbag.com.br",
        "Vite + React + TypeScript, Tailwind y shadcn/ui, Framer Motion, React Router, TanStack Query",
      ],
      tags: [
        "Institucional",
        "ESG",
        "Vite",
        "React",
        "Tailwind",
        "Framer Motion",
        "shadcn/ui",
        "GitHub Pages",
      ],
    },
    zh: {
      title: "Printbag 企业官网",
      area: "营销",
      description:
        "Printbag 机构站：包装制造商，ESG 叙事、可信度（徽章与客户品牌）以及从解决方案到联系与门店的清晰路径。",
      bullets: [
        "Hero：YouTube、遮罩与 CTA；数据与认证徽章",
        "关于：时间线；解决方案：产品、工艺与商业优势",
        "ESG、隐私、联系与招聘；链接 loja.printbag.com.br",
        "Vite + React + TypeScript、Tailwind 与 shadcn/ui、Framer Motion、React Router、TanStack Query",
      ],
      tags: ["企业站", "ESG", "Vite", "React", "Tailwind", "Framer Motion", "shadcn/ui", "GitHub Pages"],
    },
    de: {
      title: "Printbag Unternehmenswebsite",
      area: "Marketing",
      description:
        "Institutionelles Frontend für Printbag: Verpackungshersteller mit ESG-Narrativ, Glaubwürdigkeit (Siegel, Marken) und klarem Weg zu Kontakt und Shop.",
      bullets: [
        "Hero mit YouTube, Overlay und CTAs; Kennzahlen und Zertifikats-Siegel",
        "Über uns mit Zeitleiste; Lösungen mit Produkten, Veredelungen und Vorteilen",
        "ESG, Datenschutz, Kontakt und Karriere; Link zu loja.printbag.com.br",
        "Vite + React + TypeScript, Tailwind und shadcn/ui, Framer Motion, React Router, TanStack Query",
      ],
      tags: [
        "Institutionell",
        "ESG",
        "Vite",
        "React",
        "Tailwind",
        "Framer Motion",
        "shadcn/ui",
        "GitHub Pages",
      ],
    },
    ja: {
      title: "Printbag コーポレートサイト",
      area: "マーケティング",
      description:
        "Printbag のインストラクチャルフロント：包装メーカー、ESG ストーリー、信頼（バッジ・ブランド）、ソリューションから問い合わせ・店舗への明確な導線。",
      bullets: [
        "ヒーロー：YouTube、オーバーレイ、CTA；数値と認証バッジ",
        "会社案内：タイムライン；ソリューション：商品、加工、商業メリット",
        "ESG、プライバシー、採用・お問い合わせ；loja.printbag.com.br へリンク",
        "Vite + React + TypeScript、Tailwind と shadcn/ui、Framer Motion、React Router、TanStack Query",
      ],
      tags: [
        "コーポレート",
        "ESG",
        "Vite",
        "React",
        "Tailwind",
        "Framer Motion",
        "shadcn/ui",
        "GitHub Pages",
      ],
    },
  },
  "donacica-hot-dog": {
    en: {
      title: "Dona Ciça Hot Dog, landing page",
      area: "Marketing",
      description:
        "Dona Ciça’s landing page: own digital presence for credibility and direct conversion to iFood, with a real menu and strong mobile visuals.",
      bullets: [
        "Single goal: drive visitors to order on iFood (no own checkout).",
        "Hero with bold type, particles, gradient and CTAs to iFood, menu and WhatsApp.",
        "Tabbed menu with photos, ingredients and prices aligned with iFood.",
        "About the brand with real photo, 5.0 rating and footer links.",
        "React 19 + Vite 8 + Tailwind + Framer Motion; free GitHub Pages deploy.",
      ],
      tags: ["Landing page", "Conversion", "iFood", "React 19", "Vite", "Framer Motion", "GitHub Pages"],
    },
    es: {
      title: "Dona Ciça Hot Dog, landing page",
      area: "Marketing",
      description:
        "Landing de Dona Ciça: presencia digital propia para credibilidad y conversión directa a iFood, con menú real y fuerte impacto visual en móvil.",
      bullets: [
        "Objetivo único: llevar a pedir en iFood (sin checkout propio).",
        "Hero con tipografía fuerte, partículas, gradiente y CTAs a iFood, menú y WhatsApp.",
        "Menú en pestañas con fotos, ingredientes y precios alineados con iFood.",
        "Sobre la marca con foto real, nota 5.0 y enlaces en el pie.",
        "React 19 + Vite 8 + Tailwind + Framer Motion; deploy gratuito en GitHub Pages.",
      ],
      tags: ["Landing", "Conversión", "iFood", "React 19", "Vite", "Framer Motion", "GitHub Pages"],
    },
    zh: {
      title: "Dona Ciça 热狗, 落地页",
      area: "营销",
      description:
        "Dona Ciça 落地页：自有数字形象，建立信任并直接导向 iFood 下单，含真实菜单与强移动端视觉。",
      bullets: [
        "单一目标：引导在 iFood 下单（无自有结账）。",
        "Hero 粗体、粒子、渐变与指向 iFood、菜单、WhatsApp 的 CTA。",
        "与 iFood 对齐的标签页菜单、照片、配料与价格。",
        "关于品牌：真实照片、5.0 分与页脚链接。",
        "React 19 + Vite 8 + Tailwind + Framer Motion；GitHub Pages 免费部署。",
      ],
      tags: ["落地页", "转化", "iFood", "React 19", "Vite", "Framer Motion", "GitHub Pages"],
    },
    de: {
      title: "Dona Ciça Hot Dog, Landing Page",
      area: "Marketing",
      description:
        "Landing Page von Dona Ciça: eigene digitale Präsenz für Vertrauen und direkte Conversion zu iFood, mit echtem Menü und starker Mobile-Optik.",
      bullets: [
        "Ein Ziel: Besucher zu Bestellungen auf iFood führen (kein eigener Checkout).",
        "Hero mit starker Typo, Partikeln, Verlauf und CTAs zu iFood, Menü und WhatsApp.",
        "Menü in Tabs mit Fotos, Zutaten und Preisen wie bei iFood.",
        "Über die Marke mit echtem Foto, 5.0 und Footer-Links.",
        "React 19 + Vite 8 + Tailwind + Framer Motion; Deploy auf GitHub Pages.",
      ],
      tags: ["Landing Page", "Conversion", "iFood", "React 19", "Vite", "Framer Motion", "GitHub Pages"],
    },
    ja: {
      title: "Dona Ciça Hot Dog, ランディング",
      area: "マーケティング",
      description:
        "Dona Ciça の LP。信頼と iFood への直接コンバージョンのための独自のデジタルプレゼンス。実メニューとモバイルの強いビジュアル。",
      bullets: [
        "目的は iFood での注文（自前チェックアウトなし）。",
        "太字タイポ、パーティクル、グラデ、iFood・メニュー・WhatsApp への CTA。",
        "iFood に合わせたタブメニュー、写真、材料、価格。",
        "実写真、5.0 評価、フッターリンクでブランド紹介。",
        "React 19 + Vite 8 + Tailwind + Framer Motion；GitHub Pages 無料デプロイ。",
      ],
      tags: ["ランディング", "コンバージョン", "iFood", "React 19", "Vite", "Framer Motion", "GitHub Pages"],
    },
  },
  "new-talent": {
    en: {
      title: "New Talent, institutional site",
      area: "Marketing",
      description:
        "New Talent institutional landing: DJ school, production and rental, stage look, single page, product tabs, three locations and WhatsApp conversion.",
      bullets: [
        "Hero with animation, particles (canvas) and electronic/studio look.",
        "Courses, tabbed products (DJ, music production, rental) and history per city.",
        "Fixed menu, mobile, smooth scroll, micro-animations and hero counter.",
        "Multiple CTAs + floating WhatsApp + Instagram; SEO and Open Graph.",
        "Stack: semantic HTML, CSS variables, vanilla JS; static GitHub Pages deploy.",
      ],
      tags: ["Landing page", "HTML/CSS/JS", "GitHub Pages", "WhatsApp", "DJ", "Mobile first"],
    },
    es: {
      title: "New Talent, sitio institucional",
      area: "Marketing",
      description:
        "Landing institucional de New Talent: escuela de DJ, producción y alquiler, look de escenario, una página, pestañas de productos, tres sedes y conversión a WhatsApp.",
      bullets: [
        "Hero con animación, partículas (canvas) y estética electrónica/estudio.",
        "Cursos, productos en pestañas (DJ, producción, alquiler) e historia por ciudad.",
        "Menú fijo, mobile, scroll suave, microanimaciones y contador en el hero.",
        "Varios CTAs + WhatsApp flotante + Instagram; SEO y Open Graph.",
        "Stack: HTML semántico, CSS con variables, JS vanilla; deploy estático en GitHub Pages.",
      ],
      tags: ["Landing", "HTML/CSS/JS", "GitHub Pages", "WhatsApp", "DJ", "Mobile first"],
    },
    zh: {
      title: "New Talent, 机构站",
      area: "营销",
      description:
        "New Talent 机构落地页：DJ 学校、制作与租赁, 舞台感、单页、产品标签、三地点与 WhatsApp 转化。",
      bullets: [
        "Hero 动效、粒子(canvas)、电子/工作室视觉。",
        "课程、标签页产品（DJ、音乐制作、租赁）与按城市历史。",
        "固定菜单、移动端、平滑滚动、微动效与 Hero 计数器。",
        "多 CTA + 悬浮 WhatsApp + Instagram；SEO 与 Open Graph。",
        "语义化 HTML、CSS 变量、原生 JS；GitHub Pages 静态部署。",
      ],
      tags: ["落地页", "HTML/CSS/JS", "GitHub Pages", "WhatsApp", "DJ", "Mobile first"],
    },
    de: {
      title: "New Talent, institutional site",
      area: "Marketing",
      description:
        "Institutionelle Landing Page von New Talent: DJ-Schule, Produktion und Vermietung, Bühnenlook, One-Pager, Produkt-Tabs, drei Standorte und WhatsApp-Conversion.",
      bullets: [
        "Hero mit Animation, Partikeln (Canvas) und elektro-/Studio-Look.",
        "Kurse, Tabs für DJ/Produktion/Vermietung und Historie pro Stadt.",
        "Fixes Menü, Mobile, Smooth Scroll, Micro-Animationen und Hero-Zähler.",
        "Mehrere CTAs, schwebendes WhatsApp, Instagram; SEO und Open Graph.",
        "Semantisches HTML, CSS-Variablen, Vanilla-JS; statisches Hosting auf GitHub Pages.",
      ],
      tags: ["Landing Page", "HTML/CSS/JS", "GitHub Pages", "WhatsApp", "DJ", "Mobile first"],
    },
    ja: {
      title: "New Talent, インサイト",
      area: "マーケティング",
      description:
        "New Talent のインサイト：DJ スクール、制作、レンタル, ステージ風のビジュアル、1ページ、タブ、3拠点、WhatsApp へのコンバージョン。",
      bullets: [
        "アニメーション、パーティクル(canvas)、エレクトロ/スタジオ風ビジュアル。",
        "コース、タブ（DJ・制作・レンタル）、都市別の沿革。",
        "固定メニュー、モバイル、スムスクロール、マイクロアニメ、ヒーローカウンター。",
        "複数 CTA、浮遊 WhatsApp、Instagram；SEO と OGP。",
        "セマンティック HTML、CSS 変数、バニラ JS；GitHub Pages 静的配信。",
      ],
      tags: ["ランディング", "HTML/CSS/JS", "GitHub Pages", "WhatsApp", "DJ", "Mobile first"],
    },
  },
  "previsao-demanda-python-estatistica": {
    en: {
      title: "Demand forecasting (Python + statistics)",
      area: "Operations",
      description:
        "Platform with two fronts: Python pipeline execution and executive readout of consolidated statistical forecasts.",
      bullets: [
        "Async upload and execution with per-job history and logs",
        "End-to-end lifecycle status with audit trail",
        "Paginated executive analytics by module",
        "Debounced filters and intuitive drill-down",
      ],
      tags: ["Forecasting", "Python", "Statistics", "Jobs", "Analytics"],
    },
    es: {
      title: "Previsión de demanda (Python + estadística)",
      area: "Operaciones",
      description:
        "Plataforma con dos frentes: ejecución del pipeline Python y lectura ejecutiva de la previsión estadística consolidada.",
      bullets: [
        "Carga y ejecución asíncronas con historial y log por job",
        "Estado del ciclo de vida con trazabilidad",
        "Analítica ejecutiva paginada por módulos",
        "Debounce, filtros y drill-down intuitivo",
      ],
      tags: ["Previsión", "Python", "Estadística", "Jobs", "Analytics"],
    },
    zh: {
      title: "需求预测（Python + 统计）",
      area: "运营",
      description:
        "双前端平台：Python 管道执行与合并统计预测的执行层阅读。",
      bullets: [
        "异步上传与执行，带每任务历史与日志",
        "端到端生命周期状态与审计轨迹",
        "按模块分页的执行层分析",
        "防抖、筛选与直观下钻",
      ],
      tags: ["预测", "Python", "统计", "任务", "分析"],
    },
    de: {
      title: "Bedarfsprognose (Python + Statistik)",
      area: "Operations",
      description:
        "Plattform mit zwei Bereichen: Ausführung der Python-Pipeline und Management-Readout der konsolidierten Statistikprognose.",
      bullets: [
        "Asynchroner Upload und Lauf mit Job-Historie und Logs",
        "Lifecycle-Status mit Audit-Trail",
        "Seitenweise Executive-Analytics pro Modul",
        "Debounce, Filter und intuitives Drill-down",
      ],
      tags: ["Prognose", "Python", "Statistik", "Jobs", "Analytics"],
    },
    ja: {
      title: "需要予測（Python + 統計）",
      area: "オペレーション",
      description:
        "二つのフロント：Python パイプライン実行と、統合された統計予測の経営向け読み取り。",
      bullets: [
        "ジョブ単位の履歴とログ付き非同期アップロードと実行",
        "エンドツーエンドのライフサイクルと監査トレイル",
        "モジュール別のページング済みエグゼクティブ分析",
        "デバウンス、フィルタ、直感的なドリルダウン",
      ],
      tags: ["予測", "Python", "統計", "ジョブ", "分析"],
    },
  },
  "gestao-producao-industrial-mes": {
    en: {
      title: "Industrial production management (MES)",
      area: "Operations",
      description:
        "Command center for the textile factory: work orders from design to shipping, with panels, risk alerts, workflow and predictable simulation, Next.js or remote mode with Express, PostgreSQL and SSE.",
      bullets: [
        "Full flow from design, cutting, printing, quality, dispatch, billing to shipping.",
        "Panels with filters; SLA/document/dock alerts; exception actions.",
        "Deterministic simulation; orders start at the beginning and advance in cadence.",
        "Stack: Next.js/React + TS, Node/Express + PostgreSQL, SSE and polling fallback; domain tests.",
      ],
      tags: ["MES", "Production", "SSE", "Workflow", "Alerts", "Textile"],
    },
    es: {
      title: "Gestión de producción industrial (MES)",
      area: "Operaciones",
      description:
        "Centro de comando de la fábrica textil: OPs del diseño al embarque, con paneles, alertas de riesgo, workflow y simulación previsible, Next.js o modo remoto con Express, PostgreSQL y SSE.",
      bullets: [
        "Flujo completo: diseño, corte, estampación, calidad, expedición, facturación, embarque.",
        "Paneles con filtros; alertas SLA/documento/muelle; acciones de excepción.",
        "Simulación determinística; OPs nacen al inicio y avanzan en cadencia.",
        "Stack: Next.js/React + TS, Node/Express + PostgreSQL, SSE y polling de respaldo; pruebas de dominio.",
      ],
      tags: ["MES", "Producción", "SSE", "Workflow", "Alertas", "Textil"],
    },
    zh: {
      title: "工业生产管理（MES）",
      area: "运营",
      description:
        "纺织厂指挥中心：从设计到发货的工单，含面板、风险告警、工作流与可预测仿真, Next.js 或 Express + PostgreSQL + SSE 远程模式。",
      bullets: [
        "全流程：设计、裁剪、印花、质检、发运、开票、装船。",
        "带筛选的面板；SLA/单证/月台告警；异常处理。",
        "确定性仿真；工单从起点按节拍推进。",
        "技术栈：Next.js/React + TS，Node/Express + PostgreSQL，SSE 与轮询回退；领域测试。",
      ],
      tags: ["MES", "生产", "SSE", "工作流", "告警", "纺织"],
    },
    de: {
      title: "Industrielle Produktionssteuerung (MES)",
      area: "Operations",
      description:
        "Kommandozentrale der Textilfabrik: Aufträge vom Entwurf bis zur Auslieferung, mit Panels, Risikoalarmen, Workflow und Simulation, Next.js oder Remote mit Express, PostgreSQL und SSE.",
      bullets: [
        "Gesamter Flow: Entwurf, Zuschnitt, Druck, Qualität, Versand, Abrechnung, Ladung.",
        "Panels mit Filtern; SLA-/Dokument-/Dock-Alarme; Ausnahmeaktionen.",
        "Deterministische Simulation; Aufträge starten und laufen im Takt.",
        "Stack: Next.js/React + TS, Node/Express + PostgreSQL, SSE und Polling-Fallback; Domain-Tests.",
      ],
      tags: ["MES", "Produktion", "SSE", "Workflow", "Alerts", "Textil"],
    },
    ja: {
      title: "生産管理（MES）",
      area: "オペレーション",
      description:
        "テキスタイル工場の司令塔：設計から出荷までのオーダ、パネル、リスクアラート、ワークフロー、再現可能なシミュレーション, Next.js または Express + PostgreSQL + SSE のリモートモード。",
      bullets: [
        "設計・裁断・プリント・品質・出荷・請求・積み込みまでのフルフロー。",
        "フィルタ付きパネル；SLA/ドック/ドキュメントの警告；例外アクション。",
        "決定論的シミュレーション；オーダは先頭からテンポで進行。",
        "スタック：Next.js/React + TS、Node/Express + PostgreSQL、SSE とポーリングフォールバック；ドメインテスト。",
      ],
      tags: ["MES", "生産", "SSE", "ワークフロー", "アラート", "テキスタイル"],
    },
  },
  "press-kit-levorato-dj": {
    en: {
      title: "Digital press kit, LEVORATO DJ",
      area: "Marketing",
      description:
        "Full digital press kit for DJ Pedro Levorato, neon hero, career timeline, embedded sets, gallery with download and booking CTAs in one public URL.",
      bullets: [
        "Hero with animated particles (180 JS instances) and strong neon identity.",
        "Interactive timeline with three chapters: 2011, 2022 and 2025.",
        "Infinite venue carousel + music section with SoundCloud / Spotify tabs.",
        "High-quality gallery with single downloads and .zip bundle.",
        "Booking via WhatsApp, Instagram and email; 5 responsive breakpoints.",
        "Stack: HTML5, CSS3 with @keyframes, vanilla JS, Intersection Observer; GitHub Pages.",
      ],
      tags: ["Press kit", "HTML/CSS/JS", "GitHub Pages", "DJ", "Booking", "Music"],
    },
    es: {
      title: "Press kit digital, LEVORATO DJ",
      area: "Marketing",
      description:
        "Press kit digital completo para el DJ Pedro Levorato, hero neón, línea de tiempo, sets embebidos, galería con descarga y CTAs de booking en una sola URL pública.",
      bullets: [
        "Hero con partículas animadas (180 instancias JS) e identidad neón fuerte.",
        "Línea de tiempo interactiva con tres capítulos: 2011, 2022 y 2025.",
        "Carrusel infinito de venues + música con pestañas SoundCloud / Spotify.",
        "Galería en alta calidad con descargas individuales y paquete .zip.",
        "Booking por WhatsApp, Instagram y correo; 5 breakpoints responsivos.",
        "Stack: HTML5, CSS3 con @keyframes, JS vanilla, Intersection Observer; GitHub Pages.",
      ],
      tags: ["Press kit", "HTML/CSS/JS", "GitHub Pages", "DJ", "Booking", "Música"],
    },
    zh: {
      title: "数字宣传资料, LEVORATO DJ",
      area: "营销",
      description:
        "DJ Pedro Levorato 的完整数字宣传资料, 霓虹 Hero、职业时间线、嵌入 set、可下载图库与预订 CTA，单一公开 URL。",
      bullets: [
        "带动画粒子（180 个 JS 实例）与强霓虹识别。",
        "互动时间线三章：2011、2022、2025。",
        "无限场馆轮播 + SoundCloud / Spotify 标签页音乐区。",
        "高质量图库，单张下载与 ZIP 包。",
        "WhatsApp、Instagram、邮件预订；5 个响应式断点。",
        "技术栈：HTML5、CSS3 @keyframes、原生 JS、Intersection Observer；GitHub Pages。",
      ],
      tags: ["宣传资料", "HTML/CSS/JS", "GitHub Pages", "DJ", "预订", "音乐"],
    },
    de: {
      title: "Digitales Presskit, LEVORATO DJ",
      area: "Marketing",
      description:
        "Vollständiges digitales Presskit für DJ Pedro Levorato, Neon-Hero, Karriere-Timeline, eingebettete Sets, Galerie mit Download und Booking-CTAs unter einer öffentlichen URL.",
      bullets: [
        "Hero mit animierten Partikeln (180 JS-Instanzen) und starker Neon-Identität.",
        "Interaktive Timeline mit drei Kapiteln: 2011, 2022 und 2025.",
        "Endloses Venue-Karussell + Musikbereich mit SoundCloud-/Spotify-Tabs.",
        "Hochwertige Galerie mit Einzeldownloads und .zip-Paket.",
        "Booking via WhatsApp, Instagram und E-Mail; 5 responsive Breakpoints.",
        "Stack: HTML5, CSS3 mit @keyframes, Vanilla-JS, Intersection Observer; GitHub Pages.",
      ],
      tags: ["Presskit", "HTML/CSS/JS", "GitHub Pages", "DJ", "Booking", "Musik"],
    },
    ja: {
      title: "デジタルプレスキット, LEVORATO DJ",
      area: "マーケティング",
      description:
        "DJ Pedro Levorato 向けの完全デジタルプレスキット, ネオンヒーロー、キャリアタイムライン、埋め込みセット、ダウンロード付きギャラリーとブッキング CTA を1つの公開 URL に。",
      bullets: [
        "アニメーション粒子（JS 180 インスタンス）と強いネオンアイデンティティ。",
        "2011 / 2022 / 2025 の3章インタラクティブタイムライン。",
        "無限会場カルーセル + SoundCloud / Spotify タブの楽曲セクション。",
        "高品質ギャラリー、個別ダウンロードと .zip。",
        "WhatsApp、Instagram、メールでブッキング；5 ブレークポイント。",
        "スタック：HTML5、@keyframes CSS3、バニラ JS、Intersection Observer；GitHub Pages。",
      ],
      tags: ["プレスキット", "HTML/CSS/JS", "GitHub Pages", "DJ", "ブッキング", "音楽"],
    },
  },
  "claymoon-press-kit": {
    en: {
      title: "ClayMoon.music, Digital press kit",
      area: "Marketing",
      description:
        "Static press kit for ClayMoon.music: one URL with story, light media, sets, downloads and booking — Tech House / Minimal Deep Tech, European positioning and six languages.",
      bullets: [
        "One link for bookers and promoters: bio, story, sound, photos and contact.",
        "Hero with particles, chapter timeline, About and Media (carousel on mobile).",
        "Stage presence, gallery with downloads, sets and SoundCloud embedded in the layout.",
        "Booking via WhatsApp, Instagram and email; i18n with centralized JS keys.",
        "Static stack on GitHub Pages; video and images tuned for weight and compatibility.",
      ],
      tags: ["Press kit", "Marketing", "Static site", "GitHub Pages", "Music", "i18n", "Mobile first"],
    },
    es: {
      title: "ClayMoon.music, Press kit digital",
      area: "Marketing",
      description:
        "Press kit estático para ClayMoon.music: una URL con narrativa, media ligera, sets, descargas y booking — Tech House / Minimal Deep Tech, enfoque europeo y seis idiomas.",
      bullets: [
        "Un solo enlace para bookers y promotores: bio, historia, sonido, fotos y contacto.",
        "Hero con partículas, timeline por capítulos, Sobre y Mídia (carrusel en móvil).",
        "Presencia en cabina, galería con descargas, sets y SoundCloud integrados.",
        "Booking por WhatsApp, Instagram y correo; i18n con claves centralizadas en JS.",
        "Stack estático en GitHub Pages; vídeo e imágenes pensados para peso y compatibilidad.",
      ],
      tags: ["Press kit", "Marketing", "Sitio estático", "GitHub Pages", "Música", "i18n", "Mobile first"],
    },
    zh: {
      title: "ClayMoon.music，数字宣传资料",
      area: "营销",
      description:
        "ClayMoon.music 的静态宣传资料：单一 URL 呈现叙事、轻量媒体、set、下载与预订 — Tech House / Minimal Deep Tech、欧洲定位与六种语言。",
      bullets: [
        "为预订方与推广方提供单一链接：简介、故事、声音、照片与联系方式。",
        "粒子 Hero、分章时间线、关于与媒体区（移动端轮播）。",
        "舞台足迹、可下载图库、嵌入布局的 set 与 SoundCloud。",
        "通过 WhatsApp、Instagram、邮件预订；i18n 使用集中式 JS 键。",
        "GitHub Pages 静态托管；针对体积与兼容性优化视频与图片。",
      ],
      tags: ["宣传资料", "营销", "静态网站", "GitHub Pages", "音乐", "i18n", "移动优先"],
    },
    de: {
      title: "ClayMoon.music, Digitales Presskit",
      area: "Marketing",
      description:
        "Statisches Presskit für ClayMoon.music: eine URL mit Story, leichten Medien, Sets, Downloads und Booking — Tech House / Minimal Deep Tech, europäische Ausrichtung und sechs Sprachen.",
      bullets: [
        "Ein Link für Booker und Promoter: Bio, Geschichte, Sound, Fotos und Kontakt.",
        "Hero mit Partikeln, Kapitel-Timeline, Über- und Medienbereich (Karussell auf dem Handy).",
        "Bühnenpräsenz, Galerie mit Downloads, eingebettete Sets und SoundCloud.",
        "Booking via WhatsApp, Instagram und E-Mail; i18n mit zentralisierten JS-Keys.",
        "Statischer Stack auf GitHub Pages; Video und Bilder auf Gewicht und Kompatibilität abgestimmt.",
      ],
      tags: ["Presskit", "Marketing", "Statische Site", "GitHub Pages", "Musik", "i18n", "Mobile first"],
    },
    ja: {
      title: "ClayMoon.music、デジタルプレスキット",
      area: "マーケティング",
      description:
        "ClayMoon.music 向け静的プレスキット：ストーリー、軽量メディア、セット、ダウンロードとブッキングを1つの URL に — Tech House / Minimal Deep Tech、ヨーロッパ志向、6言語。",
      bullets: [
        "ブッカーとプロモーター向けの単一リンク：経歴、ストーリー、音源、写真と連絡先。",
        "パーティクル Hero、章立てタイムライン、概要とメディア（モバイルはカルーセル）。",
        "ステージ実績、ダウンロード付きギャラリー、レイアウトに埋め込んだセットと SoundCloud。",
        "WhatsApp、Instagram、メールでブッキング；集中管理した JS キーで i18n。",
        "GitHub Pages の静的スタック；動画と画像は容量と互換性を考慮。",
      ],
      tags: ["プレスキット", "マーケティング", "静的サイト", "GitHub Pages", "音楽", "i18n", "モバイルファースト"],
    },
  },
};

export function getLocalizedPreview(
  project: PreviewProject,
  locale: Locale
): LocalizedPreview {
  const statusLabel = previewStatusLabel(project.status, locale);
  if (locale === "pt") {
    return {
      title: project.title,
      area: project.area,
      statusLabel,
      description: project.description,
      bullets: project.bullets,
      tags: project.tags,
    };
  }
  const row = BUNDLES[project.slug];
  const bundle = row?.[locale as NonPt] ?? row?.en;
  if (!bundle) {
    return {
      title: project.title,
      area: project.area,
      statusLabel,
      description: project.description,
      bullets: project.bullets,
      tags: project.tags,
    };
  }
  return {
    title: bundle.title,
    area: bundle.area,
    statusLabel,
    description: bundle.description,
    bullets: bundle.bullets,
    tags: bundle.tags,
  };
}
