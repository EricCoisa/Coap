
import type { RootStateBase } from '../../../../store/rootReducer';
import type { BaseComponentProps } from '../../../../types';
import { connectUtil, type PropsFromRedux } from '../../../../utils/reduxUtil';
import { ToolsContainer, ToolsContent } from './tools.styles';
import { AddObject, SetToolbar, SetInsertMode } from '../../../../store/application/actions/applicationAction';
import { ObjectButton } from './components/objectButton';
import type { AnyObject } from '../../../../types/objects';
import { useSidebar } from '../../../../hooks/useSidebar';

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
  const { setIsMinimized } = useSidebar();

  // Função para ativar modo de inserção (agora para mobile E desktop)
  function handleInsertModeClick(object: AnyObject) {
    // Detectar se é mobile para fechar sidebar automaticamente
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    
    // SEMPRE usar modo de inserção (tanto mobile quanto desktop)
    if (props.insertMode?.isActive && props.insertMode?.selectedObject?.id === object.id) {
      // Se já está no modo de inserção com o mesmo objeto, desativa
      props.SetInsertMode(false);
    } else {
      // Ativa o modo de inserção com este objeto
      props.SetInsertMode(true, object);
      
      // 📱 MOBILE: Fechar sidebar automaticamente após seleção para melhor UX
      if (isMobile) {
        setIsMinimized(true);
      }
    }
  }

  return (
    
      <ToolsContent $isMinimized={props.isMinimized}>  
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
