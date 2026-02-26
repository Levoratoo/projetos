import Link from "next/link";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="py-24">
      <Container>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-glow/70">404</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">
            Projeto nao encontrado
          </h1>
          <p className="mt-3 text-sm text-mist/70">
            O case que voce procura nao esta disponivel no momento.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/">Voltar para Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/projetos">Ver projetos</Link>
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
