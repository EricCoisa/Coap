import styled, { css, keyframes } from 'styled-components';

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
export const BaseObjectContainer = styled.div<{ 
  $isDragging: boolean; 
  $showDropZones: boolean; 
}>`

  position: relative;
  margin-bottom: 0.75rem; /* Reduzido de 1rem */
  background: ${props => props.$isDragging ? '#f0f0f0' : '#f8f8f8'};
  border-radius: 8px;
  padding: 12px; /* Reduzido de 16px */
  opacity: ${props => props.$isDragging ? 0.5 : 1};
  transition: all 0.3s ease;
  border: ${props => props.$showDropZones && !props.$isDragging ? '2px solid #007acc' : '2px solid transparent'};
  transform: ${props => props.$isDragging ? 'rotate(2deg) scale(1.02)' : 'none'};
  box-shadow: ${props => props.$isDragging ? '0 8px 25px rgba(0, 0, 0, 0.15)' : 'none'};
  z-index: ${props => props.$isDragging ? 1000 : 1};

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
  top: 0px;
  right: -28px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 15;
  align-items: center;

  /* Ajustes mobile para os botões */
  @media (max-width: 768px) {
    right: 0px;
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

// Ícone de arrastar/mover
export const DragIcon = styled(BaseButton).attrs({ as: 'button' })`
  background: #007acc;
  cursor: grab;

  &:hover {
    background: #005a9e;
    transform: scale(1.1);
  }

  &:active {
    cursor: grabbing;
  }

  span {
    color: white;
    font-weight: bold;
    line-height: 1;
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

// Drop Zone Superior
export const DropZoneTop = styled.div<{ activeDropZone: 'top' | 'bottom' | null }>`
  height: 32px; /* Reduzido de 40px */
  background: ${props => props.activeDropZone === 'top' 
    ? 'linear-gradient(135deg, rgba(0, 122, 204, 0.2), rgba(0, 153, 255, 0.3))'
    : 'linear-gradient(135deg, rgba(0, 122, 204, 0.1), rgba(0, 153, 255, 0.15))'};
  border: 3px dashed #007acc;
  border-radius: 8px;
  margin-bottom: 6px; /* Reduzido de 8px */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #007acc;
  font-size: 12px; /* Reduzido de 14px */
  font-weight: 600;
  box-shadow: ${props => props.activeDropZone === 'top' 
    ? '0 6px 20px rgba(0, 122, 204, 0.4)'
    : '0 4px 12px rgba(0, 122, 204, 0.2)'};
  animation: ${props => props.activeDropZone === 'top' ? css`${pulseAnimation} 1s infinite` : 'none'};
  cursor: pointer;
  transition: all 0.2s ease;
  transform: ${props => props.activeDropZone === 'top' ? 'scale(1.02)' : 'scale(1)'};

  @media (max-width: 768px) {
    height: 28px; /* Ainda menor no mobile */
    font-size: 11px;
    margin-bottom: 4px;
  }
`;

// Drop Zone Inferior
export const DropZoneBottom = styled.div<{ activeDropZone: 'top' | 'bottom' | null }>`
  height: 32px; /* Reduzido de 40px */
  background: ${props => props.activeDropZone === 'bottom' 
    ? 'linear-gradient(135deg, rgba(0, 122, 204, 0.2), rgba(0, 153, 255, 0.3))'
    : 'linear-gradient(135deg, rgba(0, 122, 204, 0.1), rgba(0, 153, 255, 0.15))'};
  border: 3px dashed #007acc;
  border-radius: 8px;
  margin-top: -6px; /* Reduzido de -8px */
  margin-bottom: 12px; /* Reduzido de 16px */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #007acc;
  font-size: 12px; /* Reduzido de 14px */
  font-weight: 600;
  box-shadow: ${props => props.activeDropZone === 'bottom' 
    ? '0 6px 20px rgba(0, 122, 204, 0.4)'
    : '0 4px 12px rgba(0, 122, 204, 0.2)'};
  animation: ${props => props.activeDropZone === 'bottom' ? css`${pulseAnimation} 1s infinite` : 'none'};
  cursor: pointer;
  transition: all 0.2s ease;
  transform: ${props => props.activeDropZone === 'bottom' ? 'scale(1.02)' : 'scale(1)'};

  @media (max-width: 768px) {
    height: 28px; /* Ainda menor no mobile */
    font-size: 11px;
    margin-top: -4px;
    margin-bottom: 8px;
  }
`;

// Container para o conteúdo da drop zone
export const DropZoneContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 18px;
  }
`;
