import styled from 'styled-components';

export const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(8px, 2vw, 10px);
  min-height: 44px;
  max-width: 44px;
`;

export const SwitchButton = styled.button<{ checked: boolean }>`
  width: clamp(36px, 8vw, 44px);
  height: clamp(20px, 4vw, 24px);
  border-radius: 50px;
  background: ${({ checked, theme }) => checked ? theme.colors.primary : theme.colors.cardBackground};
  border: 2px solid ${({ checked, theme }) => checked ? theme.colors.primary : 'rgba(255,255,255,0.2)'};
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  padding: 0;
  flex-shrink: 0;
  min-width: 40px !important;

  span {
    position: absolute;
    top: 50%;
    left: ${({ checked }) => checked ? 'calc(100% - 18px)' : '2px'};
    width: clamp(14px, 3vw, 16px);
    height: clamp(14px, 3vw, 16px);
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;
    transform: translateY(-50%);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  &:hover {
    transform: scale(1.05);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 22px;
    
    span {
      width: 16px;
      height: 16px;
      left: ${({ checked }) => checked ? '22px' : '2px'};
    }
  }
`;

export const SwitchLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-weight: 500;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;
