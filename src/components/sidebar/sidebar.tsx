
import { AddObject, SetToolbar } from '../../store/application/actions/applicationAction';
import type { RootStateBase } from '../../store/rootReducer';
import type { BaseComponentProps } from '../../types';
import type { AnyObject } from '../../types/objects';
import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';
import { Sidebar, SidebarTitle, ToolsContainer, ToolsOptions, MinimizeButton, SidebarContent, SidebarHeader } from './sidebar.styles';
import { useSidebar } from '../../hooks/useSidebar';
import { useDragAndTouch } from '../../hooks/useDragAndTouch';
import Switch from '../switch/switch';

const connector = connectUtil(
  (state: RootStateBase) => ({
    objectsList: state.ApplicationReducer.ObjectsList ?? [],
    toolbar: state.ApplicationReducer.toolbar
  }),
  { AddObject, SetToolbar}
);

export interface SidebarProps extends BaseComponentProps, PropsFromRedux<typeof connector> {
  onAddObject?: (type: string) => void;
}

function SidebarComponent(props : SidebarProps) {
  const { isMinimized, setIsMinimized } = useSidebar();

  function handleAddObject(object: AnyObject) {
    if (props.AddObject) props.AddObject(object);
  }

  function handleAddObjectClick(obj: AnyObject) {
    return () => handleAddObject(obj);
  }

  function handleToolbar() {
    props.SetToolbar(!props.toolbar);
  }

  function toggleMinimize() {
    setIsMinimized(!isMinimized);
  }

  // Componente para cada botão de objeto com drag and touch
  function ObjectButton({ obj }: { obj: AnyObject }) {
    const dragAndTouchProps = useDragAndTouch({
      data: JSON.stringify(obj),
      onDragStart: (data) => {
        console.log('🚀 Drag/Touch started with data:', data);
      },
      onDragEnd: () => {
        console.log('🏁 Drag/Touch ended');
      }
    });

    return (
      <button 
        key={obj.id} 
        data-object={JSON.stringify(obj)}
        onClick={handleAddObjectClick(obj)}
        {...dragAndTouchProps}
        style={{
          cursor: 'grab',
          padding: '8px 12px',
          margin: '4px 0',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.2s ease'
        }}
      >
        {obj.icon} {obj.label}
      </button>
    );
  }

  return (
    <Sidebar className={props.className} style={props.style} $isMinimized={isMinimized}>
      <SidebarHeader>
        <SidebarTitle $isMinimized={isMinimized}>Objetos</SidebarTitle>
        <MinimizeButton onClick={toggleMinimize}>
          {isMinimized ? '▼' : '▲'}
        </MinimizeButton>
      </SidebarHeader>
      
      <SidebarContent $isMinimized={isMinimized}>
        <ToolsContainer>
           <ToolsOptions style={{ alignItems: 'center', gap: '10px', display: 'flex' }}>
            <label style={{ margin: 0, whiteSpace: 'nowrap', fontWeight: 500 }}>Barra de Ferramentas</label>
            <Switch checked={props.toolbar} onChange={handleToolbar} />
           </ToolsOptions>
        </ToolsContainer>
        <ToolsContainer>
          {props.objectsList.length > 0 && (
            props.objectsList.map(obj => (
              <ObjectButton key={obj.id} obj={obj} />
            ))
        )}
        </ToolsContainer>
      </SidebarContent>
    </Sidebar>
  );
}

const ConnectedSidebar = connector(SidebarComponent);
export default ConnectedSidebar;
