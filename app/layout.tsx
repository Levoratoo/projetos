/**
 * Next.js resolve `./app` antes de `./src/app` (ver `find-pages-dir`).
 * Este ficheiro delega tudo para `src/app` para haver uma única fonte de verdade.
 */
export { default, metadata } from "@/app/layout";
