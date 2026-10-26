# AGENTS.md - Regras Operacionais para Agentes de IA

Este arquivo define as instruções mandatórias, padrões de desenvolvimento e restrições técnicas para qualquer agente autônomo atuando no repositório **SITE 3D / ROBOFORGE**.

---

## 🎯 Escopo do Repositório

O projeto é uma aplicação web moderna em **Next.js (App Router)** com arquitetura pronta para renderizações 3D (Three.js/Spline/Canvas), interface futurista de alta densidade estética e foco em automação e inteligência artificial.

---

## ⚡ Regras de Ouro (Golden Rules)

1. **Nunca Substitua ou Reinstale o Framework**:
   - O projeto utiliza Next.js 15+ com App Router e React 19.
   - Não crie novos projetos em subdiretórios e não execute instaladores destrutivos.
   
2. **Estilização e CSS**:
   - Utilize **Vanilla CSS / CSS Modules** (`*.module.css` e `globals.css`).
   - Não adicione TailwindCSS, Bootstrap ou bibliotecas de UI pesadas sem autorização explícita do usuário.
   - Siga a identidade visual: **fundo preto puro (`#000000`)**, acentos em ciano neon (`#00f0ff`) e azul elétrico.

3. **Arquitetura Visual Sem Imagens Estáticas Pesadas**:
   - Componentes visuais como o portal dimensional, ícones e HUDs devem ser construídos em código (SVG vetorial, gradientes CSS, keyframes).
   - Não dependa de imagens bitmaps/PNG/JPEG externas para estruturação de layout.

4. **Responsividade Obrigatória**:
   - Qualquer nova seção ou componente DEVE ser estritamente responsivo para smartphones (a partir de 320px de largura), tablets e desktops ultrawide.
   - Menus em dispositivos móveis devem possuir comportamento adaptado (drawer/overlay).

---

## 🏗️ Padrões de Código e TypeScript

- **TypeScript Estrito**:
  - Todas as props e funções devem ter tipagem explícita.
  - Evite o uso de `any`; crie interfaces ou types dedicados quando necessário.
- **Client vs Server Components**:
  - Se um componente necessita de estado (`useState`, `useEffect`) ou manipuladores de eventos (`onClick`), adicione a diretiva `"use client"` na primeira linha.
  - Mantenha componentes puramente estáticos/estruturais no servidor sempre que possível.
- **Acessibilidade & SEO**:
  - Elementos interativos (`button`, `a`) devem ter atributos de acessibilidade (`aria-label`, `aria-expanded`).
  - Imagens ou vetores decorativos devem conter `aria-hidden="true"`.

---

## 📋 Checklist de Validação Antes de Concluir Tarefas

- [ ] A alteração respeita o tema de fundo preto (`#000000`) e paleta neon?
- [ ] O layout permanece perfeitamente responsivo no mobile e desktop?
- [ ] O comando de compilação `npm run build` passa sem erros de compilação ou linter?
- [ ] Nenhum arquivo de mídia desnecessário ou framework não autorizado foi inserido?
- [ ] Todos os links de navegação e botões interativos funcionam corretamente?
