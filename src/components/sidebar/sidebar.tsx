
import { AddObject } from '../../store/application/actions/applicationAction';
import type { RootStateBase } from '../../store/rootReducer';
import type { BaseComponentProps } from '../../types';
import type { Object } from '../../types/objects';
import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';
import { Sidebar, SidebarTitle, ToolsContainer } from './sidebar.styles';

const connector = connectUtil(
  (state: RootStateBase) => ({
    objectsList: state.ApplicationReducer.ObjectsList ?? []
  }),
  { AddObject}
);

export interface SidebarProps extends BaseComponentProps, PropsFromRedux<typeof connector> {
  onAddObject?: (type: string) => void;
}

function SidebarComponent(props : SidebarProps) {
  function handleAddObject(object: Object) {
    if (props.AddObject) props.AddObject(object);
  }

  return (
    <Sidebar className={props.className} style={props.style}>
      <SidebarTitle>Objetos</SidebarTitle>
      <ToolsContainer>
        {props.objectsList.length > 0 && (
          props.objectsList.map(obj => (
            <button key={obj.id} onClick={() => handleAddObject(obj)}>📝 {obj.label}</button>
          ))
      )}
      </ToolsContainer>
    </Sidebar>
  );
}

const ConnectedSidebar = connector(SidebarComponent);
export default ConnectedSidebar;
