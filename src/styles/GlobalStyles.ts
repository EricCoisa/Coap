import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Regras globais para impressão: preview fiel */
  @media print {
    body {
      background: #fff !important;
      color: #000 !important;
      box-shadow: none !important;
    }
    #preview-area {
      background: #fff !important;
      box-shadow: none !important;
      border: none !important;
      padding: 0 !important;
    }
    #preview-area > div {
      page-break-after: always;
      break-after: always;
      box-shadow: none !important;
      border-radius: 0 !important;
      background: #fff !important;
      padding: 0 !important;
    }
    #preview-area > div:last-child {
      page-break-after: auto;
      break-after: auto;
    }
    img, .main-image {
      max-width: 90vw !important;
      max-height: 400px !important;
      width: auto !important;
      height: auto !important;
      box-shadow: none !important;
      border-radius: 8px !important;
      display: block !important;
      margin: 0 auto !important;
      object-fit: contain !important;
    }
    .ql-editor {
      color: #000 !important;
      background: #fff !important;
    }
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-family: ${({ theme }) => theme.fonts.body};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* Mobile: garantir que elementos usem toda largura disponível */
  @media (max-width: 768px) {
    html, body {
      width: 100%;
      max-width: 100%;
    }
    
    /* Remover padding padrão que pode limitar largura */
    body {
      padding: 0;
      margin: 0;
    }
  }

  button {
    font-family: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* Scrollbar personalizada */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.textSecondary};
  }

  /* Focus styles para acessibilidade */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Utilities */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;
