"use client";

import { Container } from "@/components/Container";
import { tHome } from "@/i18n/home";
import { useLocale } from "@/state/locale";

export function Footer() {
  const { locale } = useLocale();
  const t = tHome(locale);
  return (
    <footer
      id="contato"
      className="relative border-t border-white/10 bg-[linear-gradient(180deg,rgba(8,3,4,0.94),rgba(4,2,3,0.98))]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,59,59,0.14),transparent_42%)]" />
      <Container>
        <div className="relative py-10 text-center">
          <div className="mx-auto mb-4 h-px w-full max-w-[180px] bg-[linear-gradient(90deg,transparent,rgba(255,88,88,0.9),transparent)] shadow-[0_0_22px_rgba(255,59,59,0.32)]" />
          <div className="text-xs uppercase tracking-[0.32em] text-mist/56">
            {t.footerCredit}
          </div>
        </div>
      </Container>
    </footer>
  );
}
