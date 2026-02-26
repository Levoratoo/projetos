import { Tag } from "@/components/Tag";
import type { ReactNode } from "react";
import { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { AccessLinkCard } from "@/components/case/AccessLinkCard";

type CaseSidebarProps = {
  stack: Project["stack"];
  kpis: Project["kpis"];
  nextSteps: Project["nextSteps"];
  confidentialityNote?: Project["confidentialityNote"];
  links?: Project["links"];
  accessUrl?: string;
};

export function CaseSidebar({
  stack,
  kpis,
  nextSteps,
  confidentialityNote,
  links,
  accessUrl
}: CaseSidebarProps) {
  return (
    <div>
      <div className="hidden space-y-4 lg:sticky lg:top-24 lg:block">
        {accessUrl ? <AccessLinkCard url={accessUrl} /> : null}
        <SidebarCard title="Stack e integrações">
          <div className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <Tag key={item} label={item} />
            ))}
          </div>
        </SidebarCard>
        <SidebarCard title="Indicadores">
          <div className="space-y-3 text-sm text-neutral-300">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="flex items-center justify-between">
                <span>{kpi.label}</span>
                <span className="text-glow">{kpi.value}</span>
              </div>
            ))}
          </div>
        </SidebarCard>
        <SidebarCard title="Próximos passos">
          <ul className="space-y-2 text-sm text-neutral-300">
            {nextSteps.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SidebarCard>
        {confidentialityNote ? (
          <SidebarCard title="Nota de confidencialidade">
            <p className="text-sm text-neutral-300">{confidentialityNote}</p>
          </SidebarCard>
        ) : null}
        {links && links.length > 0 ? (
          <SidebarCard title="Links">
            <div className="space-y-2 text-sm">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-glow/70 transition duration-200 hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </SidebarCard>
        ) : null}
      </div>

      <div className="space-y-3 lg:hidden">
        <SidebarAccordion title="Stack e integrações" defaultOpen>
          <div className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <Tag key={item} label={item} />
            ))}
          </div>
        </SidebarAccordion>
        <SidebarAccordion title="Indicadores">
          <div className="space-y-3 text-sm text-neutral-300">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="flex items-center justify-between">
                <span>{kpi.label}</span>
                <span className="text-glow">{kpi.value}</span>
              </div>
            ))}
          </div>
        </SidebarAccordion>
        <SidebarAccordion title="Próximos passos">
          <ul className="space-y-2 text-sm text-neutral-300">
            {nextSteps.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-glow" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SidebarAccordion>
        {confidentialityNote ? (
          <SidebarAccordion title="Nota de confidencialidade">
            <p className="text-sm text-neutral-300">{confidentialityNote}</p>
          </SidebarAccordion>
        ) : null}
        {links && links.length > 0 ? (
          <SidebarAccordion title="Links">
            <div className="space-y-2 text-sm">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-glow/70 transition duration-200 hover:text-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </SidebarAccordion>
        ) : null}
      </div>
    </div>
  );
}

function SidebarCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-neutral-900/30 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-glow/30 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
      <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-400">
        {title}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function SidebarAccordion({
  title,
  children,
  defaultOpen
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      className={cn(
        "group rounded-2xl border border-white/5 bg-gradient-to-br from-neutral-900/80 via-neutral-900/60 to-neutral-900/30 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur transition duration-200",
        "open:border-glow/40"
      )}
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-white">
        <span>{title}</span>
        <span className="text-glow transition group-open:rotate-180">v</span>
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}
