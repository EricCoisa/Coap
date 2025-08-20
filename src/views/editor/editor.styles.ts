import styled from 'styled-components';
import { editorLayout } from '../../styles/responsive-utils';
import { mediaQueries } from '../../styles/breakpoints';

export const EditorContainer = styled.div`
  min-height: calc(100vh - 64px);
  background: ${({ theme }) => theme.colors.background};
  padding-top: 64px; /* Compensa o header fixo */
`;

export const EditorContent = styled.div`
  ${editorLayout};
  width: 100%;
  padding: 2rem 1.5rem;
  min-height: calc(100vh - 64px - 4rem);

  ${mediaQueries.mobile} {
    padding: 1rem;
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
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.boxShadow};
  min-height: 600px;
  display: flex;
  flex-direction: column;

  ${mediaQueries.mobile} {
    padding: 1.5rem;
    min-height: 400px;
  }
`;

export const CanvasTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 2rem 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: 1rem;

  ${mediaQueries.mobile} {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;

export const CanvasArea = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.objectBackground};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  text-align: left;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.body};
  gap: 2rem;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
  }

  > * {
    width: 100%;
    margin: 0 auto;
  }

  p {
    margin: 0;
    max-width: 300px;
  }

  ${mediaQueries.mobile} {
    padding: 2rem 1rem;
    font-size: 0.875rem;
    gap: 1rem;
  }
`;
