"use client";

import { Suspense } from "react";
import { FloatingLanguageSwitcher } from "@/components/FloatingLanguageSwitcher";
import { Footer } from "@/components/Footer";
import { LocaleProvider, LocaleUrlSync } from "@/state/locale";
import { ProjectPreviewProvider } from "@/state/projectPreview";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProjectPreviewProvider>
      <LocaleProvider>
        <Suspense fallback={null}>
          <LocaleUrlSync />
        </Suspense>
        <FloatingLanguageSwitcher />
        {children}
        <Footer />
      </LocaleProvider>
    </ProjectPreviewProvider>
  );
}
