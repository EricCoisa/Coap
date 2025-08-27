# 🎓 Coap - Construtor de Objetos de Aprendizagem

> Uma plataforma moderna e intuitiva para criação de materiais didáticos interativos

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-purple?logo=vite)](https://vitejs.dev/)
[![Styled Components](https://img.shields.io/badge/Styled--Components-6.0-pink?logo=styled-components)](https://styled-components.com/)

## ✨ O que é o Coap?

O **Coap** é uma ferramenta visual drag-and-drop para criação de conteúdos educacionais, similar ao Canva ou Wix, mas focada especificamente em materiais didáticos. Com uma interface intuitiva, permite que educadores, designers instrucionais e criadores de conteúdo montem rapidamente materiais interativos sem necessidade de conhecimento técnico.

### 🚀 Principais Funcionalidades

- **📝 Editor Visual**: Interface drag-and-drop para montagem de conteúdo
- **🔄 Preview em Tempo Real**: Visualização instantânea do resultado final
- **✏️ Rich Text Editor**: Editor de texto rico integrado com Quill.js
- **🎨 Objetos Reutilizáveis**: Componentes modulares (texto, título, imagem, etc.)
- **📱 Responsivo**: Adapta-se a diferentes tamanhos de tela
- **🔧 Altamente Customizável**: Toolbar e formatos personalizáveis

## 🎥 Demo

[Coap](https://coap.ericvitor.com.br/)

*Editor visual com objetos sendo adicionados e editados em tempo real*

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Styled Components** - CSS-in-JS
- **Redux Toolkit** - Gerenciamento de estado

### Editor
- **Quill.js** - Editor de texto rico
- **React DnD** - Drag and drop (planejado)

## 🏗️ Arquitetura do Sistema

### 📋 Editor
O módulo de edição oferece:
- Sidebar com paleta de objetos disponíveis
- Canvas principal para montagem do conteúdo
- Propriedades editáveis para cada objeto
- Sistema de drag-and-drop para organização

### 👁️ Preview
O módulo de visualização:
- Renderiza o conteúdo no modo somente leitura
- Utiliza os mesmos componentes, mas em modo `view`
- Ideal para apresentação e validação do material

### 🧱 Objetos Suportados

| Objeto | Descrição | Funcionalidades |
|--------|-----------|----------------|
| **Texto** | Conteúdo textual rico | Formatação, cores, alinhamento |
| **Título** | Cabeçalhos e títulos | Diferentes tamanhos, estilos |
| **Imagem** | Mídia visual | Upload, redimensionamento |
| **RichText** | Editor avançado | Toolbar customizável, formatos flexíveis |

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/EricCoisa/Coap.git

# Entre no diretório
cd Coap

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

Acesse `http://localhost:5173` para ver a aplicação em funcionamento.

## 📖 Como Usar

1. **Adicione Objetos**: Arraste elementos da sidebar para o canvas
2. **Edite Conteúdo**: Clique nos objetos para editá-los
3. **Visualize**: Use o preview para ver o resultado final
4. **Organize**: Reordene os elementos conforme necessário

## 🎯 Casos de Uso

- **Educadores**: Criação de materiais didáticos interativos
- **Designers Instrucionais**: Prototipagem rápida de conteúdos
- **Instituições de Ensino**: Padronização de materiais educacionais
- **Cursos Online**: Criação de lições e módulos

## 🔧 Customização

### Rich Text Editor
```tsx
<RichText
  value={content}
  setValue={handleChange}
  mode="edit"
  toolbar={[
    ['bold', 'italic'],
    [{ 'header': [1, 2, 3] }],
    ['clean']
  ]}
  formats={['bold', 'italic', 'header']}
/>
```

### Objetos Personalizados
O sistema é extensível - novos tipos de objetos podem ser facilmente adicionados seguindo o padrão de interfaces existente.

## �️ Roadmap

- [ ] Sistema completo de drag-and-drop
- [ ] Templates pré-definidos
- [ ] Exportação em múltiplos formatos
- [ ] Colaboração em tempo real
- [ ] Biblioteca de assets
- [ ] Integração com LMS

## 🤝 Contribuindo

Contribuições são bem-vindas! Veja nossa [documentação de contribuição](CONTRIBUTING.md) para mais detalhes.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Eric** - [GitHub](https://github.com/EricCoisa)

---

<p align="center">
  Feito com ❤️ para democratizar a criação de conteúdos educacionais
</p>
