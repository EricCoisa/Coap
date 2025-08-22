import FirstTimeModal from './components/modals/firstTimeModal/firstTimeModal';
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
import { Limpar, LoadFirstTime, LoadObjects, Save, SetViewMode } from './store/application/actions/applicationAction';
import { useEffect, useState } from 'react'
import Modal from './components/modal/modal'
import ImportModal from './components/modals/importModal/importModal';
import Resetodal from './components/modals/resetModal/resetModal';

const connector = connectUtil(
  (_state: RootStateBase) => ({
    viewMode: _state.ApplicationReducer.viewMode ?? 'editor',
    objectused: _state.ApplicationReducer.ObjectsUsed,
  }),
  { SetViewMode, LoadObjects }
);

function App(props: PropsFromRedux<typeof connector>) {
    const { objectused } = props;
    const [firstTime, setFirstTime] = useState(false);
    const [importModal, setImportModal] = useState(false);
    const [resetModal, setResetModal] = useState(false);

    function handleCloseModal() {
      setFirstTime(false);
    }

  useEffect(() => {
    props.LoadObjects();
    setFirstTime(LoadFirstTime())
  }, []);

  function handleLoadTemplate(){
    fetch('/template.json')
      .then(res => res.json())
      .then(json => {
        props.LoadObjects(json);
      })
      .catch(() => {
        alert('Erro ao carregar template de exemplo!');
      });
    handleCloseModal();
  }

  useEffect(() => {
    if (typeof Save === 'function' && Array.isArray(objectused)) {
      try {
        Save();
      } catch (err) {
        console.error("error", err)
      }
    }
  }, [objectused, Save]);


  function handleModeChange(mode: ViewMode) {
    props.SetViewMode(mode);
  }

  function handleReset() {
    setResetModal(false)
    Limpar()
    props.LoadObjects([])
  }

  function handleExport() {
    const previewArea = document.getElementById('preview-area');
    if (previewArea) {
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        // Coletar todos os estilos do documento principal
        const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
        const stylesHtml = styles.map(style => style.outerHTML).join('\n');
        // Coletar estilos do styled-components
        const styledTags = Array.from(document.querySelectorAll('style[data-styled]'));
        const styledHtml = styledTags.map(tag => tag.outerHTML).join('\n');
        printWindow.document.write(`
          <!doctype html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <base href="/" />
              <title>Exportação do Conteúdo</title>
              ${stylesHtml}
              ${styledHtml}
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 24px; }
                @media print {
                  img, .main-image {
                    max-width: 100% !important;
                    max-height: 300px !important;
                    height: auto !important;
                    object-fit: contain !important;
                    box-shadow: none !important;
                    border-radius: 8px !important;
                    display: block !important;
                    margin: 0 auto !important;
                  }
                }
              </style>
            </head>
            <body>
              <div id="preview-area">
                ${previewArea.innerHTML}
              </div>
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
    setImportModal(true)
    console.log('Importando conteúdo...')
    // TODO: Implementar lógica de importação
  }

    function handleCloseImportModal() {
    setImportModal(false)
    // TODO: Implementar lógica de importação
  }


  
  function handleResetModal() {
    setResetModal(true)
    console.log('Importando conteúdo...')
    // TODO: Implementar lógica de importação
  }

    function handleCloseResetModal() {
    setResetModal(false)
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
          onReset={handleResetModal}
          onExport={handleExport}
          onImport={handleImport}
        />
        {props.viewMode === 'editor' ? (
          <Editor />
        ) : (
          <Preview />
        )}
   
            <Modal size='lg' onClose={handleCloseModal} isOpen={firstTime}>
              <FirstTimeModal onAccept={handleLoadTemplate} onDeny={handleCloseModal} />
            </Modal>

            <Modal size='lg' onClose={handleCloseImportModal} isOpen={importModal}>
              <ImportModal onClose={handleCloseImportModal}></ImportModal>
            </Modal>

            <Modal size='lg' onClose={handleCloseResetModal} isOpen={resetModal}>
              <Resetodal onAccept={handleReset} onDeny={handleCloseResetModal}></Resetodal>
            </Modal>
      </SidebarProvider>
    </ThemeProvider>
  )
}

const ConnectedApp = connector(App);
export default ConnectedApp;
