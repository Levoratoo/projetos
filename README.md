# Vitrine de Projetos Printbag

Portfolio moderno e premium com foco em performance, cases e resultados.

## Comandos (setup do zero)
```bash
npx create-next-app@latest printbag-showcase --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
cd printbag-showcase
npm install framer-motion
```

Opcional (shadcn/ui):
```bash
npx shadcn-ui@latest init
```

## Como rodar
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run start
```

## Estrutura principal
```
src/
  app/
    page.tsx
    projetos/page.tsx
    projetos/[slug]/page.tsx
    projetos/loading.tsx
    layout.tsx
  components/
    Container.tsx
    Section.tsx
    ProjectCard.tsx
    Tag.tsx
    KpiStrip.tsx
    SearchBar.tsx
    Filters.tsx
    ProjectsPage.tsx
    SkeletonCard.tsx
    ui/
      button.tsx
  data/
    projects.ts
  lib/
    utils.ts
```

## Como adicionar um novo projeto
1) Abra `src/data/projects.ts`.
2) Adicione um novo objeto seguindo o tipo `Project`.
3) Garanta um `slug` unico e preencha `year`, `tags` e `stack`.
4) O novo item aparece automaticamente na Home e na pagina `/projetos`.

## Observacoes
- Imagens sao placeholders com gradientes e SVGs simples (sem assets externos).
- Ajuste cores e tipografia em `tailwind.config.cjs` e `src/app/globals.css`.
## Solicitação de Projeto (Teams)

O link do Teams fica em `src/config/teams.ts`.

- `TEAMS_CHAT_URL`: URL do chat do Teams.
- O template do resumo fica em `src/lib/teamsRequest.ts` (função `buildTeamsSummary`).

Para ajustar o template, altere o texto em `buildTeamsSummary`.
## Solicitação de Projeto (Teams)

O link do Teams fica em `src/config/teams.ts`.

- `TEAMS_CHAT_URL`: URL do chat do Teams.
- O template do resumo fica em `src/lib/teamsRequest.ts` (função `buildTeamsSummary`).

Para ajustar o template, altere o texto em `buildTeamsSummary`.

Rascunho automático:
- O formulário salva um rascunho em `localStorage` (chave `printbag_project_request_v1`).
- Use "Limpar" para resetar o rascunho.
