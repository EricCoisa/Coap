import type { RootStateBase } from '../../store/rootReducer';
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
  (_state: RootStateBase) => ({
  }),
  { }
);

export interface HeaderProps extends PropsFromRedux<typeof connector> {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  onSave?: () => void;
  onExport?: () => void;
  onImport?: () => void;
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
          {props.onSave && (
            <ActionButton onClick={props.onSave}>
              Salvar
            </ActionButton>
          )}
          {props.onExport && (
            <ActionButton onClick={props.onExport}>
              Exportar
            </ActionButton>
          )}
        </Actions>
      </HeaderContent>
    </HeaderContainer>
  );
}

const ConnectedHeader = connector(Header);
export default ConnectedHeader;
