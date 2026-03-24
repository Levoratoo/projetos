"use client";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";

/**
 * Mesma régua horizontal do hero (`Container` em HomeHero):
 * `max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-10`
 */
export function FloatingLanguageSwitcher() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] pt-[max(1rem,env(safe-area-inset-top))]">
      <div className="mx-auto w-full max-w-[1720px] px-6 sm:px-8 lg:px-10">
        <div className="pointer-events-auto inline-flex drop-shadow-[0_8px_32px_rgba(0,0,0,0.55)]">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
