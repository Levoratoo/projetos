"use client";

import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer id="contato" className="border-t border-white/5 bg-[#0b0f0e]">
      <Container>
        <div className="py-10 text-center text-xs text-mist/60">
          Site desenvolvido por Pedro Levorato
        </div>
      </Container>
    </footer>
  );
}
