# Coap Project - Technical Context

## Project Overview

O Coap (Construtor de Objeto de Aprendizagem) é uma aplicação React + TypeScript focada na criação e visualização de materiais didáticos interativos. O projeto implementa um sistema dual de Editor/Preview, permitindo que usuários montem conteúdos educacionais através de objetos reutilizáveis com base nos padrões arquiteturais do projeto Portfolio.

### Tech Stack (Recomendada)
- **Frontend**: React 19+ + TypeScript 5+
- **Build Tool**: Vite 7+
- **Styling**: styled-components 6+
- **State Management**: Redux Toolkit 2+ + react-redux 9+
- **Rich Text Editor**: React Quill
- **Icons**: @iconify/react 6+
- **Linting**: ESLint 9+

## Arquitetura do Projeto

### Estrutura de Diretórios
```
src/
├── components/           # Componentes reutilizáveis
│   ├── global/          # Componentes globais
│   │   ├── editorContainer/  # Container para modo editor
│   │   ├── previewContainer/ # Container para modo preview
│   │   └── objectContainer/  # Container base para objetos
│   ├── objects/         # Objetos educacionais (título, texto, imagem, etc.)
│   │   ├── titleObject/
│   │   ├── textObject/
│   │   ├── imageObject/
│   │   ├── videoObject/
│   │   └── shared/      # Componentes compartilhados entre objetos
│   ├── editor/          # Componentes do editor
│   │   ├── toolbar/
│   │   ├── sidebar/
│   │   └── canvas/
│   ├── ui/              # Componentes base de UI
│   │   ├── button/
│   │   ├── modal/
│   │   ├── card/
│   │   ├── input/
│   │   └── switch/
│   └── layout/          # Layout components
├── views/               # Views principais (Editor/Preview)
│   ├── editor/
│   └── preview/
├── store/               # Redux store
│   ├── objects/         # Objects state module
│   ├── editor/          # Editor state module
│   ├── application/     # Application state module
│   ├── rootReducer.ts
│   ├── store.ts
│   └── hooks.ts
├── types/               # TypeScript definitions
│   ├── objects/         # Object types
│   ├── editor/          # Editor types
│   ├── application/     # Application types
│   └── ui/              # UI component types
├── styles/              # Styling system
│   ├── GlobalStyles.ts
│   ├── breakpoints.ts
│   ├── responsive-utils.ts
│   └── wrapper-styled-components/
├── utils/               # Utility functions
│   ├── reduxUtil.ts
│   ├── objectUtil.ts
│   └── editorUtil.ts
├── hooks/               # Custom React hooks
│   ├── useObjectMode.ts
│   ├── useQuillConfig.ts
│   └── useDragDrop.ts
└── assets/              # Static assets
```

## Sistema de Objetos Educacionais

### Padrão Base de Objeto

Todos os objetos educacionais seguem a interface base:

```typescript
// src/types/objects/index.ts
export type ObjectMode = "editor" | "preview";

export interface BaseObjectProps {
  id: string;
  mode: ObjectMode;
  data: Record<string, any>;
  onUpdate?: (id: string, data: Record<string, any>) => void;
  onDelete?: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface ObjectConfig {
  type: string;
  name: string;
  icon: string;
  defaultData: Record<string, any>;
  quillConfig?: QuillConfig;
}
```

### Estrutura de Componente de Objeto

Cada objeto segue o padrão modular:

```
objectName/
├── objectName.tsx          # Componente principal
├── objectName.styles.ts    # Styled components
├── objectName.config.ts    # Configurações do objeto
└── index.ts               # Export principal
```

#### Exemplo - TextObject

```typescript
// src/components/objects/textObject/textObject.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import styled from 'wrapper-styled-components';

import { BaseObjectProps } from '../../../types/objects';
import { TextObjectContainer, TextObjectContent } from './textObject.styles';
import { textObjectConfig } from './textObject.config';

export interface TextObjectData {
  content: string;
  placeholder?: string;
}

export interface TextObjectProps extends BaseObjectProps {
  data: TextObjectData;
}

function TextObject({ id, mode, data, onUpdate, className, style }: TextObjectProps) {
  const { t } = useTranslation();

  const handleContentChange = (content: string) => {
    if (onUpdate) {
      onUpdate(id, { ...data, content });
    }
  };

  if (mode === 'preview') {
    return (
      <TextObjectContainer className={className} style={style}>
        <TextObjectContent dangerouslySetInnerHTML={{ __html: data.content }} />
      </TextObjectContainer>
    );
  }

  return (
    <TextObjectContainer className={className} style={style}>
      <ReactQuill
        theme="snow"
        value={data.content}
        onChange={handleContentChange}
        placeholder={data.placeholder || t('objects.text.placeholder')}
        modules={textObjectConfig.quillConfig.modules}
        formats={textObjectConfig.quillConfig.formats}
      />
    </TextObjectContainer>
  );
}

export default TextObject;
```

```typescript
// src/components/objects/textObject/textObject.styles.ts
import styled from 'wrapper-styled-components';

export const TextObjectContainer = styled.div`
  ${styled.themeLayer};
  width: 100%;
  background: ${({ theme }) => theme.colors.objectBackground};
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow};
  }
  
  .ql-editor {
    min-height: 120px;
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.text};
  }
  
  .ql-toolbar {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    border-left: 1px solid ${({ theme }) => theme.colors.border};
    border-right: 1px solid ${({ theme }) => theme.colors.border};
  }
  
  .ql-container {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    border-left: 1px solid ${({ theme }) => theme.colors.border};
    border-right: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const TextObjectContent = styled.div`
  padding: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }
  
  p {
    margin-bottom: 1em;
  }
  
  ul, ol {
    margin-left: 2em;
  }
`;
```

```typescript
// src/components/objects/textObject/textObject.config.ts
import { ObjectConfig } from '../../../types/objects';

export const textObjectConfig: ObjectConfig = {
  type: 'text',
  name: 'Texto',
  icon: 'mdi:text-box',
  defaultData: {
    content: '',
    placeholder: 'Digite seu texto aqui...'
  },
  quillConfig: {
    modules: {
      toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link'],
        ['clean']
      ]
    },
    formats: [
      'header', 'bold', 'italic', 'underline', 'strike',
      'list', 'bullet', 'align', 'link'
    ]
  }
};
```

## Sistema de Temas (Baseado no Portfolio)

### Implementação do Wrapper Styled-Components

```typescript
// src/styles/wrapper-styled-components/index.ts
import styled, { css, type RuleSet } from "styled-components";
import { GetState } from "../../store/store";
import defaultTheme from "../../themes/defaultTheme";

export const themeLayer = css`
  ${({ theme }) => {
    let themeList;
    try {
      themeList = GetState?.()?.ApplicationReducer?.themeList;
    } catch {
      themeList = defaultTheme;
    }
    if (Array.isArray(themeList)) {
      const found = themeList.find(t => t.name === theme.name);
      return found ? found.name : theme.name;
    }
    return theme.name;
  }}
` as RuleSet<object>;

const styledExport = styled as typeof styled & { themeLayer: RuleSet<object> };
(styledExport as { themeLayer: RuleSet<object> }).themeLayer = themeLayer;

export default styledExport;
```

### Uso nos Componentes

```typescript
// ✅ Correto - com themeLayer
export const Component = styled.div`
  ${styled.themeLayer};
  background: ${({ theme }) => theme.colors.background};
`;

// ❌ Incorreto - sem themeLayer (não recebe tema)
export const Component = styled.div`
  background: #ffffff;
`;
```

## Gerenciamento de Estado (Redux)

### Objects Module State

```typescript
// src/types/objects/index.ts
export interface ObjectInstance {
  id: string;
  type: string;
  data: Record<string, any>;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isSelected: boolean;
  isLocked: boolean;
}

export interface ObjectsState {
  objects: ObjectInstance[];
  selectedObjects: string[];
  clipboard: ObjectInstance[];
  draggedObject: string | null;
}
```

### Editor Module State

```typescript
// src/types/editor/index.ts
export type EditorMode = 'editor' | 'preview';
export type EditorTool = 'select' | 'text' | 'image' | 'video' | 'title';

export interface EditorState {
  mode: EditorMode;
  currentTool: EditorTool;
  canvasSize: { width: number; height: number };
  zoom: number;
  gridVisible: boolean;
  snapToGrid: boolean;
  history: {
    past: ObjectInstance[][];
    present: ObjectInstance[];
    future: ObjectInstance[][];
  };
}
```

### Redux Utilities (Baseado no Portfolio)

```typescript
// src/utils/reduxUtil.ts
import type { ThunkAction } from '@reduxjs/toolkit';
import { connect, type ConnectedProps } from "react-redux";
import { bindActionCreators } from 'redux';
import type { Dispatch, AnyAction, ActionCreatorsMapObject, Action } from 'redux';
import type { RootStateBase } from '../store/rootReducer';

export function connectUtil<TState, TProps, TDispatch extends ActionCreatorsMapObject>(
  mapState: (state: TState) => TProps,
  actions: TDispatch
) {
  function mapDispatch(dispatch: Dispatch<AnyAction>) {
    return bindActionCreators(actions, dispatch);
  }
  return connect(mapState, mapDispatch);
}

export function connectState<TState, TProps>(
  mapState: (state: TState) => TProps,
) {
  return connect(mapState);
}

export function connectAction<TDispatch extends ActionCreatorsMapObject>(
  actions: TDispatch
) {
  function mapState() {
    return {};
  }
  function mapDispatch(dispatch: Dispatch<AnyAction>) {
    return bindActionCreators(actions, dispatch);
  }
  return connect(mapState, mapDispatch);
}

export type PropsFromRedux<TConnector> = ConnectedProps<TConnector>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateBase,
  undefined,
  Action
>;
```

### Padrão de Conexão com Componentes

```typescript
// Exemplo de uso nos componentes
import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';
import { AddObject, SelectObject, UpdateObject } from '../../store/objects/actions/objectsActions';

const connector = connectUtil(
  (state: RootStateBase) => ({
    objects: state.ObjectsReducer.objects,
    selectedObjects: state.ObjectsReducer.selectedObjects,
    editorMode: state.EditorReducer.mode,
  }),
  { AddObject, SelectObject, UpdateObject }
);

export type ComponentProps = PropsFromRedux<typeof connector> & {
  // props específicas do componente
};

function Component(props: ComponentProps) {
  // lógica do componente
}

const ConnectedComponent = connector(Component);
export default ConnectedComponent;
```

## Sistema Responsivo (Baseado no Portfolio)

### Breakpoints

```typescript
// src/styles/breakpoints.ts
export const breakpoints = {
  mobile: '320px',
  mobileLarge: '480px',
  tablet: '768px',
  desktop: '1024px',
  desktopLarge: '1280px',
  desktopXL: '1440px',
};

export const mediaQueries = {
  mobile: `@media (max-width: ${breakpoints.tablet})`,
  tablet: `@media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  
  // Específicos para o Coap
  editorCollapse: `@media (max-width: 1200px)`,
  sidebarCollapse: `@media (max-width: 900px)`,
  mobileEditor: `@media (max-width: 768px)`,
};
```

### Utilitários Responsivos

```typescript
// src/styles/responsive-utils.ts
import { css } from 'styled-components';
import { breakpoints } from './breakpoints';

export const responsiveContainer = css`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: ${breakpoints.tablet}) {
    padding: 0 2rem;
  }
  
  @media (min-width: ${breakpoints.desktop}) {
    padding: 0 3rem;
  }
`;

export const editorLayout = css`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 1rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: 200px 1fr;
  }
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;
```

## Configuração do Quill

### Sistema de Configuração Flexível

```typescript
// src/types/objects/quill.ts
export interface QuillConfig {
  modules: {
    toolbar: any[];
    [key: string]: any;
  };
  formats: string[];
  theme?: 'snow' | 'bubble';
}

// src/utils/quillUtil.ts
export const quillConfigs = {
  minimal: {
    modules: {
      toolbar: [
        ['bold', 'italic'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }]
      ]
    },
    formats: ['bold', 'italic', 'list', 'bullet']
  },
  
  standard: {
    modules: {
      toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link'],
        ['clean']
      ]
    },
    formats: [
      'header', 'bold', 'italic', 'underline', 'strike',
      'list', 'bullet', 'align', 'link'
    ]
  },
  
  full: {
    modules: {
      toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
      ]
    },
    formats: [
      'header', 'bold', 'italic', 'underline', 'strike',
      'color', 'background', 'list', 'bullet', 'align',
      'link', 'image', 'video'
    ]
  }
};
```

## Componentes Base de UI

### Card System (Baseado no Portfolio)

```typescript
// src/components/ui/card/card.tsx
import React from 'react';
import { CardContainer } from './card.styles';

export type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  size?: CardSize;
  onClick?: () => void;
}

export function Card({ children, style, size = 'md', onClick }: CardProps) {
  return (
    <CardContainer style={style} size={size} onClick={onClick}>
      {children}
    </CardContainer>
  );
}

export default Card;
```

```typescript
// src/components/ui/card/card.styles.ts
import styled from 'wrapper-styled-components';

export const CardContainer = styled.div<{ size?: 'sm' | 'md' | 'lg' }>`
  ${styled.themeLayer};
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: ${({ onClick }) => onClick ? 'pointer' : 'default'};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadowHover};
  }
  
  ${({ size }) => {
    switch (size) {
      case 'sm':
        return `padding: 0.75rem; min-width: 120px; font-size: 0.9rem;`;
      case 'lg':
        return `padding: 2rem; min-width: 280px; font-size: 1.1rem;`;
      case 'md':
      default:
        return `padding: 1.25rem; min-width: 200px; font-size: 1rem;`;
    }
  }}
`;
```

## Drag & Drop System

### Hook Customizado

```typescript
// src/hooks/useDragDrop.ts
import { useState, useCallback } from 'react';
import { ObjectInstance } from '../types/objects';

interface DragDropState {
  draggedItem: ObjectInstance | null;
  dropTarget: string | null;
  isDragging: boolean;
}

export function useDragDrop() {
  const [state, setState] = useState<DragDropState>({
    draggedItem: null,
    dropTarget: null,
    isDragging: false
  });

  const handleDragStart = useCallback((item: ObjectInstance) => {
    setState(prev => ({
      ...prev,
      draggedItem: item,
      isDragging: true
    }));
  }, []);

  const handleDragOver = useCallback((targetId: string) => {
    setState(prev => ({
      ...prev,
      dropTarget: targetId
    }));
  }, []);

  const handleDrop = useCallback(() => {
    setState({
      draggedItem: null,
      dropTarget: null,
      isDragging: false
    });
  }, []);

  return {
    ...state,
    handleDragStart,
    handleDragOver,
    handleDrop
  };
}
```


## Padrão de Desenvolvimento Coap

### Convenções Gerais

1. **Componentes Funcionais**: Sempre usar function declarations.
2. **Redux Integrado**: Componentes principais conectados ao estado global via Redux Toolkit, usando o padrão `connectUtil`.
3. **Tipagem Rigorosa**: Todos os componentes e props devem ser fortemente tipados com TypeScript, usando `PropsFromRedux` para componentes conectados.
4. **Estrutura Modular**: Cada componente em seu próprio diretório, com arquivos `.tsx` para lógica/JSX e `.styles.ts` para estilos.
5. **Theme System Opt-in**: Usar `${styled.themeLayer}` para componentes que devem receber tema dinâmico.
6. **Responsividade**: Mobile-first, breakpoints definidos em `styles/breakpoints.ts` e utilitários em `styles/responsive-utils.ts`.
7. **Estado Global**: Estados como `ObjetosList` são definidos no `applicationReducer` e consumidos via Redux nos componentes.
8. **Exportação**: Componentes conectados são exportados como `ConnectedComponent`.

### Estrutura Recomendada

```
component/
├── Component.tsx          # Lógica e JSX principal, conectado ao Redux se necessário
├── Component.styles.ts    # Styled components
├── Component.types.ts     # Types específicas (quando extensas)
```

### Padrão de Props

```typescript
// Props base para todos os componentes
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Para componentes conectados:
import { connectUtil, type PropsFromRedux } from 'src/utils/reduxUtil';
const connector = connectUtil(
  (state: RootStateBase) => ({ /* ... */ }),
  { /* actions */ }
);
export interface ComponentProps extends BaseComponentProps, PropsFromRedux<typeof connector> {
  // props específicas
}
```

### Exemplo de Componente Conectado

```typescript
const connector = connectUtil(
  (state: RootStateBase) => ({
    objetosList: state.ApplicationReducer.ObjetosList ?? []
  }),
  {}
);

function Sidebar({ className, style, objetosList }: SidebarProps) {
  // ...
}

const ConnectedSidebar = connector(Sidebar);
export default ConnectedSidebar;
```

### Estado Global

```typescript
// src/types/application/index.ts
import type { Objeto } from '../../types/objects';
export interface ApplicationState {
  currentLanguage: string;
  isLowPerformance: boolean;
  ObjetosList?: Objeto[];
}
```

### Interações Futuras

Todas as novas features, componentes e integrações devem seguir este padrão: modularidade, tipagem forte, conexão ao Redux quando necessário e uso do sistema de temas opt-in. Componentes que manipulam ou exibem dados globais devem consumir o estado via Redux e PropsFromRedux.

## Sistema de Temas

### Definição de Tema

```typescript
// src/themes/defaultTheme.ts
export const defaultTheme = {
  name: 'default',
  colors: {
    primary: '#3B82F6',
    secondary: '#6B7280',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    cardBackground: '#FFFFFF',
    objectBackground: '#F8FAFC',
    text: '#111827',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  },
  fonts: {
    body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    heading: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'JetBrains Mono', 'Courier New', monospace",
  },
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
  boxShadowHover: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  transitions: {
    fast: '0.15s ease',
    normal: '0.2s ease',
    slow: '0.3s ease',
  }
};
```

## Performance e Otimizações

### Lazy Loading de Objetos

```typescript
// src/components/objects/index.ts
import { lazy } from 'react';

export const TextObject = lazy(() => import('./textObject/textObject'));
export const ImageObject = lazy(() => import('./imageObject/imageObject'));
export const VideoObject = lazy(() => import('./videoObject/videoObject'));
export const TitleObject = lazy(() => import('./titleObject/titleObject'));
```

### Memoização de Componentes

```typescript
// Para componentes que renderizam frequentemente
import React, { memo } from 'react';

const ObjectComponent = memo(function ObjectComponent(props: ObjectProps) {
  // lógica do componente
});
```

## Sistema de Undo/Redo

```typescript
// src/store/editor/reducers/historyReducer.ts
interface HistoryState {
  past: ObjectInstance[][];
  present: ObjectInstance[];
  future: ObjectInstance[][];
}

const historyReducer = (state: HistoryState, action: AnyAction) => {
  switch (action.type) {
    case 'OBJECTS_UPDATE':
      return {
        past: [...state.past, state.present],
        present: action.payload,
        future: []
      };
    case 'UNDO':
      if (state.past.length === 0) return state;
      return {
        past: state.past.slice(0, -1),
        present: state.past[state.past.length - 1],
        future: [state.present, ...state.future]
      };
    case 'REDO':
      if (state.future.length === 0) return state;
      return {
        past: [...state.past, state.present],
        present: state.future[0],
        future: state.future.slice(1)
      };
    default:
      return state;
  }
};
```

## Comandos de Desenvolvimento

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento
npm run build           # Build para produção
npm run lint            # Linting
npm run test            # Testes (se implementados)
npm run preview         # Preview da build

# Específicos do projeto
npm run build:objects   # Build apenas dos objetos
npm run analyze         # Análise do bundle
```

## Diretrizes para Expansão

### Adicionando Novo Objeto

1. Criar pasta em `src/components/objects/newObject/`
2. Implementar seguindo o padrão base
3. Adicionar configuração em `newObject.config.ts`
4. Registrar no sistema de objetos
5. Adicionar testes e traduções

### Adicionando Nova View

1. Criar pasta em `src/views/newView/`
2. Implementar componente principal
3. Conectar com Redux se necessário
4. Adicionar rota (se aplicável)

### Regras de Ouro para o Coap

- **SEMPRE** usar o padrão ObjectMode ("editor" | "preview")
- **SEMPRE** implementar interface BaseObjectProps nos objetos
- **SEMPRE** separar lógica de editor e preview
- **SEMPRE** usar `${styled.themeLayer}` para componentes temáticos
- **SEMPRE** tipar props e estados com TypeScript
- **SEMPRE** implementar responsividade mobile-first
- **SEMPRE** usar configurações Quill específicas por tipo de objeto
- **SEMPRE** implementar callbacks onUpdate e onDelete nos objetos
- **SEMPRE** considerar performance (lazy loading, memoização)
- **SEMPRE** seguir convenções de naming e estrutura de arquivos
- **SEMPRE** implementar acessibilidade (ARIA, keyboard navigation)

## Diferenças Arquiteturais do Portfolio

### Adaptações para o Coap

1. **Sistema Dual**: Editor/Preview em vez de views estáticas
2. **Objetos Dinâmicos**: Componentes que mudam comportamento por modo
3. **Rich Text**: Integração profunda com React Quill
4. **Drag & Drop**: Sistema de arrastar e soltar objetos
5. **Estado Complexo**: Gerenciamento de objetos, histórico e editor
6. **Upload System**: Gerenciamento de assets (imagens, vídeos)
7. **Export/Import**: Serialização para JSON dos materiais criados

### Mantidas do Portfolio

1. **Sistema de Temas**: Wrapper styled-components com opt-in
2. **Redux Pattern**: Utilities e padrões de conexão
3. **Responsive System**: Breakpoints e media queries
4. **Component Architecture**: Estrutura modular e tipagem forte
5. **Performance Patterns**: Lazy loading e otimizações
