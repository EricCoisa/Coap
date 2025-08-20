import { useState } from 'react';
import RichText from '../components/objects/richtext/richtext';

// Exemplo de como usar o componente RichText como substituto de input
export function RichTextExample() {
  const [content, setContent] = useState('<p>Digite seu texto aqui...</p>');
  const [mode, setMode] = useState<'edit' | 'view'>('edit');

  function toggleMode() {
    setMode(mode === 'edit' ? 'view' : 'edit');
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Exemplo de RichText como substituto de input</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={toggleMode}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {mode === 'edit' ? 'Visualizar' : 'Editar'}
        </button>
      </div>

      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
        <RichText
          value={content}
          setValue={setContent}
          mode={mode}
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Conteúdo HTML:</h3>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '10px', 
          borderRadius: '4px',
          fontSize: '12px',
          overflow: 'auto'
        }}>
          {content}
        </pre>
      </div>
    </div>
  );
}
