import type { BaseComponentProps } from '../../types';
import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';
import { Sidebar, MinimizeButton, SidebarOverlay } from './sidebar.styles';
import { useSidebar } from '../../hooks/useSidebar';
import TimeLine from './components/timeline/timeline';

import SidebarSection from './components/sidebarSection/sidebarSection';
import type { RootStateBase } from '../../store/rootReducer';
import { useEffect, useRef } from 'react';
import Tools from './components/tools/tools';
import SideBarOptions from './components/options/sideBarOptions';

const connector = connectUtil(
  (_state: RootStateBase) => ({
    toolbar: _state.ApplicationReducer.toolbar,
    currentQuillId: _state.QuillReducer.currentQuillId ?? null,
  }),
  {}
);

export interface SidebarProps extends BaseComponentProps, PropsFromRedux<typeof connector> {
  onAddObject?: (type: string) => void;
}

function SidebarComponent(props: SidebarProps) {
  const { isMinimized, setIsMinimized } = useSidebar();
  const sidebarRef = useRef<HTMLElement>(null);

  // Calcular dinamicamente a altura do sidebar para posicionar o botão
  useEffect(() => {
    function updateSidebarHeight() {
      if (sidebarRef.current && !isMinimized) {
        const sidebarHeight = sidebarRef.current.offsetHeight;
        // Definir a variável CSS com a altura atual do sidebar
        document.documentElement.style.setProperty('--sidebar-height', `${sidebarHeight}px`);
      }
    }

    // Atualizar altura inicial
    updateSidebarHeight();

    // Usar ResizeObserver para monitorar mudanças no tamanho do sidebar
    const resizeObserver = new ResizeObserver(updateSidebarHeight);
    if (sidebarRef.current) {
      resizeObserver.observe(sidebarRef.current);
    }

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, [isMinimized]);


  function toggleMinimize() {
    setIsMinimized(!isMinimized);
  }

  function handleOverlayClick() {
    setIsMinimized(true);
  }

  useEffect(()=>{console.log("CurrentQuilllll", props.currentQuillId != null, "Toolbar", props.toolbar)},[props.currentQuillId, props.toolbar])
  return (
    <>
      <SidebarOverlay $isVisible={!isMinimized} onClick={handleOverlayClick} />
      <Sidebar ref={sidebarRef} className={props.className} style={props.style} $isMinimized={isMinimized}>
        <SidebarSection title="Opções" collapsible={true}>
          <SideBarOptions isMinimized={isMinimized} />
        </SidebarSection>

        
        <SidebarSection title="Objetos" collapsible={true}>
          <Tools isMinimized={isMinimized} />
        </SidebarSection>

        <SidebarSection title="Timeline" collapsible={true}>
          <TimeLine isMinimized={isMinimized} />
        </SidebarSection>
      </Sidebar>

      <MinimizeButton onClick={toggleMinimize} $toolbar={props.toolbar} $currentQuill={props.currentQuillId != null} $isMinimized={isMinimized}>
        {isMinimized ? '▼ Ferramentas' : '▲ Recolher'}
      </MinimizeButton>
    </>
  );
}

const ConnectedSidebar = connector(SidebarComponent);
export default ConnectedSidebar;
