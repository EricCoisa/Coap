import styled from 'styled-components';
import { mediaQueries } from '../../../../styles/breakpoints';

export const ToolsContent = styled.div<{ $isMinimized?: boolean }>`
  ${mediaQueries.sidebarCollapse} {
    display: ${({ $isMinimized }) => $isMinimized ? 'none' : 'block'};
  }
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
    gap: 0.5rem;
    
    button {
      flex: 1;
      min-width: 120px;
      text-align: center;
      padding: 0.5rem;
      font-size: 0.8rem;
    }
  }
`;


export const ToolsOptions = styled.div`

`;


