import styled from 'styled-components';
import { editorLayout } from '../../styles/responsive-utils';
import { mediaQueries } from '../../styles/breakpoints';

export const EditorContainer = styled.div<{ $sidebarExpanded?: boolean }>`
  min-height: calc(100vh - 64px);
  background: ${({ theme }) => theme.colors.background};
  padding-top: 64px; /* Compensa o header fixo */

  ${mediaQueries.sidebarCollapse} {
    padding-top: ${({ $sidebarExpanded }) => 
      $sidebarExpanded ? 'calc(64px + 40vh + 0.5rem)' : 'calc(64px + 60px + 0.5rem)'
    }; /* Header + sidebar + margem mínima */
    transition: padding-top 0.3s ease;
  }
`;

export const EditorContent = styled.div`
  ${editorLayout};
  width: 100%;
  padding: 1rem 0.5rem; /* Drasticamente reduzido */
  min-height: calc(100vh - 64px - 4rem);

  ${mediaQueries.mobile} {
    padding: 0.25rem; /* Mínimo possível para aproveitar largura */
    width: 100%;
    max-width: 100%;
  }
`;


export const SidebarTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 1.5rem 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: 0.5rem;
`;

export const ToolsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  button {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.875rem;
    font-weight: 500;
    font-family: ${({ theme }) => theme.fonts.body};
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.normal};
    text-align: left;

    &:hover {
      background: ${({ theme }) => theme.colors.objectBackground};
      border-color: ${({ theme }) => theme.colors.primary};
      transform: translateY(-2px);
      box-shadow: ${({ theme }) => theme.boxShadowHover};
    }

    &:active {
      transform: translateY(0);
    }
  }

  ${mediaQueries.sidebarCollapse} {
    flex-direction: row;
    flex-wrap: wrap;
    
    button {
      flex: 1;
      min-width: 120px;
      text-align: center;
    }
  }
`;

export const Canvas = styled.main`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem; /* Reduzido de 2rem */
  box-shadow: ${({ theme }) => theme.boxShadow};
  min-height: 600px;
  display: flex;
  flex-direction: column;

  ${mediaQueries.mobile} {
    padding: 0.5rem; /* Mínimo para dar mais espaço */
    min-height: 400px;
    width: 100%;
    max-width: 100%;
    border-radius: 8px;
    margin: 0; /* Remove qualquer margem */
  }
`;

export const CanvasTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 1rem 0; /* Reduzido de 2rem */
  font-family: ${({ theme }) => theme.fonts.heading};
  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: 0.5rem;

  ${mediaQueries.mobile} {
    font-size: 1.25rem;
    margin-bottom: 0.75rem; /* Ainda mais compacto no mobile */
  }
`;

export const CanvasArea = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.objectBackground};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem 1rem; /* Reduzido drasticamente */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  text-align: left;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  gap: 1rem; /* Reduzido de 2rem */
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
  }

  &.touch-drag-over {
    background: rgba(0, 122, 204, 0.1);
    border-color: #007acc;
    border-style: solid;
  }

  > * {
    width: 100%;
    margin: 0 auto;
  }

  p {
    margin: 0;
 
  }

  ${mediaQueries.mobile} {
    padding: 0.75rem 0.0rem; /* Mínimo para dar máximo espaço */
    font-size: 0.875rem;
    gap: 0.75rem;
    border-radius: 6px;
    margin: 0; /* Remove qualquer margem */
    
    /* Garantir que elementos filhos usem toda a largura */
    > * {
      width: 100%;
      max-width: 100%;
      margin: 0;
    }
  }
`;
