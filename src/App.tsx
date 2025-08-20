import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './themes/defaultTheme'
import { GlobalStyles } from './styles/GlobalStyles'
import Header from './components/header/header'
import Editor from './views/editor/editor'
import Preview from './views/preview/preview'
import type { ViewMode } from './types'

function App() {
  const [currentMode, setCurrentMode] = useState<ViewMode>('editor')

  function handleModeChange(mode: ViewMode) {
    setCurrentMode(mode)
  }

  function handleSave() {
    console.log('Salvando conteúdo...')
    // TODO: Implementar lógica de salvamento
  }

  function handleExport() {
    console.log('Exportando conteúdo...')
    // TODO: Implementar lógica de exportação
  }

  function handleImport() {
    console.log('Importando conteúdo...')
    // TODO: Implementar lógica de importação
  }

  function handleAddObject(type: string) {
    console.log(`Adicionando objeto do tipo: ${type}`)
    // TODO: Implementar lógica de adição de objetos
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Header
        currentMode={currentMode}
        onModeChange={handleModeChange}
        onSave={handleSave}
        onExport={handleExport}
        onImport={handleImport}
      />
      
      {currentMode === 'editor' ? (
        <Editor onAddObject={handleAddObject} />
      ) : (
        <Preview />
      )}
    </ThemeProvider>
  )
}

export default App
