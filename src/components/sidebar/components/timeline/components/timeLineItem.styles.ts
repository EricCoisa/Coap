import styled from 'styled-components';
import { mediaQueries } from '../../../../../styles/breakpoints';

export const TimeLineItemCard = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  text-align: left;

  &:hover {
    background: ${({ theme }) => theme.colors.objectBackground};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.boxShadowHover};
  }

  &:active {
    transform: translateY(0);
  }

  .item-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.objectBackground};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  .item-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 0;
  }

  .item-name {
    font-weight: 600;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-type {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textSecondary || '#6c757d'};
    font-weight: 400;
    text-transform: capitalize;
  }

  .item-index {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textSecondary || '#6c757d'};
    font-weight: 500;
    background: ${({ theme }) => theme.colors.objectBackground};
    padding: 0.25rem 0.5rem;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    flex-shrink: 0;
  }

  ${mediaQueries.mobile} {
    padding: 0.5rem;
    gap: 0.5rem;

    .item-icon {
      width: 1.75rem;
      height: 1.75rem;
      font-size: 1rem;
    }

    .item-name {
      font-size: 0.8rem;
    }

    .item-type {
      font-size: 0.7rem;
    }

    .item-index {
      font-size: 0.7rem;
      padding: 0.2rem 0.4rem;
    }
  }
`;
