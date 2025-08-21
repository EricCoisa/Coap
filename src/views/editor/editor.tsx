import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/sidebar';
import type { RootStateBase } from '../../store/rootReducer';
import type { BaseComponentProps } from '../../types';
import { connectUtil, type PropsFromRedux } from '../../utils/reduxUtil';
import { MoveObject, AddObject } from '../../store/application/actions/applicationAction';
import { useSidebar } from '../../hooks/useSidebar';
import { 
  EditorContainer, 
  EditorContent, 
  Canvas,
  CanvasArea,
  CanvasTitle
} from './editor.styles';
import { ObjectElements } from '../../types/objects/index';

const connector = connectUtil(
  (_state: RootStateBase) => ({
    objectsUsed: _state.ApplicationReducer.ObjectsUsed ?? []
  }),
  { MoveObject, AddObject }
);

export interface EditorProps extends BaseComponentProps, PropsFromRedux<typeof connector> {
}



function Editor(props : EditorProps) {
  const [showDropZone, setShowDropZone] = useState(false);
  const { isMinimized } = useSidebar();
  const { AddObject, objectsUsed } = props;

  useEffect(()=>{console.log(objectsUsed)},[objectsUsed]);

  // Listener para eventos de touch drop
  useEffect(() => {
    function handleTouchDrop(e: CustomEvent) {
      const { sidebarObjectData } = e.detail;
      if (sidebarObjectData && AddObject) {
        try {
          const sidebarObject = JSON.parse(sidebarObjectData);
          const newObject = {
            ...sidebarObject,
            id: undefined // O reducer irá gerar um novo ID
          };
          // Adicionar no final quando solto no canvas vazio
          AddObject(newObject, objectsUsed.length);
        } catch (error) {
          console.error('Erro ao processar objeto da sidebar:', error);
        }
      }
    }

    const canvasArea = document.querySelector('.canvas-area');
    if (canvasArea) {
      canvasArea.addEventListener('touchDrop', handleTouchDrop as EventListener);
      return () => {
        canvasArea.removeEventListener('touchDrop', handleTouchDrop as EventListener);
      };
    }
  }, [AddObject, objectsUsed.length]);

  function handleCanvasDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('objectId');
    const sidebarObjectData = e.dataTransfer.getData('sidebarObjectData');
    
    if (draggedId || sidebarObjectData) {
      setShowDropZone(true);
    }
  }

  function handleCanvasDragLeave(e: React.DragEvent<HTMLDivElement>) {
    // Só remove a zona de drop se estivermos realmente saindo do canvas
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setShowDropZone(false);
    }
  }

  function handleCanvasDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('objectId');
    const sidebarObjectData = e.dataTransfer.getData('sidebarObjectData');
    
    // Se é um elemento da sidebar
    if (sidebarObjectData && AddObject) {
      try {
        const sidebarObject = JSON.parse(sidebarObjectData);
        const newObject = {
          ...sidebarObject,
          id: undefined // O reducer irá gerar um novo ID
        };
        // Adicionar no final quando solto no canvas vazio
        AddObject(newObject, objectsUsed.length);
      } catch (error) {
        console.error('Erro ao processar objeto da sidebar:', error);
      }
    }
    // Se é um objeto existente sendo movido para o final
    else if (draggedId && props.MoveObject) {
      const draggedObject = objectsUsed.find(obj => obj.id === draggedId);
      if (draggedObject) {
        // Move para o final da lista
        props.MoveObject(draggedObject, objectsUsed.length);
      }
    }
    
    setShowDropZone(false);
  }
  return (
    <EditorContainer className={props.className} style={props.style} $sidebarExpanded={!isMinimized}>
      <EditorContent>
        <Sidebar />

        <Canvas>
          <CanvasTitle>Editor</CanvasTitle>
          <CanvasArea
            className="canvas-area"
            onDragOver={handleCanvasDragOver}
            onDragLeave={handleCanvasDragLeave}
            onDrop={handleCanvasDrop}
          >
            {objectsUsed.length === 0 ? (
              <p>Arraste objetos da sidebar para começar a criar seu conteúdo educacional.</p>
            ) : (
              <>
                {objectsUsed.map((o, i) => {
                  const Component = ObjectElements.find(element => element.type === o.type)?.element;
                  return Component ? React.createElement(Component, { object: o, index: i, mode: "edit", key: o.id }) : null;
                })}
                
                {/* Zona de drop no final */}
                {showDropZone && (
                  <div 
                    style={{ 
                      height: '40px', 
                      background: 'rgba(0, 122, 204, 0.1)', 
                      border: '2px dashed #007acc',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#007acc',
                      fontSize: '14px',
                      marginTop: '1rem'
                    }}
                  >
                    Solte aqui para adicionar ao final
                  </div>
                )}
              </>
            )}
          </CanvasArea>
        </Canvas>
      </EditorContent>
    </EditorContainer>
  );
}

const ConnectedEditor = connector(Editor);
export default ConnectedEditor;

