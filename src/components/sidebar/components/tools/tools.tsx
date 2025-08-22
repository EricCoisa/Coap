
import type { RootStateBase } from '../../../../store/rootReducer';
import type { BaseComponentProps } from '../../../../types';
import { connectUtil, type PropsFromRedux } from '../../../../utils/reduxUtil';
import { ToolsContainer, ToolsOptions, ToolsContent } from './tools.styles';
import Switch from '../../../switch/switch';
import { AddObject, SetToolbar, SetInsertMode } from '../../../../store/application/actions/applicationAction';
import { ObjectButton } from './components/objectButton';
import type { AnyObject } from '../../../../types/objects';

const connector = connectUtil(
  (state: RootStateBase) => ({
    objectsList: state.ApplicationReducer.ObjectsList ?? [],
    toolbar: state.ApplicationReducer.toolbar,
    insertMode: state.ApplicationReducer.insertMode
  }),
  { SetToolbar, AddObject, SetInsertMode }
);

export interface ToolsProps extends BaseComponentProps, PropsFromRedux<typeof connector> {
  isMinimized: boolean;
}

function ToolsComponent(props : ToolsProps) {

   function handleToolbar() {
    props.SetToolbar(!props.toolbar);
  }

  // Função para ativar modo de inserção (agora para mobile E desktop)
  function handleInsertModeClick(object: AnyObject) {
    // SEMPRE usar modo de inserção (tanto mobile quanto desktop)
    if (props.insertMode?.isActive && props.insertMode?.selectedObject?.id === object.id) {
      // Se já está no modo de inserção com o mesmo objeto, desativa
      props.SetInsertMode(false);
    } else {
      // Ativa o modo de inserção com este objeto
      props.SetInsertMode(true, object);
    }
  }

  return (
    
      <ToolsContent $isMinimized={props.isMinimized}>
         
        {/* Controle de ferramentas */}
        <ToolsContainer>
           <ToolsOptions style={{ alignItems: 'center', gap: '10px', display: 'flex' }}>
            <label style={{ margin: 0, whiteSpace: 'nowrap', fontWeight: 500 }}>Ferramentas Fixa</label>
            <Switch checked={props.toolbar} onChange={handleToolbar} />
           </ToolsOptions>
        </ToolsContainer>
        
        {/* Lista de objetos disponíveis */}
        <ToolsContainer>
          {props.objectsList.length > 0 && (
            props.objectsList.map(obj => (
              <ObjectButton 
                handleAddObject={handleInsertModeClick} 
                key={obj.id} 
                obj={obj}
                isSelected={props.insertMode?.isActive && props.insertMode?.selectedObject?.id === obj.id}
                isInsertMode={props.insertMode?.isActive || false}
              />
            ))
        )}
        </ToolsContainer>
      </ToolsContent>
  );
}

const ConnectedTools = connector(ToolsComponent);
export default ConnectedTools;
