# Arquitetura de Objetos - Coap (Simplificada)

## Conceitos Principais

### 1. **InitialObjects** - Templates/Paleta
```typescript
// Lista de tipos de componentes disponíveis (como uma paleta de ferramentas)
export const InitialObjects = [
  {
    id: 'text-template',
    type: 'text',
    label: 'Texto',
    icon: '📝',
    data: {
      content: 'Digite seu texto aqui...',
      fontSize: 16,
      color: '#000000'
    }
  }
]
```
**Propósito**: Define quais tipos de objetos estão disponíveis na sidebar para o usuário arrastar.

### 2. **Object.data** - Dados da Instância
```typescript
data?: Record<string, unknown>; // Dados específicos de cada instância
```
**Exemplos**:
- Texto: `{ content: "Meu texto", fontSize: 16, color: "#000" }`
- Imagem: `{ src: "url", width: 300, height: 200, alt: "descrição" }`
- Título: `{ content: "Meu título", level: 1, align: "center" }`

### 3. **Object.element** - Componente para Renderização
```typescript
element?: ReactElement; // Componente React que renderiza este tipo
```
**Propósito**: Referência ao componente React responsável por renderizar o objeto (TextObject, ImageObject, etc.)

### 4. **Fluxo de Funcionamento**

#### Passo 1: Usuário arrasta da paleta
```typescript
// InitialObjects serve como template
const template = InitialObjects[0]; // Template "texto"
```

#### Passo 2: Criar instância única
```typescript
// Usar objectUtils para criar instância
const newObject = createObjectFromTemplate(template);
// Resultado: { id: "text-12345", type: "text", data: {...} }
```

#### Passo 3: Adicionar ao editor
```typescript
// Adicionar ao ObjectsUsed no Redux
dispatch(AddObject(newObject));
```

#### Passo 4: Renderização
```typescript
// O componente TextObject recebe o objeto e renderiza
<TextObject object={newObject} index={0} />
```

## Estrutura de Arquivos

```
src/
├── types/objects/index.tsx           # Definições de tipos e InitialObjects
├── utils/objectUtils.ts              # Funções para criar/duplicar objetos
├── components/objects/
│   ├── BaseObjectContainer.tsx       # Container com drag/drop/remove
│   ├── text/text.Tsx                # Componente de texto
│   └── title/title.Tsx              # Componente de título (futuro)
└── store/application/                # Redux para gerenciar ObjectsUsed
```

## Responsabilidades Claras

### InitialObjects (Templates)
- ✅ Lista tipos disponíveis na paleta
- ✅ Define dados padrão para novos objetos
- ✅ Não são instâncias, são templates

### Object.data
- ✅ Armazena dados específicos da instância
- ✅ Conteúdo editável pelo usuário
- ✅ Configurações de estilo

### BaseObjectContainer
- ✅ Funcionalidades de drag/drop
- ✅ Botão de remoção
- ✅ Integração com Redux
- ✅ Container visual

### Componentes Específicos (TextObject)
- ✅ Interface de edição (textarea, inputs)
- ✅ Renderização dos dados
- ✅ Lógica específica do tipo

## Exemplo Prático

```typescript
// 1. Template na paleta
const textTemplate = {
  id: 'text-template',
  type: 'text',
  label: 'Texto',
  data: { content: 'Digite aqui...', fontSize: 16 }
};

// 2. Usuário arrasta → criar instância
const instance1 = createObjectFromTemplate(textTemplate);
// { id: 'text-abc123', type: 'text', data: { content: 'Digite aqui...', fontSize: 16 } }

// 3. Usuário edita o conteúdo
instance1.data.content = 'Meu texto personalizado';

// 4. Usuário adiciona outro texto
const instance2 = createObjectFromTemplate(textTemplate);
// { id: 'text-def456', type: 'text', data: { content: 'Digite aqui...', fontSize: 16 } }

// Resultado: Dois objetos independentes com dados únicos
```

## Sem Confusão
- ❌ **Removido**: `instance` (classe BaseObjectComponent)
- ❌ **Removido**: Herança complexa de classes
- ✅ **Simplificado**: Componentes React funcionais
- ✅ **Claro**: data = dados da instância, element = componente de renderização
