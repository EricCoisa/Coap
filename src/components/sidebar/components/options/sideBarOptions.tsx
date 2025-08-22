
import type { RootStateBase } from '../../../../store/rootReducer';
import type { BaseComponentProps } from '../../../../types';
import { connectUtil, type PropsFromRedux } from '../../../../utils/reduxUtil';
import { SideBarContainer, SideBarContent } from './sidebarOptions.styles';
import { SetToolbar } from '../../../../store/application/actions/applicationAction';
import Switch from '../../../switch/switch';

const connector = connectUtil(
  (state: RootStateBase) => ({
    objectsUsed: state.ApplicationReducer.ObjectsUsed ?? [],
    toolbar: state.ApplicationReducer.toolbar,
  }),
  { SetToolbar }
);

export interface TimeLineProps extends BaseComponentProps, PropsFromRedux<typeof connector> {
  isMinimized: boolean;
}

function SidebarComponent(props : TimeLineProps) {

    function handleToolbar() {
    props.SetToolbar(!props.toolbar);
  }


  return (
    
      <SideBarContent $isMinimized={props.isMinimized}>
        <SideBarContainer>
         <label style={{ margin: 0, whiteSpace: 'nowrap', fontWeight: 500 }}>Ferramentas Fixa</label>
            <Switch checked={props.toolbar} onChange={handleToolbar} />
        </SideBarContainer>
      </SideBarContent>
 
  );
}

const ConnectedTimeLine = connector(SidebarComponent);
export default ConnectedTimeLine;
