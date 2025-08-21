import styled from 'styled-components';
import { mediaQueries } from '../../styles/breakpoints';

export const Sidebar = styled.aside`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1.5rem;
  height: fit-content;
  box-shadow: ${({ theme }) => theme.boxShadow};

  ${mediaQueries.sidebarCollapse} {
    margin-bottom: 1rem;
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


export const ToolsOptions = styled.div`

`;

