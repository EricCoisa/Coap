import styled, { css } from 'styled-components';
import { mediaQueries } from '../../../styles/breakpoints';

export const RichTextContainer = styled.div<{ toolbarState: boolean }>`
  padding: 4px; /* Drasticamente reduzido */
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  /* Mobile: aproveitar toda a largura disponível */
  ${mediaQueries.mobile} {
    padding: 2px; /* Mínimo absoluto */
    width: 100%;
    max-width: 100%;
    margin: 0;
  }
  
  .ql-container {
    flex: 1;
    width: 100%;
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-radius: 0 0 4px 4px;
    font-family: inherit;
    height: auto;

    ${props => !props.toolbarState && css`
      border: none;
    `}

    ${mediaQueries.mobile} {
      width: 100%;
      border-radius: 0 0 6px 6px;
    }
  }
  
  .ql-editor {
    height: auto;
    max-height: none;
    width: 100%;
    font-size: 14px;
    line-height: 1.5;
    overflow-y: auto;
    resize: none !important; /* Remove a capacidade de redimensionar a caixa de texto */
    box-sizing: border-box;
    padding: 12px 15px;
    
    ${mediaQueries.mobile} {
      font-size: 16px; /* Evita zoom automático no iOS */
      padding: 10px 12px;
      min-height: 100px; /* Altura mínima para melhor UX */
    }
  }
  
  .ql-toolbar {
    width: 100%;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-radius: 4px 4px 0 0;
    flex-shrink: 0;
    box-sizing: border-box;
    
    /* Ocultar toolbar quando desabilitada */
    &.ql-toolbar-disabled,
    &[style*="display: none"] {
      display: none !important;
    }
    
    ${mediaQueries.mobile} {
      padding: 8px;
      
      /* Melhor organização dos botões no mobile */
      .ql-formats {
        margin-right: 8px;
        
        &:last-child {
          margin-right: 0;
        }
      }
      
      /* Botões da toolbar maiores no mobile */
      button {
        width: 32px !important;
        height: 32px !important;
        padding: 4px !important;
        margin: 2px !important;
        
        &:hover {
          color: #06c;
          background-color: #f0f0f0;
        }
      }
      
      /* Dropdowns da toolbar */
      .ql-picker {
        line-height: 32px !important;
        
        .ql-picker-label {
          padding: 4px 8px !important;
          font-size: 14px !important;
        }
        
        .ql-picker-options {
          max-height: 200px !important;
          overflow-y: auto !important;
          
          .ql-picker-item {
            padding: 8px 12px !important;
            font-size: 14px !important;
          }
        }
      }
      
      /* Header picker específico */
      .ql-header .ql-picker-label {
        font-size: 13px !important;
      }
    }
  }
  
  /* Melhorar tooltips no mobile */
  .ql-tooltip {
    ${mediaQueries.mobile} {
      left: 10px !important;
      right: 10px !important;
      width: auto !important;
      
      input {
        font-size: 16px !important; /* Evita zoom no iOS */
        padding: 8px !important;
      }
      
      .ql-action, .ql-remove {
        margin-left: 8px !important;
        padding: 4px 8px !important;
      }
    }
  }
  
  /* Garantir que container sem toolbar tenha border apropriada */
  &.no-toolbar {
    .ql-container {
      border: none !important; /* Remove a borda quando toolbarState for falso */
    }
  }

  &.view-mode {
    padding: 0;
    
    .ql-toolbar {
      display: none !important;
    }
    
    .ql-container {
      border: none !important;
      border-radius: 0;
      background: transparent !important;
    }
    
    .ql-editor {
      padding: 0 !important;
      margin: 0 !important;
      background: transparent !important;
      border: none !important;
      outline: none !important;
      resize: none !important;
      cursor: default !important;
      overflow: visible !important;
      min-height: auto !important;
      
      /* Remove qualquer indicação visual de editor */
      &:hover, &:focus, &:active {
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
      }
      
      /* Remove padding e margin padrão do Quill */
      &.ql-blank::before {
        display: none !important;
      }
    }
    
    /* Remove qualquer tooltip ou elemento flutuante do Quill */
    .ql-tooltip {
      display: none !important;
    }
    
    /* Remove qualquer cursor ou seleção visual */
    .ql-cursor {
      display: none !important;
    }
  }
  
  .hidden {
    display: none !important;
  }

  /* Estilo para toolbar fixa no topo */
  .ql-toolbar.fixed-toolbar {
    position: fixed !important;
    top: 60px !important; /* Assumindo altura do header de 60px */
    z-index: 999 !important; /* Abaixo do header mas acima de outros elementos */
    background-color: #ffffff !important;
    border-bottom: 1px solid #ccc !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
    backdrop-filter: blur(4px) !important;
    border-radius: 0 !important;
    margin: 0 !important;
    border-radius: 0 0 10px 10px !important;
    /* Garantir que a toolbar seja visível */
    display: block !important;
    z-index: 10000 !important;
    /* Animação suave */
    transition: all 0.3s ease !important;

    /* Seguir exatamente o layout do editor */
    /* Desktop: 250px + gap de 0.5rem = 250px + 8px */
    left: calc(250px + 4rem) !important;
    right: 0 !important;
    width: auto !important;

    /* Tablet: 200px + gap de 0.25rem = 200px + 4px */
    @media (max-width: 1200px) {
      left: calc(200px + 0.8rem) !important;
    }
    
    /* Mobile: sidebar colapsa, toolbar ocupa área do editor */
    @media (max-width: 900px) {
      left: 0 !important;
      right: 0 !important;
      top: 63px !important; /* Header + sidebar colapsada */
      width: 100% !important;
    }

    /* Garantir que não ultrapasse os limites do container responsivo */
    max-width: calc(1400px - 250px - 0.5rem) !important; /* Desktop */
    
    @media (max-width: 1200px) {
      max-width: calc(100vw - 200px - 0.25rem) !important; /* Tablet */
    }
    
    @media (max-width: 900px) {
      max-width: 100vw !important; /* Mobile */
    }
  }
`;

export const RichTextViewer = styled.div`
  padding: 8px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  
  ${mediaQueries.mobile} {
    padding: 6px;
    font-size: 16px; /* Evita zoom automático no iOS */
    line-height: 1.4;
  }
  
  /* Estilos para elementos HTML do Quill */
  h1, h2, h3, h4, h5, h6 {
    margin: 0.5em 0;
    
    ${mediaQueries.mobile} {
      margin: 0.4em 0;
    }
  }
  
  p {
    margin: 0.5em 0;
    
    ${mediaQueries.mobile} {
      margin: 0.4em 0;
    }
  }
  
  ul, ol {
    margin: 0.5em 0;
    padding-left: 1.5em;
    
    ${mediaQueries.mobile} {
      margin: 0.4em 0;
      padding-left: 1.2em;
    }
  }
  
  blockquote {
    border-left: 4px solid #ccc;
    margin: 0.5em 0;
    padding-left: 1em;
    font-style: italic;
    
    ${mediaQueries.mobile} {
      margin: 0.4em 0;
      padding-left: 0.8em;
      border-left-width: 3px;
    }
  }
  
  strong {
    font-weight: bold;
  }
  
  em {
    font-style: italic;
  }
  
  u {
    text-decoration: underline;
  }
  
  s {
    text-decoration: line-through;
  }
  
  /* Melhorar tabelas no mobile se existirem */
  table {
    ${mediaQueries.mobile} {
      font-size: 14px;
      width: 100%;
      overflow-x: auto;
      display: block;
      white-space: nowrap;
    }
  }
  
  /* Melhorar código no mobile */
  code {
    ${mediaQueries.mobile} {
      font-size: 14px;
      word-break: break-all;
    }
  }
  
  pre {
    ${mediaQueries.mobile} {
      font-size: 14px;
      overflow-x: auto;
      white-space: pre-wrap;
    }
  }
`;
