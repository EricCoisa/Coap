# Coap
Construtor de Objeto de Aprendizagem

## 📌 Contexto do Projeto
O Coap é uma aplicação voltada para a criação e visualização de materiais didáticos interativos. Seu propósito é oferecer uma ferramenta simples e flexível, semelhante ao Wix ou Canvas simplificado, permitindo que o usuário monte conteúdos educacionais através de objetos reutilizáveis (texto, título, imagem, vídeo, etc.).

## 🎯 Objetivo
Facilitar a montagem de conteúdos educacionais interativos, permitindo a reutilização de objetos e componentes, com foco em simplicidade e flexibilidade.

## ⚙️ Estrutura
O projeto se divide em dois módulos principais:

### Editor
- Área de trabalho onde o usuário pode adicionar, mover e remover objetos.
- Editar conteúdos por meio de inputs e rich text (via Quill).
- Fazer upload de imagens e configurar propriedades.
- Cada objeto possui um modo de edição, exibindo campos interativos (inputs, upload, quill).

### Preview
- Exibe os objetos criados no modo somente leitura.
- Utiliza os mesmos componentes do Editor, mas com a prop `mode="preview"`, ocultando elementos de edição.

## 📦 Componentes do Projeto
Os objetos (título, texto, imagem, vídeo, etc.) são implementados como componentes reutilizáveis. Cada componente suporta dois modos:

- `editor` → habilita inputs e campos de edição.
- `preview` → exibe apenas o resultado final.

**Exemplo:**
`ImageObject` → mostra Quill para título, upload no modo editor, mas renderiza apenas `<img>` e source no preview.

## 🛠️ Padrões de Desenvolvimento

### Componentes
- Criados em arquivos isolados (`objectName.tsx`).
- Exportados como default.
- Usam styled-components em arquivo separado (`objectName.style.ts`).

### Tipagem
- Tipos globais ficam em `src/types/objects.ts`.
- Exemplo:
```typescript
export type ObjectMode = "editor" | "preview";
```

### Editor de Texto
- Usaremos React Quill para inputs ricos.
- Configurações diferentes para cada tipo de objeto (exemplo: Título com toolbar minimalista, Texto com opções mais abertas).

## 🔮 Futuro / Extensões
- Suporte a arrastar e soltar (drag & drop) para organizar objetos.
- Sistema de templates de material pré-definidos.
- Exportação do conteúdo em JSON, para persistência e compartilhamento.
- Integração com plataformas de EAD.
