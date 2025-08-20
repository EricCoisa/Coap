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

### Arquitetura Atual dos Objetos Genéricos

O sistema de objetos do Coap é baseado em um padrão simplificado que separa **templates/paleta** de **instâncias utilizadas**:

```typescript
// src/types/objects/index.tsx - Estrutura atual
export type ObjectType = 'title' | 'text' | 'image';
export type ObjectMode = 'edit' | 'view';

export interface Object<T = Record<string, unknown>> {
  id: string;
  type: ObjectType;
  label: string;
  icon?: string;
  data: T;
}

// Interface base para componentes de objeto
export interface IBaseObjectProps {
  object: Object;
  index: number;
  mode: ObjectMode;
}
```

### Sistema Dual de Armazenamento

#### 1. **ObjectsList** - Templates da Paleta (Estado Global)
```typescript
// src/types/objects/index.tsx
export const InitialObjects = [
  {
    id: "0",
    type: 'text' as ObjectType,
    label: 'Texto',
    icon: '📝',
    data: {
      content: 'Este é um texto de exemplo.',
      fontSize: '16px',
      color: '#000000'
    } as TextData
  }
] as AnyObject[];
```

**Armazenamento**: `ApplicationState.ObjectsList` (inicializado com `InitialObjects`)
**Propósito**: Define os tipos de objetos disponíveis na sidebar para arrastar
**Características**: 
- São templates, não instâncias
- Têm IDs fixos (não únicos para uso)
- Definem dados padrão para novos objetos

#### 2. **ObjectsUsed** - Instâncias no Canvas (Estado Global)
```typescript
// src/types/application/index.ts
export interface ApplicationState {
  currentLanguage: string;
  isLowPerformance: boolean;
  ObjectsList?: AnyObject[];  // Templates da paleta
  ObjectsUsed?: Object[];     // Instâncias no canvas
}
```

**Armazenamento**: `ApplicationState.ObjectsUsed`
**Propósito**: Objetos realmente colocados no canvas pelo usuário
**Características**:
- Cada item tem ID único (GUID gerado automaticamente)
- Dados independentes e editáveis
- Posição/ordem determinada pelo índice no array

### Fluxo de Manipulação dos Objetos

#### 1. **Adição de Objeto (Sidebar → Canvas)**
```typescript
// src/components/sidebar/sidebar.tsx
function handleAddObject(object: Object) {
  if (props.AddObject) props.AddObject(object);
}

// src/store/application/actions/applicationAction.ts
export function AddObject(object: Object): AppThunk {
  return async function dispatchAddObject(dispatch) {
    dispatch({
      payload: object,
      type: OBJECTSUSED_ADD
    });
  };
}

// src/store/application/reducers/applicationReducer.ts
case OBJECTSUSED_ADD: {
  // Gera GUID único para a nova instância
  function generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  const newObject = {
    ...action.payload,  // Copia dados do template
    id: generateGuid()  // Substitui ID por GUID único
  };
  return {
    ...state,
    ObjectsUsed: state.ObjectsUsed ? [...state.ObjectsUsed, newObject] : [newObject]
  };
}
```

**Processo**:
1. Usuário clica no template da sidebar
2. Template é copiado e recebe novo GUID
3. Nova instância é adicionada ao `ObjectsUsed`
4. Canvas re-renderiza com novo objeto

#### 2. **Edição de Objeto (Inline no Canvas)**
```typescript
// src/components/objects/text/text.tsx
function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
  props.EditObject(props.object.id, { 
    ...props.object.data, 
    content: e.target.value 
  });
}

// src/store/application/actions/applicationAction.ts
export function EditObject(id: string, data: Record<string, unknown>): AppThunk {
  return async function dispatchEditObject(dispatch) {
    dispatch({
      payload: { id, data },
      type: OBJECTSUSED_EDIT
    });
  };
}

// Reducer atualiza apenas o objeto específico
case OBJECTSUSED_EDIT: {
  const { id, data } = action.payload;
  return {
    ...state,
    ObjectsUsed: state.ObjectsUsed.map((obj: Object) =>
      obj.id === id ? { ...obj, data: data } : obj
    )
  };
}
```

**Processo**:
1. Usuário edita conteúdo diretamente no canvas
2. Componente detecta mudança e chama `EditObject`
3. Redux encontra objeto pelo ID e atualiza apenas seus dados
4. Componente re-renderiza com novos dados

#### 3. **Remoção de Objeto**
```typescript
// src/components/objects/BaseObject.tsx
function handleRemove() {
  if (props.RemoveObject && props.object) {
    props.RemoveObject(props.object);
  }
}

// Reducer remove objeto por ID
case OBJECTSUSED_REMOVE: {
  const removeId = String(action.payload.id);
  return {
    ...state,
    ObjectsUsed: state.ObjectsUsed ? 
      state.ObjectsUsed.filter((obj: Object) => String(obj.id) !== removeId) : []
  };
}
```

#### 4. **Reordenação via Drag & Drop**
```typescript
// src/components/objects/BaseObject.tsx
function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
  e.dataTransfer.setData('objectId', props.object.id.toString());
  e.dataTransfer.setData('objectIndex', props.index.toString());
}

function handleDrop(e: React.DragEvent<HTMLDivElement>) {
  const draggedId = e.dataTransfer.getData('objectId');
  const draggedIndex = Number(e.dataTransfer.getData('objectIndex'));
  if (props.MoveObject && draggedId && typeof draggedIndex === 'number') {
    props.MoveObject(props.object, draggedIndex);
  }
}

// Reducer reordena array ObjectsUsed
case OBJECTSUSED_MOVE: {
  const { object, to } = action.payload;
  const filtered = state.ObjectsUsed.filter((obj: Object) => obj.id !== object.id);
  const newList = [...filtered.slice(0, to), object, ...filtered.slice(to)];
  return {
    ...state,
    ObjectsUsed: newList
  };
}
```

### Arquitetura de Componentes

#### **BaseObject** - Container Universal
```typescript
// src/components/objects/BaseObject.tsx
export interface IBaseObjectProps {
  object: Object;     // Dados completos do objeto
  index: number;      // Posição no array ObjectsUsed
  mode: ObjectMode;   // 'edit' ou 'view'
}
```

**Responsabilidades**:
- ✅ **Container visual** com background e padding
- ✅ **Drag & Drop** - permite reordenar objetos
- ✅ **Botão de remoção** - integrado ao Redux
- ✅ **Conectado ao Redux** - acesso às actions MoveObject/RemoveObject
- ✅ **Wrapper para children** - renderiza componente específico dentro

**Estrutura**:
```jsx
<BaseObject object={textObject} index={0} mode="edit">
  {/* Componente específico (TextObject) renderizado como children */}
</BaseObject>
```

#### **Componentes Específicos** (TextObject, ImageObject, etc.)
```typescript
// src/components/objects/text/text.tsx
export interface TextData {
  content: string;
  fontSize: string;
  color: string;
}

function TextObject(props: TextProps) {
  const data = props.object.data as unknown as TextData;
  
  return (
    <BaseObject object={props.object} index={props.index} mode={props.mode}>
      {props.mode === 'edit' ? (
        <textarea
          value={data.content}
          onChange={handleContentChange}
          // ... configurações de edição
        />
      ) : (
        <div>
          {data.content}
        </div>
      )}
    </BaseObject>
  );
}
```

**Responsabilidades**:
- ✅ **Renderização específica** do tipo de conteúdo
- ✅ **Modo dual** - interface de edição vs visualização 
- ✅ **Tipagem de dados** - cast de `object.data` para tipo específico
- ✅ **Integração Redux** - conectado a `EditObject` para mudanças
- ✅ **Sempre wrapped** por BaseObject

### Sistema de Renderização

#### **ObjectElements** - Mapeamento Tipo → Componente
```typescript
// src/types/objects/index.tsx
export const ObjectElements = [{
  type: 'text' as ObjectType,
  element: Text,  // Referência ao componente TextObject
}] as ObjectElement[];

export interface ObjectElement {
  type: ObjectType;
  element: React.FC<IBaseObjectProps>;
}
```

#### **Renderização Dinâmica no Canvas**
```typescript
// src/views/editor/editor.tsx
{props.objectsUsed.map((o, i) => {
  const Component = ObjectElements.find(element => element.type === o.type)?.element;
  return Component ? 
    React.createElement(Component, { 
      object: o, 
      index: i, 
      mode: "edit" 
    }) : null;
})}
```

**Fluxo**:
1. **ObjectsUsed** contém lista de objetos no canvas
2. Para cada objeto, busca componente correspondente em **ObjectElements**
3. Usa `React.createElement` para instanciar componente dinamicamente
4. Passa props: `object`, `index`, `mode`

### Padrões de Dados

#### **Tipagem Flexível**
```typescript
// Genérico para qualquer tipo de dado
export interface Object<T = Record<string, unknown>> {
  id: string;
  type: ObjectType;
  label: string;
  icon?: string;
  data: T;  // Dados específicos do tipo
}

// Tipos específicos
export type AnyObject = Object<TextData> | Object<Record<string, unknown>>;

// Dados específicos do texto
export interface TextData {
  content: string;
  fontSize: string;
  color: string;
}
```

#### **Conversão de Tipos nos Componentes**
```typescript
// No componente específico, converte data genérica para tipo específico
function TextObject(props: TextProps) {
  const data = props.object.data as unknown as TextData;
  // Agora 'data' tem tipagem forte para TextData
}
```

### Performance e Otimizações

#### **Monitoramento de Performance**
```typescript
// src/utils/applicationUtil.ts
let lastFrame = performance.now();
let frameCount = 0;
let fps: number | undefined = undefined;

function measureFPS() {
  const now = performance.now();
  frameCount++;
  if (now - lastFrame >= 1000) {
    fps = frameCount;
    frameCount = 0;
    lastFrame = now;

    if(fps < 15){
      Store.dispatch({ type: LOWPERFORMANCE_SET, payload: true });
    }
  }
  window.requestAnimationFrame(measureFPS);
}
```

**Sistema**:
- ✅ Monitora FPS automaticamente
- ✅ Detecta dispositivos móveis
- ✅ Respeita `prefers-reduced-motion`
- ✅ Atualiza estado global para otimizações

#### **Estado de Performance**
```typescript
// src/types/application/index.ts
export interface ApplicationState {
  currentLanguage: string;
  isLowPerformance: boolean;  // Usado para otimizações
  ObjectsList?: AnyObject[];
  ObjectsUsed?: Object[];
}
```

### Limitações e Oportunidades Atuais

#### **Implementação Simplificada**
O sistema atual usa uma abordagem mais direta comparada ao design original:

**❌ Não Implementado (do design original)**:
- ✖️ React Quill para rich text editing
- ✖️ Sistema de configurações por objeto (.config.ts)
- ✖️ Wrapper styled-components com themeLayer
- ✖️ Sistema de temas dinâmicos
- ✖️ Múltiplos modos (editor/preview)
- ✖️ Sistema de posicionamento livre (canvas com coordenadas)
- ✖️ Sistema de seleção múltipla
- ✖️ Undo/Redo

**✅ Implementado (versão atual)**:
- ✅ Templates da paleta (InitialObjects)
- ✅ Instâncias independentes (ObjectsUsed)
- ✅ CRUD completo via Redux
- ✅ Componentes dinâmicos por tipo
- ✅ Drag & Drop básico para reordenação
- ✅ Modo dual edit/view por componente
- ✅ Sistema de IDs únicos (GUID)
- ✅ Edição inline nos componentes

#### **Estrutura de Armazenamento Real**
```typescript
// Estado atual no Redux
ApplicationState {
  currentLanguage: 'pt',
  isLowPerformance: false,
  ObjectsList: [           // Templates/Paleta
    {
      id: "0",            // ID fixo (template)
      type: 'text',
      label: 'Texto',
      icon: '📝',
      data: {
        content: 'Este é um texto de exemplo.',
        fontSize: '16px',
        color: '#000000'
      }
    }
  ],
  ObjectsUsed: [          // Instâncias no Canvas
    {
      id: "abc-123-def",   // GUID único
      type: 'text',
      label: 'Texto',
      icon: '📝',
      data: {
        content: 'Meu texto editado',
        fontSize: '16px',
        color: '#000000'
      }
    }
  ]
}
```

#### **Fluxo Completo Real**
```
1. InitialObjects → ApplicationState.ObjectsList (templates)
   ↓
2. Usuário clica template na Sidebar
   ↓
3. AddObject copia template + gera GUID → ObjectsUsed
   ↓
4. Editor renderiza ObjectsUsed com React.createElement
   ↓
5. Componente específico (TextObject) wrapped por BaseObject
   ↓
6. Edições → EditObject → atualiza ObjectsUsed[index].data
   ↓
7. Remoção → RemoveObject → remove de ObjectsUsed
   ↓
8. Drag & Drop → MoveObject → reordena ObjectsUsed
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


## Padrão de Desenvolvimento Coap (Atualizado)

### Convenções Atuais

1. **Componentes Funcionais**: Sempre usar function declarations.
2. **Redux Integrado**: Componentes principais conectados ao estado global via Redux Toolkit, usando o padrão `connectUtil`.
3. **Tipagem Rigorosa**: Todos os componentes e props devem ser fortemente tipados com TypeScript, usando `PropsFromRedux` para componentes conectados.
4. **Estrutura Modular**: Cada componente em seu próprio diretório, com arquivos `.tsx` para lógica/JSX e `.styles.ts` para estilos.
5. **Estado Global Centralizado**: Estados como `ObjectsList` e `ObjectsUsed` são definidos no `applicationReducer` e consumidos via Redux nos componentes.
6. **Exportação**: Componentes conectados são exportados como `ConnectedComponent`.
7. **Sistema de Objetos**: Templates na paleta vs instâncias no canvas.

### Estrutura Real de Componente de Objeto

```
components/objects/
├── BaseObject.tsx              # Container universal com drag/drop/remove
├── text/
│   ├── text.tsx               # Componente específico de texto
│   └── text.styles.ts         # Estilos (se necessário)
└── [futuro] image/
    ├── image.tsx
    └── image.styles.ts
```

### Padrão de Props Real

```typescript
// Props para componentes de objeto específicos
export interface IBaseObjectProps {
  object: Object;      // Dados completos do objeto
  index: number;       // Posição no array ObjectsUsed  
  mode: ObjectMode;    // 'edit' ou 'view'
}

// Para componentes conectados:
import { connectUtil, type PropsFromRedux } from 'src/utils/reduxUtil';
const connector = connectUtil(
  (state: RootStateBase) => ({ 
    objectsUsed: state.ApplicationReducer.ObjectsUsed ?? []
  }),
  { EditObject }
);
export interface TextProps extends IBaseObjectProps, PropsFromRedux<typeof connector> {
  // props específicas do texto
}
```

### Exemplo Real de Componente Conectado

```typescript
// src/components/objects/text/text.tsx
const connector = connectUtil(
  (_state : RootStateBase) => ({
     objectsUsed: _state.ApplicationReducer.ObjectsUsed ?? []
  }),
  { EditObject}
);

function TextObject(props: TextProps) {
  const data = props.object.data as unknown as TextData;

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    props.EditObject(props.object.id, { 
      ...props.object.data, 
      content: e.target.value 
    });
  }

  return (
    <BaseObject object={props.object} index={props.index} mode={props.mode}>
      {props.mode === 'edit' ? (
        <textarea value={data.content} onChange={handleContentChange} />
      ) : (
        <div>{data.content}</div>
      )}
    </BaseObject>
  );
}

const ConnectedTextObject = connector(TextObject);
export default ConnectedTextObject;
```

### Estado Global Real

```typescript
// src/types/application/index.ts
export interface ApplicationState {
  currentLanguage: string;
  isLowPerformance: boolean;
  ObjectsList?: AnyObject[];  // Templates da paleta (InitialObjects)
  ObjectsUsed?: Object[];     // Instâncias efetivamente no canvas
}
```

### Actions Redux Implementadas

```typescript
// src/store/application/actions/applicationAction.ts
OBJECTSUSED_ADD    // Adicionar objeto ao canvas (com GUID único)
OBJECTSUSED_EDIT   // Editar dados de objeto específico
OBJECTSUSED_REMOVE // Remover objeto do canvas
OBJECTSUSED_MOVE   // Reordenar objetos no canvas
```

### Padrão de Renderização Dinâmica

```typescript
// src/views/editor/editor.tsx
{props.objectsUsed.map((o, i) => {
  const Component = ObjectElements.find(element => element.type === o.type)?.element;
  return Component ? React.createElement(Component, { 
    object: o, 
    index: i, 
    mode: "edit" 
  }) : null;
})}
```

### Diferenças da Arquitetura Original

**✅ Mantido do Design Original**:
- Redux pattern com connectUtil
- Tipagem forte com TypeScript
- Estrutura modular de componentes
- Padrão de exportação ConnectedComponent

**🔄 Simplificado na Implementação**:
- **Objetos**: Interface mais simples (Object vs BaseObjectProps complexa)
- **Modos**: 'edit'/'view' vs 'editor'/'preview'
- **Dados**: Record<string, unknown> vs tipagem específica rígida
- **Posicionamento**: Lista sequencial vs coordenadas livres
- **Estilo**: CSS inline básico vs styled-components avançado

**📝 Para Implementações Futuras**:
- Sistema de temas dinâmico
- React Quill para rich text
- Configurações por objeto (.config.ts)
- Sistema de posicionamento livre
- Undo/Redo com histórico
- Múltipla seleção
- Export/Import JSON

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

### Regras de Ouro para o Coap (Atualizadas)

- **SEMPRE** usar o padrão ObjectMode ("edit" | "view")
- **SEMPRE** implementar interface IBaseObjectProps nos objetos específicos
- **SEMPRE** usar BaseObject como wrapper universal
- **SEMPRE** separar lógica de edição e visualização no mesmo componente
- **SEMPRE** tipar dados específicos (ex: TextData) via casting de object.data
- **SEMPRE** conectar ao Redux via connectUtil para ações de CRUD
- **SEMPRE** usar GUID único para instâncias (gerado automaticamente no AddObject)
- **SEMPRE** distinguir templates (ObjectsList) de instâncias (ObjectsUsed)
- **SEMPRE** implementar callbacks de edição via EditObject action
- **SEMPRE** registrar novos tipos em ObjectElements para renderização dinâmica
- **SEMPRE** considerar performance (monitoramento FPS automático)
- **SEMPRE** seguir convenções de naming e estrutura de arquivos
- **SEMPRE** implementar drag & drop via BaseObject (já integrado)
- **SEMPRE** usar React.createElement para renderização dinâmica no canvas

## Comandos de Desenvolvimento

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento Vite
npm run build           # Build para produção
npm run lint            # Linting ESLint
npm run preview         # Preview da build

# Dependências já instaladas
npm i react react-dom    # Core React
npm i @reduxjs/toolkit react-redux  # Estado global
npm i styled-components  # Estilização
npm i typescript @types/react @types/react-dom  # TypeScript
npm i i18next react-i18next i18next-browser-languagedetector  # Internacionalização
```

## Diretrizes para Expansão

### Adicionando Novo Tipo de Objeto

1. **Criar estrutura**:
```
src/components/objects/newType/
├── newType.tsx         # Componente principal
└── newType.styles.ts   # Estilos (opcional)
```

2. **Implementar componente**:
```typescript
export interface NewTypeData {
  // definir estrutura de dados específica
}

function NewTypeObject(props: NewTypeProps) {
  const data = props.object.data as unknown as NewTypeData;
  
  return (
    <BaseObject object={props.object} index={props.index} mode={props.mode}>
      {props.mode === 'edit' ? (
        // interface de edição
      ) : (
        // interface de visualização
      )}
    </BaseObject>
  );
}
```

3. **Registrar no sistema**:
```typescript
// src/types/objects/index.tsx
export type ObjectType = 'title' | 'text' | 'image' | 'newType';

// Adicionar ao InitialObjects
export const InitialObjects = [
  // ... objetos existentes
  {
    id: "new-template",
    type: 'newType' as ObjectType,
    label: 'Novo Tipo',
    icon: '🆕',
    data: {
      // dados padrão
    } as NewTypeData
  }
];

// Adicionar ao ObjectElements
export const ObjectElements = [
  // ... elementos existentes
  {
    type: 'newType' as ObjectType,
    element: NewTypeObject,
  }
];
```

4. **Importar e exportar**:
```typescript
// src/types/objects/index.tsx
import NewTypeObject from "../../components/objects/newType/newType.tsx";
import type { NewTypeData } from "../../components/objects/newType/newType.tsx";
```

### Adicionando Nova View

1. Criar pasta em `src/views/newView/`
2. Implementar componente principal conectado ao Redux
3. Consumir `ObjectsUsed` para renderizar objetos
4. Usar mesmo padrão de renderização dinâmica do Editor

### Expandindo Funcionalidades

**Para Rich Text (React Quill)**:
- Instalar: `npm install react-quill`
- Substituir textarea por ReactQuill nos componentes
- Adicionar configurações específicas por tipo

**Para Temas Dinâmicos**:
- Implementar wrapper styled-components
- Adicionar sistema de ThemeProvider
- Usar `${styled.themeLayer}` nos estilos

**Para Export/Import**:
- Serializar `ObjectsUsed` para JSON
- Implementar actions EXPORT_CONTENT / IMPORT_CONTENT
- Adicionar validação de estrutura na importação

**Para Undo/Redo**:
- Adicionar campo `history` ao ApplicationState
- Implementar actions UNDO / REDO
- Capturar snapshots antes de mudanças em ObjectsUsed
