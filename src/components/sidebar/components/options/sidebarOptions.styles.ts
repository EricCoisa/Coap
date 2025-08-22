import styled from 'styled-components';
import { mediaQueries } from '../../../../styles/breakpoints';


export const SideBarContent = styled.div<{ $isMinimized?: boolean }>`
  ${mediaQueries.sidebarCollapse} {
    display: ${({ $isMinimized }) => $isMinimized ? 'none' : 'block'};
  }
`;

export const TimeLineTitle = styled.h3<{ $isMinimized?: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 1rem 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: 0.5rem;

  ${mediaQueries.sidebarCollapse} {
    margin-bottom: ${({ $isMinimized }) => $isMinimized ? '0' : '1rem'};
    border-bottom: ${({ $isMinimized }) => $isMinimized ? 'none' : '2px solid'};
    padding-bottom: ${({ $isMinimized }) => $isMinimized ? '0' : '0.5rem'};
    font-size: 0.9rem;
  }
`;

export const SideBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  ${mediaQueries.sidebarCollapse} {
    gap: 0.375rem;
  }
`;