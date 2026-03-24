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

### GitHub Pages (CSS e assets)

Este projeto usa `output: "export"` com `basePath`/`assetPrefix` definidos em `next.config.mjs`.

- **No GitHub Actions** o workflow define `NEXT_PUBLIC_BASE_PATH=/<nome-do-repo>` antes do build — os links em `out/` ficam como `/<repo>/_next/...` e o CSS carrega.
- **Se você gerar `out/` localmente** e publicar em `https://<user>.github.io/<repo>/` **sem** essa variável, o HTML apontará para `/_next/...` na raiz do domínio e o **CSS/JS pode dar 404** (página parece “sem estilo”).

Para testar o build igual ao deploy:

```bash
# Windows PowerShell (troque pelo nome do repositório)
$env:NEXT_PUBLIC_BASE_PATH="/nome-do-repo"; npm run build
```

### Pasta `app/` na raiz

O Next.js **prioriza** `./app` em relação a `./src/app` (`find-pages-dir`). O dev server também tenta ler a pasta `app` na raiz; em **Windows**, se ela não existir, pode ocorrer `ENOENT: scandir ...\app` e os `/_next/static/...` passam a dar **404** (página em branco ou “Internal Server Error”).

Por isso existe uma pasta **`app/`** só com **reexportações** para `src/app` (implementação única). Não apague `app/` sem mover o código ou ajustar o projeto.

### Cache do webpack (`.next`)

Se aparecer erro ao renomear `*.pack.gz` no cache, pare o `npm run dev`, apague a pasta **`.next`** e suba de novo.

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
