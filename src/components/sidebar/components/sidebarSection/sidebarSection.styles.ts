import styled from 'styled-components';
import { mediaQueries } from '../../../../styles/breakpoints';

export const SidebarSectionContainer = styled.div`
  margin-bottom: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;

  &:last-child {
    margin-bottom: 0;
  }

  ${mediaQueries.mobile} {
    margin-bottom: 0.75rem;
    
    /* No mobile, usa layout flex para otimizar espaço */
    display: flex;
    flex-direction: column;
    
    &:last-child {
      margin-bottom: 0;
    }
  }

  ${mediaQueries.sidebarCollapse} {
    /* Layout mais compacto para mobile */
    margin-bottom: 0.5rem;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const SidebarSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.objectBackground || '#f8f9fa'};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  ${mediaQueries.mobile} {
    padding: 0.5rem 0.75rem;
  }

  ${mediaQueries.sidebarCollapse} {
    /* Header mais compacto no mobile */
    padding: 0.4rem 0.75rem;
    background: ${({ theme }) => theme.colors.primary}15;
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary}30;
  }
`;

export const SidebarSectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};

  ${mediaQueries.mobile} {
    font-size: 0.9rem;
  }

  ${mediaQueries.sidebarCollapse} {
    font-size: 0.85rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SidebarSectionToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all ${({ theme }) => theme.transitions.normal};
  font-size: 0.875rem;
  
  &:hover {
    background: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const SidebarSectionContent = styled.div<{ $isCollapsed: boolean }>`
  padding: ${({ $isCollapsed }) => $isCollapsed ? '0' : '1rem'};
  max-height: ${({ $isCollapsed }) => $isCollapsed ? '0' : '40vh'};
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.3s ease;
  opacity: ${({ $isCollapsed }) => $isCollapsed ? '0' : '1'};

  ${mediaQueries.mobile} {
    padding: ${({ $isCollapsed }) => $isCollapsed ? '0' : '0.75rem'};
    max-height: ${({ $isCollapsed }) => $isCollapsed ? '0' : '30vh'};
    overflow-y: auto;
  }

  ${mediaQueries.sidebarCollapse} {
    /* Conteúdo mais compacto e otimizado para mobile */
    padding: ${({ $isCollapsed }) => $isCollapsed ? '0' : '0.5rem'};
    max-height: ${({ $isCollapsed }) => $isCollapsed ? '0' : '25vh'};
    display: ${({ $isCollapsed }) => $isCollapsed ? 'none' : 'flex'};
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors.border} transparent;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.border};
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.colors.primary};
    }
  }
`;
