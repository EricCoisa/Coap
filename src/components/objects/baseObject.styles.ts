import styled, { keyframes } from 'styled-components';

// Animação para pulse effect nas drop zones
export const pulseAnimation = keyframes`
  0%, 100% { 
    opacity: 0.8;
  }
  50% { 
    opacity: 1;
  }
`;

// Container principal do BaseObject
export const BaseObjectContainer = styled.div`

  position: relative;
  margin-bottom: 0.75rem; /* Reduzido de 1rem */
  border-radius: 8px;
  padding: 12px; /* Reduzido de 16px */
  transition: all 0.3s ease;

  /* Estilos mobile - aproveitar melhor a largura da tela */
  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0.5rem; /* Ainda menor no mobile */
    padding: 15px 0px; /* Padding mínimo no mobile */
    border-radius: 6px;
  }
`;

// Container dos botões de ação
export const ActionButtonsContainer = styled.div`
  position: absolute;
  top: 40px;
  right: -28px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 15;
  align-items: center;

  /* Ajustes mobile para os botões */
  @media (max-width: 768px) {
    right: 50px;
    flex-direction: row;
    top: -15px;
    gap: 6px;
  }
`;

// Estilo base para botões (garantir mesmo tamanho)
const BaseButton = styled.div`
  width: 28px;
  height: 28px;
  min-width: 28px;
  min-height: 28px;
  max-width: 28px;
  max-height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  font-size: 14px;
  border: none;
  outline: none;

  /* Botões maiores e mais touch-friendly no mobile */
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
    max-width: 36px;
    max-height: 36px;
    border-radius: 6px;
    font-size: 16px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
  }
`;

// Botão de remover
export const RemoveButton = styled(BaseButton).attrs({ as: 'button' })`
  background: #e53e3e;
  color: #fff;

  &:hover {
    background: #c53030;
    transform: scale(1.05);
  }
`;
