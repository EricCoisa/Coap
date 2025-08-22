import styled from 'styled-components';
import { mediaQueries } from '../../styles/breakpoints';

export const Sidebar = styled.aside<{ $isMinimized?: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1.5rem;
  height: fit-content;
  box-shadow: ${({ theme }) => theme.boxShadow};
  position: sticky;
  top: 80px;
  z-index: 10;
  max-height: calc(100vh - 96px);
  overflow-y: auto;

  ${mediaQueries.sidebarCollapse} {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    margin: 0;
    border-radius: 0;
    border-left: none;
    border-right: none;
    padding: ${({ $isMinimized }) => $isMinimized ? '0.75rem 1.5rem' : '1.5rem'};
    max-height: ${({ $isMinimized }) => $isMinimized ? '60px' : '40vh'};
    z-index: ${({ theme }) => theme.zIndex.sidebar};
    transition: all 0.3s ease;
  }
`;

export const MinimizeButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background: ${({ theme }) => theme.colors.objectBackground};
  }

  ${mediaQueries.sidebarCollapse} {
    display: block;
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.1rem;

  ${mediaQueries.sidebarCollapse} {
    margin-bottom: 0;
  }
`;

export const SidebarContent = styled.div<{ $isMinimized?: boolean }>`
  ${mediaQueries.sidebarCollapse} {
    display: ${({ $isMinimized }) => $isMinimized ? 'none' : 'block'};
  }
`;

export const SidebarTitle = styled.h2<{ $isMinimized?: boolean }>`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 1.5rem 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: 0.5rem;

  ${mediaQueries.sidebarCollapse} {
    margin-bottom: ${({ $isMinimized }) => $isMinimized ? '0' : '1.5rem'};
    border-bottom: ${({ $isMinimized }) => $isMinimized ? 'none' : '2px solid'};
    padding-bottom: ${({ $isMinimized }) => $isMinimized ? '0' : '0.5rem'};
  }
`;
