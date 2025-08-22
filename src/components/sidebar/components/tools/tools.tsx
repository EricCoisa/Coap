
import type { RootStateBase } from '../../../../store/rootReducer';
import type { BaseComponentProps } from '../../../../types';
import { connectUtil, type PropsFromRedux } from '../../../../utils/reduxUtil';
import { ToolsContainer, ToolsOptions, ToolsContent } from './tools.styles';
import Switch from '../../../switch/switch';
import { AddObject, SetToolbar } from '../../../../store/application/actions/applicationAction';
import { ObjectButton } from './components/objectButton';
import type { AnyObject } from '../../../../types/objects';

const connector = connectUtil(
  (state: RootStateBase) => ({
    objectsList: state.ApplicationReducer.ObjectsList ?? [],
    toolbar: state.ApplicationReducer.toolbar
  }),
  { SetToolbar, AddObject }
);

export interface ToolsProps extends BaseComponentProps, PropsFromRedux<typeof connector> {
  isMinimized: boolean;
}

function ToolsComponent(props : ToolsProps) {

   function handleToolbar() {
    props.SetToolbar(!props.toolbar);
  }


 function handleAddObject(object: AnyObject) {
    if (props.AddObject) props.AddObject(object);
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
              <ObjectButton handleAddObject={handleAddObject} key={obj.id} obj={obj} />
            ))
        )}
        </ToolsContainer>
      </ToolsContent>
  );
}

const ConnectedTools = connector(ToolsComponent);
export default ConnectedTools;
