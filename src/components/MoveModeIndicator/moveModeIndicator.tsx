import type { RootStateBase } from '../../store/rootReducer';
import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';
import { SetMoveMode } from '../../store/application/actions/applicationAction';
import styled from 'styled-components';
import { mediaQueries } from '../../styles/breakpoints';

// Estilos inline para evitar problemas de importação
const MoveModeIndicator = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #28a745, #1e7e34);
  color: white;
  padding: 1rem;
  text-align: center;
  z-index: 9999;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(${({ $isVisible }) => $isVisible ? '0' : '-100%'});
  transition: transform 0.3s ease;
  display: ${({ $isVisible }) => $isVisible ? 'flex' : 'none'};
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  ${mediaQueries.mobile} {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
`;

const MoveModeMessage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;

  .icon {
    font-size: 1.2rem;
  }

  .object-name {
    font-weight: 700;
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }
`;

const CancelButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
  }

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: 2px;
  }

  ${mediaQueries.mobile} {
    padding: 0.375rem 0.75rem;
    font-size: 0.85rem;
  }
`;

const connector = connectUtil(
  (state: RootStateBase) => ({
    moveMode: state.ApplicationReducer.moveMode,
    objectsUsed: state.ApplicationReducer.ObjectsUsed ?? []
  }),
  { SetMoveMode }
);

type MoveModeIndicatorProps = PropsFromRedux<typeof connector>;

function MoveModeIndicatorComponent(props: MoveModeIndicatorProps) {
  function handleCancel() {
    props.SetMoveMode(false);
  }

  const isVisible = props.moveMode?.isActive || false;
  const selectedObjectId = props.moveMode?.selectedObjectId;
  
  // Encontra o objeto selecionado para obter suas informações
  const selectedObject = props.objectsUsed.find(obj => obj.id === selectedObjectId);

  return (
    <MoveModeIndicator $isVisible={isVisible}>
      <MoveModeMessage>
        <span className="icon">🔄</span>
        <span>
          Clique em uma área para mover 
          <span className="object-name">
            {selectedObject?.icon} {selectedObject?.label}
          </span>
        </span>
      </MoveModeMessage>
      <CancelButton onClick={handleCancel}>
        ✕ Cancelar
      </CancelButton>
    </MoveModeIndicator>
  );
}

const ConnectedMoveModeIndicator = connector(MoveModeIndicatorComponent);
export default ConnectedMoveModeIndicator;
