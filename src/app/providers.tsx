"use client";

import { FloatingLanguageSwitcher } from "@/components/FloatingLanguageSwitcher";
import { Footer } from "@/components/Footer";
import { LocaleProvider } from "@/state/locale";
import { ProjectPreviewProvider } from "@/state/projectPreview";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProjectPreviewProvider>
      <LocaleProvider>
        <FloatingLanguageSwitcher />
        {children}
        <Footer />
      </LocaleProvider>
    </ProjectPreviewProvider>
  );
}
