import type { BaseComponentProps } from '../../types';
import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';
import { Sidebar, MinimizeButton } from './sidebar.styles';
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

  return (
    <Sidebar className={props.className} style={props.style} $isMinimized={isMinimized}>
      <SidebarSection title="Objetos" collapsible={true}>

        <Tools isMinimized={isMinimized} />
      </SidebarSection>

      <SidebarSection title="Timeline" collapsible={true}>
        <TimeLine isMinimized={isMinimized} />
      </SidebarSection>
      <MinimizeButton onClick={toggleMinimize}>
        {isMinimized ? '▼' : '▲'}
      </MinimizeButton>
    </Sidebar>
  );
}

const ConnectedSidebar = connector(SidebarComponent);
export default ConnectedSidebar;
