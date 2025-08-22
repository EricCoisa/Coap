import type { BaseComponentProps } from '../../types';
import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';
import { Sidebar, MinimizeButton, SidebarOverlay } from './sidebar.styles';
import { useSidebar } from '../../hooks/useSidebar';
import TimeLine from './components/timeline/timeline';
import Tools from './components/tools/tools';
import SidebarSection from './components/sidebarSection';

const connector = connectUtil(
  () => ({

  }),
  {}
);

export interface SidebarProps extends BaseComponentProps, PropsFromRedux<typeof connector> {
  onAddObject?: (type: string) => void;
}

function SidebarComponent(props: SidebarProps) {
  const { isMinimized, setIsMinimized } = useSidebar();


  function toggleMinimize() {
    setIsMinimized(!isMinimized);
  }

  function handleOverlayClick() {
    setIsMinimized(true);
  }

  return (
    <>
      <SidebarOverlay $isVisible={!isMinimized} onClick={handleOverlayClick} />
      <Sidebar className={props.className} style={props.style} $isMinimized={isMinimized}>
        <SidebarSection title="Objetos" collapsible={true}>
          <Tools isMinimized={isMinimized} />
        </SidebarSection>

        <SidebarSection title="Timeline" collapsible={true}>
          <TimeLine isMinimized={isMinimized} />
        </SidebarSection>
      </Sidebar>
      
      <MinimizeButton onClick={toggleMinimize} $isMinimized={isMinimized}>
        {isMinimized ? '▼ Expandir' : '▲ Recolher'}
      </MinimizeButton>
    </>
  );
}

const ConnectedSidebar = connector(SidebarComponent);
export default ConnectedSidebar;
