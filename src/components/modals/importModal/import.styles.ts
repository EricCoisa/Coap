import styled from 'styled-components';

export const ImportModalContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

export const ImportTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 1rem;
  padding: 0.75rem;
  resize: vertical;
`;

export const ImportButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-right: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

export const ExempleButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-right: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  transition: background 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

export const CancelButton = styled(ImportButton)`
  background: ${({ theme }) => theme.colors.error};
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;
