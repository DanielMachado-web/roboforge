# CLAUDE.md - Diretrizes do Projeto

Este documento contém o contexto, diretrizes de arquitetura e convenções técnicas para assistência de IA no desenvolvimento do projeto **SITE 3D / ROBOFORGE**.

---

## 📌 Visão Geral do Projeto

- **Nome**: SITE 3D / ROBOFORGE
- **Objetivo**: Aplicação web de alta fidelidade visual com foco em estética futurista/cyber neon, automação, IA e experiências 3D prontas para integração.
- **Identidade Visual**: Fundo preto puro (`#000000`), detalhes em ciano neon (`#00f0ff`), azul elétrico (`#0084ff`) e tipografia moderna/geométrica (`Orbitron`, `Rajdhani`, `Inter`).

---

## 🛠️ Stack Tecnológica

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Biblioteca Base**: [React](https://react.dev/) 19
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/) (modo estrito)
- **Estilização**: Vanilla CSS / CSS Modules nativos (sem TailwindCSS ou frameworks CSS de terceiros)
- **Gerenciador de Pacotes**: npm

---

## 💻 Comandos Principais

```bash
# Iniciar o servidor de desenvolvimento local (http://localhost:3000)
npm run dev

# Gerar build otimizada de produção
npm run build

# Iniciar servidor em modo produção
npm run start

# Executar verificação de linter e tipos
npm run lint
```

---

## 📁 Estrutura de Diretórios

```
SITE 3D/
├── src/
│   └── app/
│       ├── globals.css         # Variáveis CSS (cores, fontes, glow), reset e scrollbar
│       ├── layout.tsx          # RootLayout, metadados globais e viewport
│       ├── page.tsx            # Página principal / Hero Section e componentes
│       └── page.module.css     # Estilos modulares da página, animações e responsividade
├── public/                     # Arquivos públicos e estáticos
├── next.config.ts              # Configurações do Next.js
├── tsconfig.json               # Configurações do TypeScript
├── package.json                # Dependências e scripts do projeto
├── Claude.md                   # Diretrizes para Claude / assistentes de IA
└── Agents.md                   # Regras operacionais para agentes de código
```

---

## 🎨 Design System & Estética

- **Fundo Base**: `#000000` (preto absoluto).
- **Cores de Destaque**:
  - Ciano Neon: `#00f0ff` / Glow: `rgba(0, 240, 255, 0.45)`
  - Azul Elétrico: `#0084ff` / `#00b4ff`
  - Superfícies/Cards: `rgba(8, 14, 26, 0.65)` com bordas sutis `rgba(0, 240, 255, 0.3)`
- **Tipografia**:
  - Títulos Principais: `Orbitron` (bold, display, uppercase)
  - Subtítulos e Tags Técnicas: `Rajdhani` (semicondensada, técnica)
  - Texto de Leitura / Corpo: `Inter` (sans-serif legível e moderna)
- **Gráficos e Efeitos**:
  - Evitar imagens estáticas pesadas (bitmaps/PNGs desnecessários).
  - Priorizar estruturas vetoriais SVG, animações via CSS keyframes e componentes interativos.
  - Manter o slot do portal dimensional pronto para injeção de Three.js / Canvas 3D.

---

## 📱 Diretrizes de Responsividade

- Todos os componentes devem ser **100% responsivos**:
  - **Desktop (> 1100px)**: Layout de duas colunas, menu horizontal completo e badges em linha.
  - **Tablet (768px - 1100px)**: Grid ajustada, badges em 2x2 e tipografia escalada.
  - **Mobile (< 768px)**: Menu hambúrguer animado com gaveta modal, layout vertical fluído, botões full-width e uso de `clamp()` para tamanhos de fonte.

---

## ⚠️ Regras e Restrições Importantes

1. **Não instale ou substitua o framework**: Mantenha o Next.js App Router e React 19 já configurados.
2. **Não use TailwindCSS** a menos que expressamente solicitado pelo usuário.
3. **Preserve a integridade do código**: Mantenha comentários úteis e padrões de código limpos com TypeScript estrito.
