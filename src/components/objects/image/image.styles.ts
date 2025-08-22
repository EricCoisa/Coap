import styled from 'styled-components';
import { mediaQueries } from '../../../styles/breakpoints';

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  
  ${mediaQueries.mobile} {
    gap: 0.75rem;
  }

  /* Título da imagem */
  .image-title {
    width: 100%;
    
    .ql-editor {
      text-align: center;
      font-weight: 600;
      min-height: 2rem;
      
      ${mediaQueries.mobile} {
        min-height: 1.5rem;
      }
    }
  }

  /* Seção de upload */
  .image-upload-section {
    background: #f8f9fa;
    border: 2px dashed #dee2e6;
    border-radius: 8px;
    padding: 1rem;
    margin: 0.5rem 0;
    
    ${mediaQueries.mobile} {
      padding: 0.75rem;
    }
  }

  /* Botão de colapso */
  .collapse-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    padding: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #495057;
    cursor: pointer;
    transition: color 0.2s ease;
    width: 100%;
    justify-content: center;
    
    &:hover {
      color: #007acc;
    }
    
    &:focus {
      outline: 2px solid #007acc;
      outline-offset: 2px;
      border-radius: 4px;
    }

    .arrow {
      transition: transform 0.3s ease;
      font-size: 0.75rem;
      
      &.collapsed {
        transform: rotate(-90deg);
      }
      
      &.expanded {
        transform: rotate(0deg);
      }
    }
  }

  .upload-controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    padding-top: 1rem;

    /* Desktop: layout em linha para economizar espaço */
    @media (min-width: 769px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1.5rem;
    }

    ${mediaQueries.mobile} {
      gap: 0.75rem;
      padding-top: 0.75rem;
    }
  }

  /* Botão de upload melhorado */
  .upload-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #007acc, #0056b3);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 122, 204, 0.2);
    text-decoration: none;
    white-space: nowrap;

    /* Desktop: botão mais compacto */
    @media (min-width: 769px) {
      flex-shrink: 0;
      padding: 0.625rem 1.25rem;
      font-size: 0.875rem;
      align-self: flex-end; /* Alinha com os inputs */
      margin-bottom: 0.375rem; /* Compensa altura do label */
    }

    &:hover {
      background: linear-gradient(135deg, #0056b3, #004085);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 122, 204, 0.3);
    }

    &:active {
      transform: translateY(0);
    }

    ${mediaQueries.mobile} {
      padding: 0.625rem 1.25rem;
      font-size: 0.875rem;
    }
  }

  /* Grupos de input */
  .url-input-group,
  .alt-input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    max-width: 400px;

    /* Desktop: largura flexível para caber em linha */
    @media (min-width: 769px) {
      flex: 1;
      max-width: none;
      min-width: 200px;
    }

    label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #495057;

      @media (min-width: 769px) {
        font-size: 0.8rem;
        white-space: nowrap;
      }
    }
  }

  .url-input,
  .alt-input {
    padding: 0.75rem;
    border: 2px solid #dee2e6;
    border-radius: 6px;
    font-size: 0.875rem;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: #007acc;
      box-shadow: 0 0 0 3px rgba(0, 122, 204, 0.1);
    }

    &::placeholder {
      color: #6c757d;
    }

    ${mediaQueries.mobile} {
      font-size: 16px; /* Evita zoom no iOS */
    }
  }

  /* Container da imagem centralizada */
  .image-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    position: relative;

    ${mediaQueries.mobile} {
      min-height: 150px;
    }
  }

  /* Imagem principal */
  .main-image {
    max-width: 100%;
    max-height: 500px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.02);
    }

    ${mediaQueries.mobile} {
      max-height: 300px;
    }
  }

  /* Placeholder da imagem */
  .image-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    border: 2px dashed #dee2e6;
    border-radius: 8px;
    background: #f8f9fa;
    color: #6c757d;
    text-align: center;
    padding: 2rem;
    width: 100%;

    ${mediaQueries.mobile} {
      min-height: 150px;
      padding: 1.5rem;
    }

    .placeholder-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;

      ${mediaQueries.mobile} {
        font-size: 2.5rem;
        margin-bottom: 0.75rem;
      }
    }

    p {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 500;
    }
  }

  /* Erro de carregamento */
  .image-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100px;
    background: #f8d7da;
    border: 1px solid #f5c6cb;
    border-radius: 6px;
    color: #721c24;
    padding: 1rem;
    text-align: center;

    .error-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 500;
    }

    &.hidden {
      display: none;
    }
  }

  /* Fonte da imagem */
  .image-source {
    width: 100%;
    
    .ql-editor {
      text-align: center;
      font-style: italic;
      font-size: 0.875rem;
      color: #6c757d;
      min-height: 1.5rem;
      
      ${mediaQueries.mobile} {
        font-size: 0.8rem;
        min-height: 1.25rem;
      }
    }

    .ql-toolbar {
      justify-content: center;
    }
  }
`;
