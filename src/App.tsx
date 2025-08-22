import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './themes/defaultTheme'
import { GlobalStyles } from './styles/GlobalStyles'
import Header from './components/header/header'
import Editor from './views/editor/editor'
import Preview from './views/preview/preview'
import InsertModeIndicator from './components/InsertModeIndicator'
import MoveModeIndicator from './components/MoveModeIndicator'
import { SidebarProvider } from './contexts/SidebarContext'
import type { ViewMode } from './types'
import { connectUtil, type PropsFromRedux } from './utils/reduxUtil';
import type { RootStateBase } from './store/rootReducer';
import { SetViewMode } from './store/application/actions/applicationAction';

const connector = connectUtil(
  (_state: RootStateBase) => ({
    viewMode: _state.ApplicationReducer.viewMode ?? 'editor',
  }),
  { SetViewMode }
);

function App(props: PropsFromRedux<typeof connector>) {
  function handleModeChange(mode: ViewMode) {
    props.SetViewMode(mode);
  }

  function handleSave() {
    console.log('Salvando conteúdo...')
    // TODO: Implementar lógica de salvamento
  }

  function handleExport() {
    const previewArea = document.getElementById('preview-area');
    if (previewArea) {
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        // Coletar todos os estilos do documento principal
        const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
        const stylesHtml = styles.map(style => style.outerHTML).join('\n');
        printWindow.document.write(`
          <html>
            <head>
              <title>Exportação do Conteúdo</title>
              ${stylesHtml}
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 24px; }
              </style>
            </head>
            <body>
              ${previewArea.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
      } else {
        alert('Não foi possível abrir a janela de impressão.');
      }
    } else {
      alert('Não foi possível encontrar o conteúdo para exportar.');
    }
  }

  function handleImport() {
    console.log('Importando conteúdo...')
    // TODO: Implementar lógica de importação
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <SidebarProvider>
        <InsertModeIndicator />
        <MoveModeIndicator />
        <Header
          currentMode={props.viewMode}
          onModeChange={handleModeChange}
          onSave={handleSave}
          onExport={handleExport}
          onImport={handleImport}
        />
        {props.viewMode === 'editor' ? (
          <Editor />
        ) : (
          <Preview />
        )}
      </SidebarProvider>
    </ThemeProvider>
  )
}

const ConnectedApp = connector(App);
export default ConnectedApp;
