import styled from 'styled-components';
import { flexBetween, flexCenter } from '../../styles/responsive-utils';
import { mediaQueries } from '../../styles/breakpoints';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.headerBackground};
  border-bottom: 1px solid ${({ theme }) => theme.colors.headerBorder};
  box-shadow: ${({ theme }) => theme.headerShadow};
  z-index: ${({ theme }) => theme.zIndex.header};
  height: 64px;
`;

export const HeaderContent = styled.div`
  ${flexBetween};
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;

  ${mediaQueries.mobile} {
    padding: 0 1rem;
  }
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0;
    line-height: 1;
    font-family: ${({ theme }) => theme.fonts.heading};
  }

  span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 2px;
    font-weight: 400;

    ${mediaQueries.mobile} {
      display: none;
    }
  }
`;

export const Navigation = styled.nav`
  ${flexCenter};
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const NavButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${({ theme }) => theme.fonts.body};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  background: ${({ active, theme }) => 
    active ? theme.colors.primary : 'transparent'
  };
  color: ${({ active, theme }) => 
    active ? '#FFFFFF' : theme.colors.text
  };

  &:hover {
    background: ${({ active, theme }) => 
      active ? theme.colors.primary : theme.colors.objectBackground
    };
  }

  &:active {
    transform: translateY(1px);
  }

  ${mediaQueries.mobile} {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
  }
`;

export const Actions = styled.div`
  ${flexCenter};
  gap: 0.75rem;

  ${mediaQueries.mobile} {
    gap: 0.5rem;
  }
`;

export const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${({ theme }) => theme.fonts.body};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.objectBackground};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:active {
    transform: translateY(1px);
  }

  ${mediaQueries.mobile} {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
  }
`;
