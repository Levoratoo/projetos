import Link from "next/link";
import { Container } from "@/components/Container";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0b0f0e]/80 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between py-5">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.3em] text-white"
            aria-label="Printbag Projects"
          >
            Printbag Projects
          </Link>
          <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.2em] text-mist/70 sm:flex">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link href="/projetos" className="hover:text-white">
              Projetos
            </Link>
            <Link href="/solicitar" className="hover:text-white">
              Solicitar projeto
            </Link>
            <a href="#sobre" className="hover:text-white">
              Sobre
            </a>
            <a href="#contato" className="hover:text-white">
              Contato
            </a>
          </nav>
        </div>
      </Container>
    </header>
  );
}
