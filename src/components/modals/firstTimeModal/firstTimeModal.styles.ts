import styled from 'styled-components';

export const ModalContent = styled.div`
  text-align: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
`;

export const ModalTitle = styled.h2`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

export const ModalDesc = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

export const ModalButtonBase = styled.button`
  border: none;
  border-radius: 6px;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  transition: background 0.2s, color 0.2s;
`;

export const ModalButtonAccept = styled(ModalButtonBase)`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

export const ModalButtonDeny = styled(ModalButtonBase)`
  background: ${({ theme }) => theme.colors.error};
  color: #fff;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;
