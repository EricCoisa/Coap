// Função utilitária para transformar os campos em Quill Delta
function transformObjectsToQuill(objects: any[]) {
  return objects.map(obj => {
    const newObj = { ...obj };
    if (newObj.data) {
      // content
      if (typeof newObj.data.content === 'string') {
        newObj.data.content = {
          ops: [
            { insert: newObj.data.content + (newObj.type === 'text' ? '\n' : '') }
          ]
        };
        // Para títulos, adiciona alinhamento
        if (newObj.type === 'title') {
          newObj.data.content.ops.push({ attributes: { align: 'center' }, insert: '\n' });
        }
      }
      // title (para imagens)
      if (typeof newObj.data.title === 'string') {
        newObj.data.title = {
          ops: [
            { attributes: { bold: true }, insert: newObj.data.title },
            { attributes: { align: 'center' }, insert: '\n' }
          ]
        };
      }
      // source (para imagens e tópicos)
      if (typeof newObj.data.source === 'string') {
        newObj.data.source = {
          ops: [
            { insert: newObj.data.source + '\n' }
          ]
        };
      }
      // topics (para tópicos)
      if (newObj.type === 'topic' && Array.isArray(newObj.data.topics)) {
        newObj.data.topics = (newObj.data.topics as TopicItem[]).map(topic => {
          if (typeof topic.content === 'string') {
            topic.content = {
              ops: [
                { insert: topic.content + '\n' }
              ]
            };
          }
          return topic;
        });
      }

      // source para Video
      if (newObj.type === 'video' && typeof newObj.data.content === 'string') {
        newObj.data.content = {
          ops: [
            { insert: newObj.data.content + '\n' }
          ]
        };
      }
    }
    return newObj;
  });
}
import React, { useState } from 'react';
import { connectUtil, type PropsFromRedux } from '../../../utils/reduxUtil';
import { LoadObjects } from '../../../store/application/actions/applicationAction';
import { ImportModalContainer, ImportTextarea, ImportButton, CancelButton, ExempleButton } from './import.styles';
import Modal from '../../modal/modal';
import { InitialObjects } from '../../../types/objects';
import type { TopicItem } from '../../objects/topic/topic';

const connector = connectUtil(
  () => ({}),
  { LoadObjects }
);

export interface ImportModalProps extends PropsFromRedux<typeof connector> {
  onClose: () => void;
}


function ImportModal(props: ImportModalProps) {
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState<string | null>(null);
     const [modalExemplo, setExemplo] = useState(false);

  function handleImport() {
    try {
      const parsed = JSON.parse(jsonText);
      props.LoadObjects(parsed);
      setError(null);
      props.onClose();
    } catch (error) {
      console.error('Erro ao importar JSON:', error);
      setError('JSON inválido!');
    }
  }


  // Funções extraídas para evitar arrow functions no JSX
  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setJsonText(e.target.value);
  }
  function handleShowExample() {
    setExemplo(true);
  }
  function handleCloseExample() {
    setExemplo(false);
  }
  function handleCopyExample() {
    navigator.clipboard.writeText(JSON.stringify(transformObjectsToQuill(InitialObjects), null, 2));
  }

  return (
    <ImportModalContainer>
      <h2>Importar Conteúdo</h2>
            <ExempleButton onClick={handleShowExample}>Mostrar Exemplo</ExempleButton>
      <p>Cole abaixo o JSON exportado para importar os objetos:</p>
      <ImportTextarea
        value={jsonText}
        onChange={handleTextareaChange}
        placeholder="Cole aqui o JSON..."
      />
      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
      <div>
        <ImportButton onClick={handleImport}>Importar</ImportButton>
        <CancelButton onClick={props.onClose}>Cancelar</CancelButton>
    
      </div>

    

      <Modal isOpen={modalExemplo} onClose={handleCloseExample}>
        <h2>Exemplo de JSON</h2>
        <div>Use uma IA generativa para converter seu conteudo no padrão do json abaixo!</div>
        <pre id="json-exemplo" style={{ textAlign: 'left', background: '#f8f8f8', padding: '1rem', borderRadius: '8px', maxHeight: '300px', overflow: 'auto' }}>
          {JSON.stringify(transformObjectsToQuill(InitialObjects), null, 2)}
        </pre>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'center' }}>
          <button
            onClick={handleCopyExample}
            style={{ padding: '0.5rem 1.5rem', borderRadius: '6px', background: '#28a745', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Copiar JSON
          </button>
          <button onClick={handleCloseExample} style={{ padding: '0.5rem 1.5rem', borderRadius: '6px', background: '#007bff', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Fechar</button>
        </div>
      </Modal>
    </ImportModalContainer>
  );
}

const ConnectedImportModalApp = connector(ImportModal);
export default ConnectedImportModalApp;
