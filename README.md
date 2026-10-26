# SITE 3D - Next.js & TypeScript

Este é um projeto [Next.js](https://nextjs.org/) configurado com a versão mais recente, **TypeScript**, **App Router** e estilização moderna com suporte a animações e experiências 3D.

## 🚀 Como executar

Primeiro, certifique-se de que as dependências estão instaladas:

```bash
npm install
```

Em seguida, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 📁 Estrutura do Projeto

- `src/app/` — Páginas, layouts e estilos do App Router
  - `layout.tsx` — Layout principal com metadata e viewport
  - `page.tsx` — Página inicial com tema moderno e interações
  - `globals.css` — Variáveis CSS, paleta e reset global
  - `page.module.css` — Estilos modulares da página inicial
- `public/` — Arquivos estáticos e mídias
- `tsconfig.json` — Configuração TypeScript com alias `@/*`
- `next.config.ts` — Configuração do Next.js
