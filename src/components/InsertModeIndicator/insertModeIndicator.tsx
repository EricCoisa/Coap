import type { RootStateBase } from '../../store/rootReducer';
import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';
import { SetInsertMode } from '../../store/application/actions/applicationAction';
import { 
  InsertModeIndicator, 
  InsertModeMessage, 
  CancelButton 
} from './insertModeIndicator.styles';

const connector = connectUtil(
  (state: RootStateBase) => ({
    insertMode: state.ApplicationReducer.insertMode
  }),
  { SetInsertMode }
);

type InsertModeIndicatorProps = PropsFromRedux<typeof connector>;

function InsertModeIndicatorComponent(props: InsertModeIndicatorProps) {
  function handleCancel() {
    props.SetInsertMode(false);
  }

  const isVisible = props.insertMode?.isActive || false;
  const selectedObject = props.insertMode?.selectedObject;

  return (
    <InsertModeIndicator $isVisible={isVisible}>
      <InsertModeMessage>
        <span className="icon">📌</span>
        <span>
          Clique em uma área para adicionar 
          <span className="object-name">
            {selectedObject?.icon} {selectedObject?.label}
          </span>
        </span>
      </InsertModeMessage>
      <CancelButton onClick={handleCancel}>
        ✕ Cancelar
      </CancelButton>
    </InsertModeIndicator>
  );
}

const ConnectedInsertModeIndicator = connector(InsertModeIndicatorComponent);
export default ConnectedInsertModeIndicator;
