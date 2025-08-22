import styled from 'styled-components';
import { mediaQueries } from '../../styles/breakpoints';

export const Sidebar = styled.aside<{ $isMinimized?: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};

  height: fit-content;
  box-shadow: ${({ theme }) => theme.boxShadow};
  position: sticky;
  top: 80px;
  z-index: 10;
  max-height: calc(100vh - 96px);
  overflow-y: auto;

  ${mediaQueries.sidebarCollapse} {
    position: fixed;
    top: ${({ $isMinimized }) => $isMinimized ? '-70vh' : '0'};
    bottom: auto;
    left: 0;
    right: 0;
    margin: 0;
    border-radius: 0;
    border-left: none;
    border-right: none;
    border-top: none;
    padding: ${({ $isMinimized }) => $isMinimized ? '0' : '1rem'};
    max-height: ${({ $isMinimized }) => $isMinimized ? '0' : '70vh'};
    height: ${({ $isMinimized }) => $isMinimized ? '0' : 'auto'};
    z-index: ${({ theme }) => theme.zIndex.sidebar};
    transition: all 0.3s ease;
    overflow: ${({ $isMinimized }) => $isMinimized ? 'hidden' : 'auto'};
    
    /* Layout vertical para mobile */
    display: flex;
    flex-direction: column;
    gap: ${({ $isMinimized }) => $isMinimized ? '0' : '1rem'};
    
    /* Melhora a aparência quando expandido */
    ${({ $isMinimized }) => !$isMinimized && `
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      border-bottom: 2px solid;
      border-image: linear-gradient(90deg, transparent, rgba(0, 122, 204, 0.3), transparent) 1;
    `}
  }
`;

/* Overlay para melhor UX no mobile quando sidebar estiver aberto */
export const SidebarOverlay = styled.div<{ $isVisible: boolean }>`
  display: none;
  
  ${mediaQueries.sidebarCollapse} {
    display: ${({ $isVisible }) => $isVisible ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: ${({ theme }) => theme.zIndex.sidebar - 1};
    backdrop-filter: blur(2px);
    transition: all 0.3s ease;
    opacity: ${({ $isVisible }) => $isVisible ? '1' : '0'};
    pointer-events: ${({ $isVisible }) => $isVisible ? 'auto' : 'none'};
  }
`;

export const MinimizeButton = styled.button<{ $isMinimized?: boolean; $toolbar?: boolean; $currentQuill?: boolean }>`
  display: none;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-top: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: 0 0 ${({ theme }) => theme.borderRadius.sm} ${({ theme }) => theme.borderRadius.sm};
  transition: all ${({ theme }) => theme.transitions.normal};
  box-shadow: ${({ theme }) => theme.boxShadow};
  font-size: 1rem;
  font-weight: 500;
  


  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
  
  ${mediaQueries.sidebarCollapse} {
    display: block;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    z-index: ${({ theme }) => theme.zIndex.sidebar -1 };
    min-width: 80px;
    font-size: 0.95rem;
    padding: 4px 12px;
    box-shadow: none;
    border: none;
    background: ${({ theme, $isMinimized }) => $isMinimized ? theme.colors.primary : theme.colors.surface};
    color: ${({ theme, $isMinimized }) => $isMinimized ? theme.colors.surface : theme.colors.text};
    border-radius: 16px;
        top: ${({ $isMinimized, $toolbar, $currentQuill }) => $isMinimized 
      ? `calc(var(--header-height, ${($toolbar == false && $currentQuill == true) ? '102px' : '56px'}) + 8px)`
      : `calc(var(--sidebar-height, 70vh) + 8px)`};

    /* Usa variáveis CSS para garantir responsividade. Ajuste --header-height e --toolbar-height no layout principal. */
    transition: all 0.1s;
    ${({ $isMinimized }) => $isMinimized && `
      font-weight: 600;
      box-shadow: none;
      border: none;
      animation: none;
    `}
  }

  @keyframes pulse {
    0%, 100% { 
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); 
    }
    50% { 
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25); 
    }
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
