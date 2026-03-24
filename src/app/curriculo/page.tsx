"use client";

import { useEffect } from "react";
import { experiences, certifications } from "@/data/about";
import { homeProjects } from "@/data/projects";

/* ─── Role translations (PT-BR fixed — CV sempre em português) ───────────── */
const rolesPt: Record<string, string> = {
  rolePrintbag: "Analista de Negócios Sênior / Desenvolvedor Full Stack",
  roleMusic: "Professor, Multi-instrumentista, DJ e Produtor",
  roleUfit: "Gerente de Projetos PJ",
  roleSankhya: "Gerente de Projetos",
  roleBanana: "Analista de Sistemas",
  roleAmc: "Analista de Projetos",
  roleDb1: "Suporte Técnico de Sistema",
  roleIceti: "Administração – Consultorias Júniores",
};

/* ─── Auto-print on mount + manual button ────────────────────────────────── */
function PrintButton() {
  useEffect(() => {
    // Give the page ~600ms to render fonts/layout before triggering the print dialog
    const id = window.setTimeout(() => window.print(), 600);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <button
      onClick={() => window.print()}
      className="no-print fixed right-6 top-6 z-50 flex items-center gap-2 rounded-full border border-red-600/60 bg-black px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-red-400 shadow-lg transition-all hover:bg-red-900/30 hover:text-white"
    >
      ↓ Salvar como PDF
    </button>
  );
}

/* ─── Section heading ─────────────────────────────────────────────────────── */
function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 border-b border-gray-700 pb-1 text-[11px] font-bold uppercase tracking-[0.28em] text-red-500">
      {children}
    </h2>
  );
}

export default function CurriculoPage() {
  return (
    <>
      {/* Global print styles injected via a <style> tag so they work in static export */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          a { color: #b91c1c !important; text-decoration: underline !important; }
          @page { margin: 15mm 18mm; }
        }
        @media screen {
          body { background: #0a0a0a; }
        }
      `}</style>

      <PrintButton />

      <main className="mx-auto max-w-[820px] px-8 py-12 font-sans text-[#e5e5e5] print:text-black">

        {/* ── Header ── */}
        <header className="mb-8">
          <h1 className="text-[28px] font-black uppercase tracking-tight text-white print:text-black">
            Pedro Henrique Levorato França
          </h1>
          <p className="mt-1 text-[13px] font-semibold text-red-400 print:text-red-700">
            Analista de Negócios Sênior · Desenvolvedor Full Stack
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-gray-400 print:text-gray-600">
            <span>Maringá – PR, Brasil</span>
            <a
              href="https://www.linkedin.com/in/pedrolevorato/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 underline print:text-red-700"
            >
              linkedin.com/in/pedrolevorato
            </a>
            <a
              href="https://github.com/levoratoo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 underline print:text-red-700"
            >
              github.com/levoratoo
            </a>
          </div>
        </header>

        {/* ── Resumo ── */}
        <section className="mb-7">
          <Heading>Resumo Profissional</Heading>
          <p className="text-[12.5px] leading-relaxed text-gray-300 print:text-gray-800">
            Analista de Negócios Sênior com alma de dev: pego o &ldquo;dá pra fazer?&rdquo; e devolvo em
            sistema funcionando. Atuo na intersecção entre negócio e tecnologia — mapeio processos,
            levanto requisitos e entrego soluções que geram impacto real em ERP, automação, BI e
            integrações. 4+ anos de experiência em empresas de diferentes setores, sempre com foco
            em eficiência e orientação a dados.
          </p>
        </section>

        {/* ── Experiência ── */}
        <section className="mb-7">
          <Heading>Experiência Profissional</Heading>
          <div className="space-y-4">
            {experiences
              .filter((e) => !e.isMusic)
              .map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    <span className="text-[13px] font-bold text-white print:text-black">
                      {exp.company}
                    </span>
                    <span className="text-[11px] text-gray-500 print:text-gray-600">
                      {exp.period}
                      {exp.current && " · atual"}
                    </span>
                  </div>
                  <p className="text-[12px] text-gray-400 print:text-gray-700">
                    {rolesPt[exp.roleKey] ?? exp.roleKey}
                  </p>
                </div>
              ))}
          </div>
        </section>

        {/* ── Projetos ── */}
        <section className="mb-7">
          <Heading>Projetos em Portfólio</Heading>
          <div className="space-y-3">
            {homeProjects.map((p) => {
              const accessLinks = (p as { accessLinks?: { label: string; url: string }[] }).accessLinks;
              return (
                <div key={p.slug} className="border-l-2 border-red-900 pl-3 print:border-red-700">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <span className="text-[12.5px] font-bold text-white print:text-black">
                      {p.title}
                    </span>
                    <span className="text-[10.5px] text-gray-500 print:text-gray-600">
                      {p.area} · {p.year} · {p.status}
                    </span>
                  </div>
                  {p.description && (
                    <p className="mt-0.5 text-[11.5px] leading-snug text-gray-400 print:text-gray-700">
                      {p.description}
                    </p>
                  )}
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
                    <span className="text-[10px] text-gray-600 print:text-gray-500">
                      {p.tags.slice(0, 4).join(" · ")}
                    </span>
                    {accessLinks && accessLinks.length > 0 && (
                      <a
                        href={accessLinks[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10.5px] text-red-400 underline print:text-red-700"
                      >
                        {accessLinks[0].url}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Certificações ── */}
        <section className="mb-7">
          <Heading>Certificações</Heading>
          <div className="space-y-2.5">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex flex-wrap items-baseline justify-between gap-x-3">
                <span className="text-[12.5px] font-semibold text-white print:text-black">
                  {cert.name}
                </span>
                <span className="flex items-center gap-2 text-[11px] text-gray-500 print:text-gray-600">
                  {cert.issuer}
                  {" · "}
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 underline print:text-red-700"
                  >
                    verificar
                  </a>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="mt-10 border-t border-gray-800 pt-4 text-[10px] text-gray-600 print:border-gray-300 print:text-gray-500">
          Gerado em {new Date().toLocaleDateString("pt-BR")} · portfolio.pedrolevorato.com.br
        </footer>
      </main>
    </>
  );
}
