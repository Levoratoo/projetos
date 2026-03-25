"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

/**
 * Mesma régua horizontal do hero (`Container` em HomeHero).
 * Em /curriculo não renderizamos aqui: `position:fixed` vaza no PDF por cima do nome;
 * o currículo usa LanguageSwitcher dentro do fluxo da página (`.cv`), com `print:hidden`.
 */
export function FloatingLanguageSwitcher() {
  const pathname = usePathname() ?? "";
  const hideOnCurriculo = /(^|\/)curriculo(\/|$)/.test(pathname);
  if (hideOnCurriculo) return null;

  return (
    <div
      data-floating-lang-switcher
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] pt-[max(1rem,env(safe-area-inset-top))] print:!hidden print:!pointer-events-none"
    >
      <div className="mx-auto w-full max-w-[1720px] px-6 sm:px-8 lg:px-10">
        <div className="pointer-events-auto inline-flex drop-shadow-[0_8px_32px_rgba(0,0,0,0.55)]">
          <Suspense fallback={null}>
            <LanguageSwitcher />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
