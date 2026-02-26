import { Container } from "@/components/Container";
import { SkeletonCard } from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <main>
      <section className="border-b border-white/5 py-16">
        <Container>
          <div className="h-3 w-24 rounded-full bg-white/10" />
          <div className="mt-4 h-10 w-3/4 rounded bg-white/10" />
          <div className="mt-4 h-4 w-2/3 rounded bg-white/10" />
        </Container>
      </section>
      <section className="py-12">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
