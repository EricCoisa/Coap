import type { ViewMode } from '../../types';
import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';
import { 
  HeaderContainer, 
  HeaderContent, 
  Logo, 
  Navigation, 
  NavButton, 
  Actions,
  ActionButton 
} from './header.styles';


const connector = connectUtil(
  () => ({
  }),
  { }
);

export interface HeaderProps extends PropsFromRedux<typeof connector> {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  onReset?: () => void;
  onExport?: () => void;
  onImport?: () => void;
  onShare?: () => void;
  className?: string;
}

function Header(props : HeaderProps) {
  
  function handleEditorMode() {
    props.onModeChange('editor');
  }

  function handlePreviewMode() {
    props.onModeChange('preview');
  }
  
  return (
    <HeaderContainer className={props.className}>
      <HeaderContent>
        <Logo>
          <h1>Coap</h1>
          <span>Construtor de Objeto de Aprendizagem</span>
        </Logo>

        <Navigation>
          <NavButton 
            active={props.currentMode === 'editor'}
            onClick={handleEditorMode}
          >
            Editor
          </NavButton>
          <NavButton 
            active={props.currentMode === 'preview'}
            onClick={handlePreviewMode}
          >
            Preview
          </NavButton>
        </Navigation>

        <Actions>
          {props.currentMode === 'editor' && props.onReset && (
            <ActionButton onClick={props.onReset}>
              Reset
            </ActionButton>
          )}
          {props.currentMode === 'editor' && props.onImport && (
            <ActionButton onClick={props.onImport}>
              Import
            </ActionButton>
          )}
          {props.currentMode === 'preview' && props.onExport && (
            <ActionButton onClick={props.onExport}>
              Exportar
            </ActionButton>
          )}
             {props.currentMode === 'preview' && props.onShare && (
            <ActionButton onClick={props.onShare}>
              Compartilhar
            </ActionButton>
          )}
        </Actions>
      </HeaderContent>
    </HeaderContainer>
  );
}

const ConnectedHeader = connector(Header);
export default ConnectedHeader;
